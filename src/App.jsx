import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useAuth from './useAuth';
import Home from './Home';
import SignIn from './SignIn';
import ToDoList from './ToDoList';

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

  if (!auth) window.location = 'non-auth/sign-in';

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/current-user/待处理">
          <ToDoList />
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
