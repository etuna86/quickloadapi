import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';
var data = JSON.stringify({
  "Username": "username",
  "Password": "password"
});

var config = {
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};

export const axiosAT = axios.create({
    config
})