 // AuthService.js

import axios from 'axios'
import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'jwt'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
export default {

  login: async function (email, password) {
    try {
      const response = await instance.post('admin/login', { email, password });
      //console.log(response);
      if (response.data.success) {
        const token = response.data.token
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem('userDetails', JSON.stringify(response.data.admin));
        const response2 = await instance.get('admin',{
          headers: {
              'Authorization': this.getToken()
          }
        });
        localStorage.setItem('userDetails', JSON.stringify(response2.data.admin));
        return response.data.success;
      }
    } catch (error) {
      if (error.response.status === 404) {
        // handle 404 error
        //console.log('Resource not found.')
        return error.response.success;
      } else {
        // handle other errors
        //console.log('An error occurred:', error.message)
        return error.response.success;
      }
    }

  },
  logout: function () {
    localStorage.removeItem(TOKEN_KEY)
  },
  getUser: function () {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      return decoded
    }
    return null
  },
  getLogged: async function () {
    const response = await instance.get('admin',{
      headers: {
          'Authorization': this.getToken()
      }
    });
    console.log(JSON.stringify(response.data.admin));
    localStorage.setItem('userDetails', JSON.stringify(response.data.admin));
  },
  getPermissions: function() {
    const details = localStorage.getItem('userDetails');
    console.log("auth", JSON.parse(details).roles ? JSON.parse(JSON.parse(details).roles.permission) : {});
    return JSON.parse(details).roles ? JSON.parse(JSON.parse(details).roles.permission) : {};
  },
  getLoggedUser: function() {
    const details = localStorage.getItem('userDetails');
    return JSON.parse(details);
  },
  getToken: function () {
    return localStorage.getItem(TOKEN_KEY)
  },
  isAuthenticated: function () {
    const token = localStorage.getItem(TOKEN_KEY)
    return token && !this.isTokenExpired(token)
  },
  isTokenExpired: function (token) {
    const decoded = jwtDecode(token)
    const expirationDate = new Date(decoded.exp * 1000)
    return expirationDate < new Date()
  }
}
