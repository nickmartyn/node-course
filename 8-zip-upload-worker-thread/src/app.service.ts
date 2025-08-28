import { Injectable } from "@nestjs/common";
import { extractArchive } from "./utils/unzip";
import { join } from "node:path";
import { readdir, mkdir, rm } from "node:fs/promises";
import { Worker } from "node:worker_threads";
import { Mutex } from "async-mutex";
import { SharedState, Duration } from "./types/types";

const TMP_DIR = join(__dirname, "..", "tmp");

function runWorker(workerData: {
  inputPath: string;
  outputPath: string;
}): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(__dirname, "worker", "thumbnail.js"), {
      workerData,
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

@Injectable()
export class AppService {
  private mutex: Mutex;

  constructor() {
    this.mutex = new Mutex();
  }
  async processFile(
    file: Express.Multer.File,
  ): Promise<SharedState & Duration> {
    const requestId = Date.now().toString();

    const state: SharedState = { processed: 0, skipped: 0 };

    const extractedTMP_DIR = `${TMP_DIR}/${requestId}`;

    await extractArchive(file.path, extractedTMP_DIR);

    const thumbnailsDir = join(__dirname, "..", "thumbnails", requestId);
    await mkdir(thumbnailsDir, { recursive: true });

    const files = await readdir(`${extractedTMP_DIR}`, {
      withFileTypes: true,
    });

    const workers: (() => Promise<void>)[] = [];

    files.map((file) => {
      if (file.isFile()) {
        workers.push(async () => {
          try {
            await runWorker({
              inputPath: join(extractedTMP_DIR, file.name),
              outputPath: join(thumbnailsDir, `thumb-${file.name}`),
            });
            await this.mutex.runExclusive(() => {
              state.processed += 1;
            });
          } catch {
            await this.mutex.runExclusive(() => {
              state.skipped += 1;
            });
            console.error(`Error processing file ${file.name}. Skipped.`);
          }
        });
      }
    });
    const t0 = performance.now();
    console.log(`Starting ${workers.length} workers...`);
    await Promise.all(workers.map((worker) => worker()));

    await rm(TMP_DIR, { recursive: true });
    await mkdir(TMP_DIR, { recursive: true });

    return {
      processed: state.processed,
      skipped: state.skipped,
      durationMs: (performance.now() - t0).toFixed(2),
    };
  }
}
