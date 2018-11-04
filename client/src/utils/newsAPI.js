import axios from "axios";

export default {
  getFeeds: function (limit) {
    return axios.post("/api/users/login/", loginData)
  },
  register: function (loginData) {
    return axios.post("/api/users/register/", loginData)
  }
};