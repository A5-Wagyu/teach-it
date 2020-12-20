import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";

const AuthContext = React.createContext();

// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();
  const verifyToken = async () => {
    let res;
    try {
      res = await Axios.get('/verifyToken');
    } catch (err) {
      throw err;
    }
    return res.data;
  }

  const verifyLocalToken = () => {
    if (localStorage.getItem("jwt")) {
      const userID = localStorage.getItem("userID");
      const userName = localStorage.getItem("userName");
      // setIsAuthenticated(true);
      return {
        isAuthenticated: true,
        userID: userID,
        userName: userName,
      }
    } else {
      // setIsAuthenticated(true);
      return {
        isAuthenticated: false
      }
    }
  }

  const signup = async ({ name, email, password }) => {
    const url = '/signup';
    let res;
    try {
      res = await Axios.post(url, {
        name: name,
        email: email,
        password: password
      });
    } catch (err) { throw err }
    return res.data
  }

  const login = async ({ email, password }) => {
    const url = '/login';
    let res;
    try {
      res = await Axios.post(url, {
        email: email,
        password: password
      });
    } catch (err) { throw err }
    if (res.data.jwt) {
      console.log(res.data.jwt);
      // setIsAuthenticated(true);
      localStorage.setItem("jwt", res.data.jwt);
      localStorage.setItem("userID", res.data.userID);
      localStorage.setItem("userName", res.data.userName);
    }

    return res.data
  }

  const logout = async () => {
    const url = '/logout'
    const res = await Axios.post(url);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    // setIsAuthenticated(false);
    history.push("/");
  }

  const value = {
    signup,
    login,
    logout,
    verifyToken,
    verifyLocalToken,
    // isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}
