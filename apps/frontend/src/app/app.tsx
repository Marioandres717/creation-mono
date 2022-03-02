import './styles/fonts/fonts.css';
import './styles/global.css';

import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import { Authentication } from '../app/context-provider/authentication';

import { Switch, Route } from 'react-router-dom';
import Categories from './pages/categories/categories';

export function App() {
  return (
    <Authentication>
      <Switch>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Authentication>
  );
}

export default App;
