import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ShutdownSignal } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    if (signal === ShutdownSignal.SIGINT) {
      console.log('Bye tea‑lovers 👋');
    } else {
      console.log(`Application is shutting down. Signal: ${signal}`);
    }
  }
}
