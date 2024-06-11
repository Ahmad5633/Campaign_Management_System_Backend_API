import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdvertiserDto {
  @IsString()
  @IsNotEmpty()
  advertiserName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  invoicingContactName: string;

  @IsString()
  @IsNotEmpty()
  emailForSendInvoice: string;

  @IsString()
  @IsNotEmpty()
  invoicingMainlingAddress: string;

  @IsString()
  @IsNotEmpty()
  primaryContact: string;

  @IsString()
  @IsOptional()
  additionalContact?: string;

  @IsString()
  @IsOptional()
  legalDisclaimer?: string;

  @IsString()
  @IsNotEmpty()
  landingPage: string;

  @IsString()
  @IsNotEmpty()
  UTM: string;

  @IsString()
  @IsOptional()
  promoCode?: string;

  @IsString()
  @IsOptional()
  mainValueProposition?: string;

  @IsString()
  @IsOptional()
  apartFromCompetitors?: string;

  @IsString()
  @IsNotEmpty()
  specialProducts: string;

  @IsString()
  @IsOptional()
  barriorToPurchase?: string;

  @IsString()
  @IsOptional()
  anythingToMension?: string;

  @IsString()
  @IsOptional()
  successfulMessage?: string;

  @IsString()
  @IsOptional()
  targetPerformanceMetrices?: string;

  @IsOptional()
  logo?: File;

  @IsString()
  @IsOptional()
  specificUTMParameters?: string;

  @IsString()
  @IsNotEmpty()
  mediaIntercept: string;
}
