import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateModule } from './certificate/certificate.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: process.env.POSTGRES_DB || 'certificates_management_db',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '8888',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    CertificateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
