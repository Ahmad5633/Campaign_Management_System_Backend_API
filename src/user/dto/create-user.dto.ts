import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/chat/schema/user.schema';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The role of the user:(advertiser,publisher)' })
  readonly role: UserRole;
}
