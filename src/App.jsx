import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useAuth } from './miscellaneous';
import Home from './Home';
import SignIn from './SignIn';
import ToDoList from './ToDoList';
import EmployerList from './EmployerList';
import CandidateList from './CandidateList';
import Candidate from './Candidate';

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

        <Route exact path="/candidate">
          <CandidateList />
        </Route>

        <Route path="/candidate/:id">
          <Candidate />
        </Route>

        <Route exact path="/employer">
          <EmployerList />
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
