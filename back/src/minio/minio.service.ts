// src/minio/minio.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('minio.endPoint'),
      port: this.configService.get('minio.port'),
      useSSL: this.configService.get('minio.useSSL'),
      accessKey: this.configService.get('minio.accessKey'),
      secretKey: this.configService.get('minio.secretKey'),
    });

    this.bucketName = this.configService.get<string>('minio.bucketName');
    this.createBucketIfNotExists();
  }

  private async createBucketIfNotExists() {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }
  }

  async uploadFile(file: Express.Multer.File, objectName: string) {
    try {
      // Проверяем, что файл существует и имеет buffer
      if (!file || !file.buffer) {
        throw new Error('File with buffer is required');
      }

      await this.minioClient.putObject(
        this.bucketName,
        objectName,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype || 'application/octet-stream' },
      );
      return { objectName };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getFileUrl(objectName: string) {
    return await this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      objectName,
    );
  }

  async deleteFile(objectName: string) {
    await this.minioClient.removeObject(this.bucketName, objectName);
  }
}
