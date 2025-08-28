import { parentPort, workerData } from "node:worker_threads";
import * as sharp from "sharp";

type WorkerData = {
  inputPath: string;
  outputPath: string;
};

async function createThumbnail({
  inputPath,
  outputPath,
}: WorkerData): Promise<sharp.OutputInfo> {
  const info = await sharp(inputPath).resize(200, 200).toFile(outputPath);
  return info;
}

void createThumbnail(workerData as WorkerData).then((result) => {
  parentPort!.postMessage(result);
});
