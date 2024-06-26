import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'The password of the user',
  })
  @IsString()
  readonly password: string;
}
