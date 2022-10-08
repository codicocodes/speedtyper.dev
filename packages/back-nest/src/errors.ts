import { ValidationError } from 'class-validator';

export class ValidationErrorContainer extends TypeError {
  errors: ValidationError[];
  constructor(name: string, errors: ValidationError[]) {
    const fields = errors.map((err) => err.property).join(', ');
    super(`Error validating ${name} for fields: ${fields}`);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationErrorContainer.prototype);
  }
}
