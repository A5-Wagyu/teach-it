import React, { useContext, useState, useEffect } from 'react'
import Axios from "axios";

const AuthContext = React.createContext();


// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUserID, setCurrentUserID] = useState()
  const [currentUserName, setCurrentUserName] = useState('')

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
    setCurrentUserID(res.data.userID);
    setCurrentUserName(res.data.userName);
    return res.data
  }

  const logout = () => Axios.get('url');


  const value = {
    currentUserID,
    currentUserName,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}
