import { UserRole } from 'src/chat/schema/user.schema';
export class CreateUserDto {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly role: UserRole;
}
