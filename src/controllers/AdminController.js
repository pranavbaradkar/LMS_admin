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




}