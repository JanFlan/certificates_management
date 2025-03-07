import { Test, TestingModule } from '@nestjs/testing';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dtos/create-certificate.dto';
import { CertificateDto } from './dtos/certificate.dto';
import * as fs from 'fs';

describe('CertificateController', () => {
  let controller: CertificateController;
  let service: CertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificateController],
    })
      .useMocker((token) => {
        if (token === CertificateService) {
          return {
            create: jest.fn(),
            findOne: jest.fn(),
          };
        }
      })
      .compile();

    controller = module.get<CertificateController>(CertificateController);
    service = module.get<CertificateService>(CertificateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const dto: CreateCertificateDto = {
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
      };
      const file = {
        originalname: 'logo.png',
        buffer: Buffer.from(''),
      } as Express.Multer.File;
      const result: CertificateDto = {
        id: 1,
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
        logoPath: 'path/to/logo.png',
        generatedImagePath: 'path/to/image.png',
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(file, dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto, file);
    });
  });

  describe('findOne', () => {
    it('should return a certificate', async () => {
      const result: CertificateDto = {
        id: 1,
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
        logoPath: 'path/to/logo.png',
        generatedImagePath: 'path/to/image.png',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('getImage', () => {
    it('should return 404 if image not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getImage(1, res as any);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Image not found');
    });

    it('should pipe image if found', async () => {
      const result: CertificateDto = {
        id: 1,
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
        logoPath: 'path/to/logo.png',
        generatedImagePath: 'path/to/image.png',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        pipe: jest.fn(),
      };
      const fileStream = { pipe: jest.fn() };
      jest.spyOn(fs, 'createReadStream').mockReturnValue(fileStream as any);

      await controller.getImage(1, res as any);
      expect(fileStream.pipe).toHaveBeenCalledWith(res);
    });
  });
});
