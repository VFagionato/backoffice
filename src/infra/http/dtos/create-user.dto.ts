import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  /**
   * first name
   * @example Jackson
   */
  @IsNotEmpty()
  name: string;

  /**
   * the password will be hashed before save
   * @example any_password
   */
  @IsNotEmpty()
  password: string;

  /**
   * use for login
   * @example any@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * use to authorization in resources.
   * 0 = user and 1 = admin
   * @example 0
   */
  @IsNumber()
  @IsOptional()
  permission: number;

  /**
   * phone number
   * @example 11937652817
   */
  @IsNotEmpty()
  @Length(10, 11)
  phone: string;
}
