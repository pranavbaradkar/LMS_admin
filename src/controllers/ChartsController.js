import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getDashboardData: async function (formdata) {
        console.log(formdata)
        try {
            const response = await instance.get('admin/dashboard/reports',{
                params: formdata,
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getAssessmentData: async function (formdata) {
        console.log(formdata)
        try {
            const response = await instance.get('admin/assessment/reports',{
                params: formdata,
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getAssessmentUsersData: async function (formdata) {
        try {
            const response = await instance.get('admin/assessment/users/reports',{
                params: formdata,
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