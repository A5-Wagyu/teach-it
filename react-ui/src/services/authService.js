import Axios from 'axios';
import { useHistory } from "react-router-dom";


export const verifyLocalToken = () => {


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


export const signup = async ({ name, email, password }) => {
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


export const login = async ({ email, password }) => {
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
    localStorage.setItem("jwt", res.data.jwt);
    localStorage.setItem("userID", res.data.userID);
    localStorage.setItem("userName", res.data.userName);
  }
  return res.data
}


export const logout = async () => {
  const history = useHistory;
  const url = '/logout'
  const res = await Axios.post(url);
  localStorage.removeItem("jwt");
  localStorage.removeItem("userName");
  localStorage.removeItem("userID");
  history.push("/");
}


