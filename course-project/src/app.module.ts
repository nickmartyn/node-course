import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { UsersService } from './users/users.service';
import { PostsService } from './posts/posts.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        migrations: ['dist/migrations/*{.ts,.js}'],
        migrationsTableName: 'migration_table',
      }),
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService],
})
export class AppModule {}
