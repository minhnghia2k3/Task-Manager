import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateNewUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
