import * as React from 'react';
import { render } from 'react-testing-library';
import useFormValidation, { FormValidationHook } from './';

interface HarnessProps<TState = any> {
  initialState: TState;
  children: (hook: FormValidationHook<TState>) => any;
}

const Harness: React.SFC<HarnessProps> = ({
  children,
  initialState: value
}) => {
  const validation = useFormValidation(value);
  return children(validation);
};

describe('useValidation', () => {
  it('sets initial state properly', () => {
    const initialState: string = '012345';
    let state = null;

    render(
      <Harness initialState={initialState}>
        {([current]) => {
          state = current;
          return <div />;
        }}
      </Harness>
    );

    expect(state).toBe(initialState);
  });
});
