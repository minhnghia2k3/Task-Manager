import { IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsStrongPassword()
  password: string;
}
