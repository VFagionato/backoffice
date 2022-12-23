import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsOptional()
  permission: number;

  @IsNotEmpty()
  @Length(10, 11)
  phone: string;
}
