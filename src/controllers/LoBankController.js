import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getLO: async function () {
        try {
            const response = await instance.get('meta/learning-objectives')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getLOByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/learning-objectives?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },



    updateLO: async function (io_code,name,id) {
        console.log("updating data function controller ")
    
               try {
            const response = await instance.put('admin/meta/learning-objectives/'+id, 
            {
                "prerequisite_lo_id": 1,
                    "io_code": io_code,
                    "name": name               
            } 
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


    

   createLO : async function (io_code,name) {
        try {
            const response = await instance.post('admin/meta/learning-objectives',
            {
                "prerequisite_lo_id":1,
                    "io_code": io_code,
                    "name": name
               
            }               

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



    deleteLO : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/learning-objectives/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkLO : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/learning-objectives?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    searchLoBank: async function (pageSize,page,search) {
        try {
            const response = await instance.get('meta/learning-objectives?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },


}