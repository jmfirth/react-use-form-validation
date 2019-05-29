import * as React from 'react';
import { LoginForm, Login } from './LoginForm';
import 'bootstrap/dist/css/bootstrap.css';

const jdoe: Login = { email: 'jdoe@person.com', password: 'Abc1!' };

const authenticate = (login: Login) =>
  alert(
    `Authenticate with Login payload:\n${JSON.stringify(login, undefined, 2)}`
  );

const App: React.SFC = () => (
  <div className="app">
    <div className="container">
      <h1>
        <code>useFormValidation</code>
      </h1>
      <h2>Examples</h2>
      <h3>Empty form</h3>
      <LoginForm onSubmit={authenticate} />
      <br />
      <h3>Pre-populated form</h3>
      <LoginForm data={jdoe} onSubmit={authenticate} />
    </div>
  </div>
);

export default App;
