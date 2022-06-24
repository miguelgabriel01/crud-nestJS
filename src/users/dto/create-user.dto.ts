import { IsEmail, IsString, MinLength } from 'class-validator'; //importamos atributos de validação de campos

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
