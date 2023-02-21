import { IsString } from 'class-validator';

export class LanguageDTO {
  @IsString()
  language: string;
  @IsString()
  name: string;
}
