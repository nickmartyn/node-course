import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TeaModule } from './tea/tea.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TeaModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 0, // disable by default; set on controller with decorator
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
