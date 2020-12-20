import React, { useContext, useState, useEffect } from 'react'
import Axios from "axios";

const AuthContext = React.createContext();


// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUserID, setCurrentUserID] = useState();
  const [currentUserName, setCurrentUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    let res;
    try {
      res = await Axios.get('/verifyToken');
    } catch (err) {
      throw err;
    }
    return res.data;
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

    setIsAuthenticated(res.data.isAuthenticated);
    return res.data
  }

  const logout = async () => {
    const url = '/logout'
    const res = await Axios.post(url);
    setIsAuthenticated(res.data.isAuthenticated);
  }



  const value = {
    currentUserID,
    currentUserName,
    isAuthenticated,
    signup,
    login,
    logout,
    verifyToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}
