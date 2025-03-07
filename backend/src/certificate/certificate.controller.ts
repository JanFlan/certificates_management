import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { CreateCertificateDto } from './dtos/create-certificate.dto';
import { CertificateDto } from './dtos/certificate.dto';

@ApiTags('certificates')
@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @ApiOperation({ summary: 'Create a new certificate with an optional logo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        companyName: { type: 'string' },
        issueDate: { type: 'string' },
        certificateContent: { type: 'string' },
        logo: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The certificate has been successfully created',
    type: CertificateDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCertificateDto: CreateCertificateDto,
  ): Promise<CertificateDto> {
    if (!file) {
      throw new BadRequestException('Logo is required');
    }
    return this.certificateService.create(createCertificateDto, file);
  }

  @ApiOperation({ summary: 'Get a certificate by ID' })
  @ApiResponse({
    status: 200,
    description: 'The certificate has been successfully retrieved',
    type: CertificateDto,
  })
  @ApiResponse({ status: 404, description: 'Certificate not found' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<CertificateDto> {
    return this.certificateService.findOne(id);
  }

  @ApiOperation({ summary: 'Download the generated certificate image' })
  @ApiResponse({
    status: 200,
    description: 'The certificate image has been successfully retrieved',
  })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @Get(':id/image')
  async getImage(@Param('id') id: number, @Res() res: Response): Promise<any> {
    const certificate = await this.certificateService.findOne(id);
    if (!certificate?.generatedImagePath) {
      return res.status(404).send('Image not found');
    }
    if (certificate?.generatedImagePath) {
      const fileStream = fs.createReadStream(certificate.generatedImagePath);
      fileStream.pipe(res);
    }
  }
}
