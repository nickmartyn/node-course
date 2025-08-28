import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: "./tmp",
        filename: (req, file, cb) => {
          const filename = `${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
