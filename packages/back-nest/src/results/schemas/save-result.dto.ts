import { IsNumber } from 'class-validator';

export class SaveResultDTO {
  @IsNumber()
  mistakes: number;
  @IsNumber()
  accuracy: number;
}
