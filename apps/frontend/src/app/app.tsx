import './styles/fonts/fonts.css';
import './styles/global.css';

import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';

import { Switch, Route } from 'react-router-dom';


export function App() {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
