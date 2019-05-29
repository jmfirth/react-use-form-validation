import classNames from 'classnames';
import * as React from 'react';

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  disabled: boolean;
  onClick?: () => any;
}

export const Button: React.SFC<ButtonProps> = ({
  disabled,
  onClick,
  children,
  type
}) => (
  <button
    type={type}
    className={classNames({
      btn: true,
      'btn-primary': !disabled,
      'btn-disabled': disabled
    })}
    disabled={disabled}
    aria-disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
