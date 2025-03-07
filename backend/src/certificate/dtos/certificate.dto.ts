import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CertificateDto {
  @ApiProperty({ description: 'The ID of the certificate' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'The name of the company' })
  @Expose()
  companyName: string;

  @ApiProperty({ description: 'The date the certificate was issued' })
  @Expose()
  issueDate: string;

  @ApiProperty({ description: 'The path to the logo' })
  @Expose()
  logoPath: string;

  @ApiProperty({ description: 'The content of the certificate' })
  @Expose()
  certificateContent: string;

  @ApiProperty({ description: 'The path to the generated certificate image' })
  @Expose()
  generatedImagePath: string;
}
