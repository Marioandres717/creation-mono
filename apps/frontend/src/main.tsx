import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Apollo from './app/context-provider/apollo';
import { Authentication } from './app/context-provider/authentication';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Apollo>
        {/* <Authentication> */}
          <App />
        {/* </Authentication> */}
      </Apollo>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
