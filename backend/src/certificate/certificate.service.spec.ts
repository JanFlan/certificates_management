import { Test, TestingModule } from '@nestjs/testing';
import { CertificateService } from './certificate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dtos/create-certificate.dto';
import { Repository } from 'typeorm';
import * as fs from 'fs';

jest.mock('fs');
jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setContent: jest.fn().mockResolvedValue(undefined),
      screenshot: jest
        .fn()
        .mockResolvedValue(
          'H:\\Dev\\JavaScript\\glasshub\\backend\\src\\uploads\\certificate_1.png',
        ),
      close: jest.fn().mockResolvedValue(undefined),
    }),
    close: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('CertificateService', () => {
  let service: CertificateService;
  let repository: Repository<Certificate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificateService,
        {
          provide: getRepositoryToken(Certificate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
    repository = module.get<Repository<Certificate>>(
      getRepositoryToken(Certificate),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save certificate with logo', async () => {
      const dto: CreateCertificateDto = {
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
      };
      const file = {
        originalname: 'certificate_1.png',
        buffer: Buffer.from(''),
      } as Express.Multer.File;
      const certificate = {
        id: 1,
        ...dto,
        logoPath:
          'H:\\Dev\\JavaScript\\glasshub\\backend\\src\\uploads\\certificate_1.png',
        generatedImagePath: 'path/to/image.png',
      };
      const savedCertificate = { ...certificate };

      jest.spyOn(repository, 'create').mockReturnValue(certificate as any);
      jest.spyOn(repository, 'save').mockResolvedValue(savedCertificate);
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
      jest
        .spyOn(service, 'generateCertificateImage')
        .mockResolvedValue('path/to/image.png');

      const result = await service.create(dto, file);

      expect(result).toEqual(savedCertificate);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        file.buffer,
      );
      expect(service.generateCertificateImage).toHaveBeenCalledWith(
        certificate,
      );
    });
  });

  describe('findOne', () => {
    it('should return a certificate', async () => {
      const certificate = {
        id: 1,
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(certificate as any);

      const result = await service.findOne(1);
      expect(result).toEqual(certificate);
    });
  });

  describe('generateCertificateImage', () => {
    it('should generate certificate image', async () => {
      const certificate = {
        id: 1,
        companyName: 'Test Company',
        issueDate: '2023-01-01',
        certificateContent: 'Test Content',
        logoPath:
          'H:\\Dev\\JavaScript\\glasshub\\backend\\src\\uploads\\certificate_1.png',
      };

      const result = await service.generateCertificateImage(certificate as any);

      expect(result).toBe(
        'H:\\Dev\\JavaScript\\glasshub\\backend\\src\\uploads\\certificate_1.png',
      );
    });
  });
});
