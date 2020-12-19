import React, { useContext, useState, useEffect } from 'react'
import { submitLogin, submitSignup } from "../services/authService";

const AuthContext = React.createContext();


// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()

  function signup({ name, email, password }) {
    return submitSignup({
      email: email,
      password: password,
      name: name
    })
  }

  function login({ email, password }) {
    return submitLogin({
      email: email,
      password: password
    })
  }

  const value = {
    currentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}
