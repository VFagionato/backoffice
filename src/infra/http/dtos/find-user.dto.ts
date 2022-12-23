import { IsOptional } from 'class-validator';

export class FindUserDTO {
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
}
