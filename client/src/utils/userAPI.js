import axios from "axios";

export default {
  setAuthToken: function(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  login: function (loginData) {
    return axios.post("/api/users/login/", loginData)
  },
  register: function (loginData) {
    return axios.post("/api/users/register/", loginData)
  },
  getProfile: function(loginData) {
    return new Promise((resolve, reject) => {
      resolve({profile: {name: "pepe", address: "no se, 33183"}})
    });
  },
  setProfile: function(userData) {
    return new Promise((resolve, reject) => {
      resolve({profile: {name: "pepe", address: "no se, 33183"}})
    });
  }
};