import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const isLogged = localStorage.getItem('logged') === 'true';

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged && Component ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;