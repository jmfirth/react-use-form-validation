import { Validation } from 'react-use-form-validation';

// A validation to test arbitrary length
export const minLength = (
  length: number,
  message?: string
): Validation<string> => ({
  test: value => (value || '').length >= length,
  errorMessage: message || `Must be at least ${length} characters long`
});

// A validation to test arbitrary RegExp for a match
export const match = (match: RegExp, message?: string): Validation<string> => ({
  test: value => !!match.exec(value),
  errorMessage: message || `Must contain ${match}`
});

// Custom email validations
export const email = [
  match(/@/, 'Must contain @ symbol'),
  match(/@.+\.[A-Za-z]{2,}$/, 'Must end with a domain')
];

// Custom password validations
export const password = [
  minLength(5),
  match(/\d/, 'Must contain at least one number'),
  match(/[a-z]/, 'Must contain at least one lowercase letter'),
  match(/[A-Z]/, 'Must contain at least one capital letter'),
  match(/[!@#\$%\^\&*\)\(+=._-]/, 'Must contain at least one special character')
];
