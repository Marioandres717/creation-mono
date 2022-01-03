import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Apollo from './app/context-provider/apollo';
import { Authentication } from './app/context-provider/authentication';
import App from './app/app';

import { Switch, Route } from 'react-router-dom';
import Register from './app/pages/register/register';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Apollo>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Authentication>
          <App />
        </Authentication>
      </Apollo>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
