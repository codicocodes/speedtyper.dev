import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationErrorContainer } from 'src/errors';

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
