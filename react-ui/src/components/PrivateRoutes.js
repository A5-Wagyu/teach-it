import React, { useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';


class PrivateRoute extends Component {



  constructor(props) {
    super(props);
    this.temp = { component: Component, ...rest }
    let res;
    const { verifyToken } = useAuth();
    const verify = async () => {
      try {
        res = await verifyToken();
        console.log(res);
      } catch (err) {
        return <Redirect to='/login' />
      }
    }
    verify();
  }

  render() {
    return (
      <Route
        {...this.temp.rest}
        render={props => {
          return res.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }}
      />
    );
  }
}

// function PrivateRoute({ component: Component, ...rest }) {

//   const { verifyToken } = useAuth();
//   let res;
//   const verify = async () => {
//     try {
//       console.log("Verifying token");
//       res = await verifyToken();
//       console.log(res);
//       console.log("after making API call");
//       setLoading(false);
//     } catch (err) {
//       return <Redirect to='/login' />
//     }
//   }
//   verify();
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return res.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }}
//     />
//   )

// }

export default PrivateRoute
