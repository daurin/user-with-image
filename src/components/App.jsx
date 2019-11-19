import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.css';
import Login from './pages/login';
import ProtectedRoute from './highOrder/ProtectedRoute';

export default (props) => {

  return (
    <BrowserRouter>
        <Switch>
          <Route path='/' component={Login} />
        </Switch>
      </BrowserRouter>
  );

}