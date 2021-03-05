import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useAuth from './useAuth';
import Home from './Home';
import SignIn from './SignIn';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/non-auth">
          <NonAuth />
        </Route>

        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

function Auth() {
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth) {
      window.location = '/non-auth/sign-in';
    }
  }, [auth]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function NonAuth() {
  return (
    <Router>
      <Switch>
        <Route path="/non-auth/sign-in">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}
