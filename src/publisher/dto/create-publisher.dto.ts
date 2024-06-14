import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import {
  VerticalPropertyName,
  PlacementType,
  LogoRequired,
  CBD,
} from '../enums';

export class CreatePublisherDto {
  @IsString()
  @IsNotEmpty()
  companyPropertyName: string;

  @IsString()
  @IsEnum(VerticalPropertyName)
  verticalPropertyName: VerticalPropertyName;

  @IsOptional()
  @IsUrl()
  websiteURL?: string;

  @IsString()
  @IsEnum(PlacementType)
  placementType: PlacementType;

  @IsString()
  @IsNotEmpty()
  emailListSize: string;

  @IsString()
  @IsNotEmpty()
  openRate: string;

  @IsString()
  @IsNotEmpty()
  CTR: string;

  @IsString()
  @IsNotEmpty()
  expectedClicks: string;

  @IsOptional()
  @IsString()
  emailServiceProvider?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  descriptionOfProperty: string;

  @IsOptional()
  @IsString()
  numberOfAdUnit?: string;

  @IsString()
  @IsEnum(LogoRequired)
  logoRequired: LogoRequired;

  @IsString()
  @IsNotEmpty()
  imageSize: string;

  @IsOptional()
  @IsString()
  headlineCopyLength?: string;

  @IsOptional()
  @IsString()
  bodyCopyLength?: string;

  @IsString()
  @IsEnum(CBD)
  CBD: CBD;

  @IsOptional()
  @IsString()
  CTACopyLength?: string;

  @IsOptional()
  @IsString()
  editorialCopyLength?: string;

  @IsOptional()
  @IsString()
  advanceDays?: string;

  @IsOptional()
  @IsString()
  miscNote?: string;

  @IsOptional()
  @IsString()
  averageAge?: string;

  @IsOptional()
  @IsString()
  HHI?: string;

  @IsString()
  @IsNotEmpty()
  audienceGEO: string;

  @IsOptional()
  @IsString()
  mobVsDesktop?: string;

  @IsOptional()
  @IsString()
  educationalLevel?: string;

  @IsOptional()
  @IsString()
  professionalLevel?: string;

  @IsOptional()
  @IsString()
  mediaKit?: string;

  @IsOptional()
  @IsString()
  dropFileHere?: string;
}
