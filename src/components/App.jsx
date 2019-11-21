import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.css';
import Login from './pages/login';
import ProtectedRoute from './highOrder/ProtectedRoute';
import Home from './pages/home';
import NotFoundPage from './pages/NotFoundPage';

export default (props) => {

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path={['/signin','/signup']} component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  );

}