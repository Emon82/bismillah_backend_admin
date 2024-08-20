import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    console.log(token)
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axios.headers.Authorization;
  }
};

export default setAuthToken;
