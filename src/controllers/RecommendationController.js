import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getRecommendations: async function (type) {
        try {
            const response = await instance.get('admin/users/recommendation',{
                headers: {
                    'Authorization': AuthService.getToken()
                },
                params: {filter: {
                    user_type: type
                } }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
}