import axios from "axios";

export default {
  login: function (loginData) {
    return axios.post("/api/users/login/", loginData)
  }
};