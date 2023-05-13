import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getLevel: async function () {
        try {
            const response = await instance.get('/meta/levels')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getLevelByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('/meta/levels?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },



    updateLevel: async function (data,id) {
               try {
                console.log("data from updata level controller",data)
            const response = await instance.put('admin/meta/levels/'+id,data,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },


    

   createLevel : async function (data) {
        try {
            console.log("Level data", data )
            const response = await instance.post('/admin/meta/levels',
               data
               ,
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



    deleteLevel : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/levels/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkLevel : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/levels?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterLevel : async function (gradesIds,pageSize,page){
        console.log("filter function called");
        try{
            const response = await instance.get('/meta/levels?filter[grade_id]='+gradesIds+'&pageSize='+pageSize+'&page='+page,
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
    searchLevel: async function (pageSize,page,search) {
        try {
            const response = await instance.get('/meta/levels?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },



}