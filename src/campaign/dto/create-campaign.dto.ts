import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  landingPage: string;

  @IsNotEmpty()
  @IsString()
  UTMStructure: string;

  @IsNotEmpty()
  @IsString()
  performanceMetrices: string;

  @IsString()
  UTMParameters: string;

  @IsNotEmpty()
  @IsString()
  placementType: string;

  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsString()
  bussinessTags: string;

  @IsNotEmpty()
  @IsString()
  targetMarket: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  adGoal: string;
}
