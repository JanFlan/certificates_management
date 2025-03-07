import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dtos/create-certificate.dto';
import * as path from 'path';
import * as fs from 'fs';
import puppeteer from 'puppeteer';
import { plainToInstance } from 'class-transformer';
import { CertificateDto } from './dtos/certificate.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('certificates')
@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  @ApiOperation({ summary: 'Create a new certificate with an optional logo' })
  async create(
    createCertificateDto: CreateCertificateDto,
    file?: Express.Multer.File,
  ): Promise<CertificateDto> {
    const certificate = this.certificateRepository.create(createCertificateDto);
    if (file) {
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const logoPath = path.join(uploadsDir, file.originalname);
      fs.writeFileSync(logoPath, file.buffer);
      certificate.logoPath = logoPath;
      console.log('Logo saved at:', logoPath);
    }
    const savedCertificate = await this.certificateRepository.save(certificate);
    const imagePath = await this.generateCertificateImage(savedCertificate);
    savedCertificate.generatedImagePath = imagePath;
    const finalCertificate =
      await this.certificateRepository.save(savedCertificate);
    return plainToInstance(CertificateDto, finalCertificate);
  }

  @ApiOperation({ summary: 'Get a certificate by ID' })
  async findOne(id: number): Promise<CertificateDto> {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
    });
    return plainToInstance(CertificateDto, certificate);
  }

  generateCertificateImage = async (
    certificate: Certificate,
  ): Promise<string> => {
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({});
    const page = await browser?.newPage();

    const logoHtml = certificate.logoPath
      ? `<img src="data:image/png;base64,${fs.readFileSync(certificate.logoPath, { encoding: 'base64' })}" alt="Logo" style="width: 100px; height: auto;" />`
      : '';

    const htmlContent = `
      <html>
        <body>
          ${logoHtml}
          <h1>${certificate.companyName}</h1>
          <p>Issued on: ${certificate.issueDate}</p>
          <div>${certificate.certificateContent}</div>
        </body>
      </html>
    `;

    await page?.setContent(htmlContent);
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const imagePath = path.join(
      uploadsDir,
      `certificate_${certificate.id}.png`,
    );
    await page?.screenshot({ path: imagePath });
    await browser?.close();
    return imagePath;
  };
}
