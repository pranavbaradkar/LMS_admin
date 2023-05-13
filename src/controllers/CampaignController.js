import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    // getCampaigns: async function () {
    //     try {
    //         console.log("campain start controller")
    //         const response = await instance.get('admin/campaigns', {
    //             headers: {
    //                 'Authorization': AuthService.getToken()
    //             }
    //         })
    //         console.log("campain end controller",response)
    //         return response;
    //     } catch (error) {
    //         return error.response;
    //     }
    // },

    async  getCampaigns(){
       
        try {
            console.log("campain start controller")
            const response = await instance.get('admin/campaigns', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            console.log("campain end controller",response)
            return response;
        } catch (error) {
            return error.response;
        }


},

    


updateCampaign: async function (data,id) {
    try {
 const response = await instance.put('admin/campaigns/'+id, 
     data,{
     headers: {
         'Authorization': AuthService.getToken()
       }
 })
 return response;
} catch (error) {
 return error.response;
}
},
deleteCampaign: async function (id) {
    try {
 const response = await instance.delete('admin/campaigns/'+id, 
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

   


    

   createCampaign : async function (data) {
        try {
            const response = await instance.post('admin/campaigns',
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