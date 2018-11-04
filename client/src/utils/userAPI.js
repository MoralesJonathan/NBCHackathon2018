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
  setProfile: function(profile) {
    return axios.post("/api/profile/new/", {...profile, json: true});
  },
  getProfile: function() {
    return axios.get("/api/profile/")
  }
};