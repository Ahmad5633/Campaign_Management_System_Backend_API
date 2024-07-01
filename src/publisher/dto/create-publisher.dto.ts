import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  VerticalPropertyName,
  PlacementType,
  LogoRequired,
  CBD,
} from '../enums';

export class CreatePublisherDto {
  @ApiProperty({
    example: 'TechCorp',
    description: 'The name of the company property',
  })
  @IsString()
  @IsNotEmpty()
  companyPropertyName: string;

  @ApiProperty({
    example: 'Technology',
    description: 'The vertical property name',
    enum: VerticalPropertyName,
  })
  @IsString()
  @IsEnum(VerticalPropertyName)
  verticalPropertyName: VerticalPropertyName;

  @ApiProperty({
    example: 'https://example.com',
    description: 'The website URL',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  websiteURL?: string;

  @ApiProperty({
    example: 'Banner',
    description: 'The placement type',
    enum: PlacementType,
  })
  @IsString()
  @IsEnum(PlacementType)
  placementType: PlacementType;

  @ApiProperty({ example: '10000', description: 'The size of the email list' })
  @IsString()
  @IsNotEmpty()
  emailListSize: string;

  @ApiProperty({ example: '20%', description: 'The open rate' })
  @IsString()
  @IsNotEmpty()
  openRate: string;

  @ApiProperty({ example: '2%', description: 'The click-through rate (CTR)' })
  @IsString()
  @IsNotEmpty()
  CTR: string;

  @ApiProperty({ example: '200', description: 'The expected number of clicks' })
  @IsString()
  @IsNotEmpty()
  expectedClicks: string;

  @ApiProperty({
    example: 'MailChimp',
    description: 'The email service provider',
    required: false,
  })
  @IsOptional()
  @IsString()
  emailServiceProvider?: string;

  @ApiProperty({ example: 'Male', description: 'The gender of the audience' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: 'A tech blog focusing on the latest in technology',
    description: 'Description of the property',
  })
  @IsString()
  @IsNotEmpty()
  descriptionOfProperty: string;

  @ApiProperty({
    example: '3',
    description: 'The number of ad units',
    required: false,
  })
  @IsOptional()
  @IsString()
  numberOfAdUnit?: string;

  @ApiProperty({
    example: 'Required',
    description: 'Whether a logo is required',
    enum: LogoRequired,
  })
  @IsString()
  @IsEnum(LogoRequired)
  logoRequired: LogoRequired;

  @ApiProperty({ example: '300x250', description: 'The size of the image' })
  @IsString()
  @IsNotEmpty()
  imageSize: string;

  @ApiProperty({
    example: '50 characters',
    description: 'The maximum length of the headline copy',
    required: false,
  })
  @IsOptional()
  @IsString()
  headlineCopyLength?: string;

  @ApiProperty({
    example: '100 characters',
    description: 'The maximum length of the body copy',
    required: false,
  })
  @IsOptional()
  @IsString()
  bodyCopyLength?: string;

  @ApiProperty({
    example: 'Allowed',
    description: 'Whether CBD products are allowed',
    enum: CBD,
  })
  @IsString()
  @IsEnum(CBD)
  CBD: CBD;

  @ApiProperty({
    example: '30 characters',
    description: 'The maximum length of the CTA copy',
    required: false,
  })
  @IsOptional()
  @IsString()
  CTACopyLength?: string;

  @ApiProperty({
    example: '200 characters',
    description: 'The maximum length of the editorial copy',
    required: false,
  })
  @IsOptional()
  @IsString()
  editorialCopyLength?: string;

  @ApiProperty({
    example: '7 days',
    description: 'Advance days required',
    required: false,
  })
  @IsOptional()
  @IsString()
  advanceDays?: string;

  @ApiProperty({
    example: 'Miscellaneous notes',
    description: 'Additional notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  miscNote?: string;

  @ApiProperty({
    example: '35',
    description: 'The average age of the audience',
    required: false,
  })
  @IsOptional()
  @IsString()
  averageAge?: string;

  @ApiProperty({
    example: '60000',
    description: 'Household income (HHI)',
    required: false,
  })
  @IsOptional()
  @IsString()
  HHI?: string;

  @ApiProperty({
    example: 'North America',
    description: 'The geographic location of the audience',
  })
  @IsString()
  @IsNotEmpty()
  audienceGEO: string;

  @ApiProperty({
    example: '70% mobile, 30% desktop',
    description: 'Mobile vs Desktop ratio',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobVsDesktop?: string;

  @ApiProperty({
    example: 'College',
    description: 'The educational level of the audience',
    required: false,
  })
  @IsOptional()
  @IsString()
  educationalLevel?: string;

  @ApiProperty({
    example: 'Professional',
    description: 'The professional level of the audience',
    required: false,
  })
  @IsOptional()
  @IsString()
  professionalLevel?: string;

  @ApiProperty({
    example: 'https://example.com/media-kit.pdf',
    description: 'URL to the media kit',
    required: false,
  })
  @IsOptional()
  @IsString()
  mediaKit?: string;

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
