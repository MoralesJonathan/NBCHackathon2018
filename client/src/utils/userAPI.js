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
  getProfile: function(profile) {
    return new Promise((resolve, reject) => {
      axios.post("/api/profile/", {...profile, json: true});
    });
  },
  setProfile: function(profile) {
    return new Promise((resolve, reject) => {
      axios.get("/api/profile/new/", profile);
    });
  }
};