import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getSkills: async function () {
        try {
            const response = await instance.get('/meta/skills')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSkillsByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('/meta/skills?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },



    updateSkills: async function (data,id) {
               try {
            const response = await instance.put('admin/meta/skills/'+id, data,
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


    

   createSkills : async function (data) {
        try {
            const response = await instance.post('/admin/meta/skills',
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



    deleteSkills : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/skills/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkSkills : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/skills?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterSkills : async function (skillsIds,pageSize,page){
        console.log("filter function called");
        try{
            const response = await instance.get('/meta/skills?filter[subject_id]='+skillsIds+'&pageSize='+pageSize+'&page='+page,
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
    searchSkills: async function (pageSize,page,search) {
        try {
            const response = await instance.get('/meta/skills?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },


}