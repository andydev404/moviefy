import React from 'react';
import Header from './components/shared/Header';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Single from './pages/Single';
export default () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" component={Single} />
      </Switch>
    </React.Fragment>
  );
};
