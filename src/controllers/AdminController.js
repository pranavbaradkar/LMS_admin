import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    async  getRoles(payload){
        try {
            const response = await instance.get('admin/roles', {
                headers: {
                    'Authorization': AuthService.getToken()
                },
                params: payload
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    createUser : async function (data) {
        try {
            const response = await instance.post('admin',
                data
                ,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    createRole : async function (data) {
        try {
            const response = await instance.post('admin/roles',
                data
                ,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    updateRole : async function (data, id) {
        try {
            const response = await instance.put(`admin/roles/${id}`, data, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSingleRole: async function(payload) {
        try {
            const response = await instance.get(`admin/roles/${payload.id}`, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    updateUser : async function (data, id) {
        try {
            const response = await instance.put(`admin/role/users/${id}`, data, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    
    getUsers: async function(payload) {
        try {
            const response = await instance.get('admin/role/users/', {
                headers: {
                    'Authorization': AuthService.getToken()
                },
                params: payload
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    getSingleUsers: async function(payload) {
        try {
            const response = await instance.get(`admin/role/users/${payload.id}`, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteUser : async function (id) {
      
        try {
            const response = await instance.delete('admin/role/users/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

}