import * as React from 'react';
import { Button } from './Button';
import { TextInput } from './TextInput';
import useFormValidation from 'react-use-form-validation';
import * as validations from './validations';

export interface Login {
  email: string;
  password: string;
}

const emptyLogin: Login = { email: '', password: '' };

export interface LoginFormProps {
  data?: Login;
  onSubmit?: (value: Login) => any;
}

export const LoginForm: React.SFC<LoginFormProps> = ({
  data: {
    email = emptyLogin.email,
    password = emptyLogin.password
  } = emptyLogin,
  onSubmit
}) => {
  const initialState: Login = { email, password };

  const [state, setState, validation] = useFormValidation(initialState, {
    email: validations.email,
    password: validations.password
  });

  const setEmail = (email: Login['email']) => setState({ email });

  const setPassword = (password: Login['password']) => setState({ password });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation.valid || !onSubmit) return;
    onSubmit(state);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <p>Please enter your email address and password:</p>
      <TextInput
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={setEmail}
        validation={validation.results.email}
      />
      <TextInput
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={setPassword}
        validation={validation.results.password}
      />
      <Button type="submit" disabled={!validation.valid}>
        Login
      </Button>
    </form>
  );
};
