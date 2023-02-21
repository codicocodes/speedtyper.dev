import { IsOptional, IsString } from 'class-validator';

export class RaceSettingsDTO {
  @IsString()
  @IsOptional()
  language: string;
}
