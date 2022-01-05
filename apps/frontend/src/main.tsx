import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Apollo from './app/context-provider/apollo';
import App from './app/app';
import Register from './app/pages/register/register';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Apollo>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Apollo>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
