import { ValidationError } from 'class-validator';

/**
 * Converts an array of ValidationError objects into a more user-friendly format.
 *
 * @param errors - An array of {@link ValidationError} objects returned from class-validator,
 * typically after validating a class instance.
 * @returns An object where each key is the name of a property
 * that failed validation, and the value is an array of error messages associated with that property.
 *
 * @example
 * const errors = {
 *   value: 'hi',
 *   property: 'name',
 *   children: [],
 *   constraints: { minLength: 'name must be longer than or equal to 3 characters' }
 * };
 *
 * transformValidationErrors(errors);
 * // {
 * //   name: ['name must be longer than or equal to 3 characters'],
 * // }
 */
export function transformValidationErrors(errors: ValidationError[]): Record<string, string[]> {
  return errors.reduce(
    (acc, error) => {
      const property = error.property;
      acc[property] = error.constraints ? Object.values(error.constraints) : [];
      return acc;
    },
    {} as Record<string, string[]>
  );
}
