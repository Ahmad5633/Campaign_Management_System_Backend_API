import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlacementDto {
  @IsNotEmpty()
  @IsString()
  publisher: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  numberOfPlacements: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  openRate: string;

  @IsNotEmpty()
  @IsString()
  CTR: string;

  @IsNotEmpty()
  @IsString()
  expectedClicks: string;

  @IsNotEmpty()
  @IsString()
  emailServiceProvider: string;

  @IsNotEmpty()
  @IsString()
  logoRequired: string;

  @IsNotEmpty()
  @IsString()
  imageSize: string;
}
