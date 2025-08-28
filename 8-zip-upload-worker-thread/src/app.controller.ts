import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SharedState, Duration } from "./types/types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/zip")
  @UseInterceptors(FileInterceptor("file"))
  uploadZipFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SharedState & Duration> {
    if (!file) {
      throw new Error("No file uploaded");
    }
    return this.appService.processFile(file);
  }
}
