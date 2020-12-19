import Axios from "axios";

export const submitLogin = async ({ email, password }) => {
  const url = '/login';
  let res;
  try {
    res = await Axios.post(url, {
      email: email,
      password: password
    });
  } catch (err) { throw err }
  return res.data
}

export const submitSignup = async ({ name, email, password }) => {
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