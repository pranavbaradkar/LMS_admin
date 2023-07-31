import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});


export default {
    getSchool: async function () {
        try {
            console.log(AuthService.getUser());
            const response = await instance.get('meta/schools', {
                params: { admin_id : AuthService.getUser().user_id }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSchoolByPagiation: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/schools?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },


    updateSchool: async function (data,id) {
               try {
            const response = await instance.put('admin/meta/schools/'+id, 
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


    

   createSchool : async function (data) {
    
        try {
            console.log("data from school controller")
            const response = await instance.post('admin/meta/schools',data       

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



    deleteSchool : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/schools/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkSchool : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/schools?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterSchool : async function (brandIds,clusterIds, boardIds ,subjectIds, pageSize,page){
        console.log("filter function called");
        try{
            const response = await instance.get('meta/schools?filter[brand_id]='+brandIds+'&filter[cluster_id]='+clusterIds+'&filter[board_id]='+boardIds+'&filter[subject_id]='+subjectIds+'&pageSize='+pageSize+'&page='+page,
            {
                headers:{
                    'Authorization':AuthService.getToken()
                }
            })
            return response;
        }
        catch (error){
            return error.response; 
        }
    },
    searchSchool: async function (pageSize,page , search) {
        try {
            const response = await instance.get('meta/schools?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },

}