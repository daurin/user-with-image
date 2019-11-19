import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.css';
import Login from './pages/login';
import ProtectedRoute from './highOrder/ProtectedRoute';
import Home from './pages/home';

export default (props) => {

  return (
    <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
  );

}