import React, { useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { verifyLocalToken } from "../services/authService";


function PrivateRoute({ component: Component, ...rest }) {


  const res = verifyLocalToken();

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
