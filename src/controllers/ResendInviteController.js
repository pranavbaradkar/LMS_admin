import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    resendInvite: async function (userId) {
        try {
            const response = await instance.post('admin/users/invite/'+userId, {
            },
            {
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

