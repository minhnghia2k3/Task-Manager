import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateNewUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    { minLength: 8, minSymbols: 1, minUppercase: 1 },
    { message: 'Should use a strong password.' },
  )
  password: string;
}
