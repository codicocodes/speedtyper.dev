import { ValidationError } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationErrorContainer extends TypeError {
  errors: ValidationError[];
  constructor(name: string, errors: ValidationError[]) {
    const fields = errors.map((err) => err.property).join(', ');
    super(`Error validating ${name} for fields: ${fields}`);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationErrorContainer.prototype);
  }
}

export const validateDTO = async <T>(
  dto: ClassConstructor<T>,
  obj: unknown,
) => {
  const instance = plainToInstance(dto, obj);
  const errors = await validate(instance as object);
  if (errors.length > 0) {
    throw new ValidationErrorContainer(dto.name, errors);
  }
  return instance;
};
