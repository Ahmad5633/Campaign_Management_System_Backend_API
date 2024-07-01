import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertiserDto {
  @ApiProperty({
    example: 'ABC Corp',
    description: 'The name of the advertiser',
  })
  @IsString()
  @IsNotEmpty()
  advertiserName: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the contact person',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the contact person',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Jane Doe',
    description: 'The name of the invoicing contact',
  })
  @IsString()
  @IsNotEmpty()
  invoicingContactName: string;

  @ApiProperty({
    example: 'invoice@example.com',
    description: 'The email for sending invoices',
  })
  @IsString()
  @IsNotEmpty()
  emailForSendInvoice: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The mailing address for invoicing',
  })
  @IsString()
  @IsNotEmpty()
  invoicingMainlingAddress: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The primary contact number',
  })
  @IsString()
  @IsNotEmpty()
  primaryContact: string;

  @ApiProperty({
    example: '+0987654321',
    description: 'The additional contact number',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalContact?: string;

  @ApiProperty({
    example: 'Legal disclaimer text',
    description: 'The legal disclaimer',
    required: false,
  })
  @IsString()
  @IsOptional()
  legalDisclaimer?: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'The landing page URL',
  })
  @IsString()
  @IsNotEmpty()
  landingPage: string;

  @ApiProperty({
    example: 'utm_source=google',
    description: 'The UTM parameters',
  })
  @IsString()
  @IsNotEmpty()
  UTM: string;

  @ApiProperty({
    example: 'PROMO2024',
    description: 'The promotional code',
    required: false,
  })
  @IsString()
  @IsOptional()
  promoCode?: string;

  @ApiProperty({
    example: 'Our main value proposition',
    description: 'The main value proposition',
    required: false,
  })
  @IsString()
  @IsOptional()
  mainValueProposition?: string;

  @ApiProperty({
    example: 'What sets us apart from competitors',
    description: 'Apart from competitors',
    required: false,
  })
  @IsString()
  @IsOptional()
  apartFromCompetitors?: string;

  @ApiProperty({
    example: 'Special product details',
    description: 'Special products',
  })
  @IsString()
  @IsNotEmpty()
  specialProducts: string;

  @ApiProperty({
    example: 'Barriers to purchase',
    description: 'Barriers to purchase',
    required: false,
  })
  @IsString()
  @IsOptional()
  barriorToPurchase?: string;

  @ApiProperty({
    example: 'Additional information to mention',
    description: 'Anything to mention',
    required: false,
  })
  @IsString()
  @IsOptional()
  anythingToMension?: string;

  @ApiProperty({
    example: 'Successful message text',
    description: 'Successful message',
    required: false,
  })
  @IsString()
  @IsOptional()
  successfulMessage?: string;

  @ApiProperty({
    example: 'Target performance metrics',
    description: 'Target performance metrics',
    required: false,
  })
  @IsString()
  @IsOptional()
  targetPerformanceMetrices?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Advertiser logo file',
    required: false,
  })
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: 'utm_campaign=spring_sale',
    description: 'Specific UTM parameters',
    required: false,
  })
  @IsString()
  @IsOptional()
  specificUTMParameters?: string;

  @ApiProperty({
    example: 'Media intercept details',
    description: 'Media intercept',
  })
  @IsString()
  @IsNotEmpty()
  mediaIntercept: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Drop file here',
    required: false,
  })
  @IsOptional()
  @IsString()
  dropFileHere?: string;
}
