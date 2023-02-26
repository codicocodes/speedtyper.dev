import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class RaceSettingsDTO {
  @IsString()
  @IsOptional()
  language: string;

  @IsBoolean()
  @IsOptional()
  isPublic: boolean;
}
