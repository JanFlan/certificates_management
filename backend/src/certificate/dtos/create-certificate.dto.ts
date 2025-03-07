import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({ description: 'The name of the company' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'The date the certificate was issued' })
  @IsNotEmpty()
  @IsString()
  issueDate: string;

  @ApiProperty({ description: 'The content of the certificate' })
  @IsNotEmpty()
  @IsString()
  certificateContent: string;
}
