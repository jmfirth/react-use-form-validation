import classNames from 'classnames';
import * as React from 'react';
import { ValidationResult } from 'react-use-form-validation';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface TextInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => any;
  validation?: ValidationResult;
  type?:
    | 'date'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  inputProps?: Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'value'
  >;
}

export const TextInput: React.SFC<TextInputProps> = ({
  id,
  label,
  onChange,
  validation,
  inputProps: { className, ...inputProps } = { className: undefined },
  placeholder = inputProps.placeholder,
  value = inputProps.defaultValue,
  type = 'text'
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <input
      {...inputProps}
      id={id}
      className={classNames({
        [`${className}`]: !!className,
        'form-control': true,
        'is-valid': !!validation && validation.valid,
        'is-invalid': !!validation && validation.modified && !validation.valid
      })}
      type={type}
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
    />
    {!!validation && validation.modified && !validation.valid && (
      <ul className="list-group">
        {validation.errors.map((error, index) => (
          <li className="list-group-item list-group-item-danger" key={index}>
            <small>{error}</small>
          </li>
        ))}
      </ul>
    )}
  </div>
);
