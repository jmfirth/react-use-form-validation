import * as React from 'react';

/** A field validation. */
export interface Validation<TState> {
  /** A test function. */
  test: (value: TState) => boolean;
  /** The error message to show on test failure. */
  errorMessage: string;
}

/** A set of validations for a form, arranged by key. */
export type FormValidations<TState> = {
  [key in keyof TState]: Validation<TState[key]>[]
};

/** The result of executing validations against a field. */
export interface ValidationResult {
  /** An array of error messages realized after running all validations against a field. */
  errors: string[];
  /** Whether the field has been modified. */
  modified: boolean;
  /** Whether the field passed all validations. */
  valid: boolean;
}

/** The form validations. */
export interface ValidationState<TState> {
  /** Validation results by field. */
  results: { [field in keyof TState]: ValidationResult };
  /** Whether the entire form is valid. */
  valid: boolean;
}

/** The set state function. */
export type SetStateFn<TState> = (value: Partial<TState>) => void;

/** The validation function. */
export type ValidateFn = () => boolean;

/** The hook return type. */
export type FormValidationHook<TState> = [
  TState,
  SetStateFn<TState>,
  ValidationState<TState>,
  ValidateFn
];

/**
 * Returns a stateful value, a function to update it that also executes
 * validations, the current validation state, and a function to
 * programmatically trigger validations.
 *
 * @param initialState The initial form state.
 * @param validations The set of all form validations.
 */
export default function useFormValidation<TState extends object>(
  initialState: TState,
  validations = {} as FormValidations<TState>
): FormValidationHook<TState> {
  const [state, setStateInner] = React.useState(initialState);

  const validateForm = (value: TState) => {
    return (Object.keys(validations) as Array<keyof TState>)
      .map(key => ({
        key,
        validations: validations[key]
      }))
      .map(({ key, validations }) => ({
        key,
        errors: validations
          .map(validation =>
            validation.test(value[key]) ? '' : validation.errorMessage
          )
          .filter(Boolean)
      }))
      .reduce(
        (previous, current) => ({
          results: {
            ...previous.results,
            [current.key]: {
              errors: current.errors,
              modified: initialState[current.key] !== value[current.key],
              valid: !current.errors.length
            }
          },
          valid: previous.valid && !current.errors.length
        }),
        { results: {}, valid: true }
      ) as ValidationState<TState>;
  };

  const [validation, setValidation] = React.useState(
    validateForm(initialState)
  );

  const setState: SetStateFn<TState> = value => {
    const newState = { ...state, ...value };
    setStateInner(newState);
    setValidation(validateForm(newState));
  };

  const validate: ValidateFn = () => {
    const validationState = validateForm(state);
    setValidation(validationState);
    return validationState.valid;
  };

  return [state, setState, validation, validate];
}
