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
        console.log(formdata.search);
        try {
            const response = await instance.get(`admin/assessment/${formdata.assessment_id}/users/reports`,{
                params: formdata.searchData,
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    getCampaign: async function () {
        try {
            const response = await instance.get('admin/campaigns/dropdown',{
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    getSchool: async function () {
        try {
            const response = await instance.get('admin/schools/dropdown',{
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