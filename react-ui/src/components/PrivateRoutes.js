import React, { useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';


function PrivateRoute({ component: Component, ...rest }) {

  const { verifyLocalToken } = useAuth();

  const res = verifyLocalToken();
  console.log(res);

  return (
    <Route
      {...rest}
      render={props => {
        return res.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )

}

export default PrivateRoute
