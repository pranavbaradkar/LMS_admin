import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getBoards: async function () {
        try {
            const response = await instance.get('meta/boards')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getBoardsByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/boards?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },


    updateBoard: async function (name, type, logo,id) {
        try {
            const response = await instance.put('admin/meta/boards/'+id, {
                "name": name,
                "type": type,
                "logo": logo

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


    

   createBoard : async function ( name, type_, logo) {
   
        try {
            const response = await instance.post('/admin/meta/boards', {
                "name": name,
                "type": type_,
                "logo": logo
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



    deleteBoard : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/boards/'+id,
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
    deleteBulkBoard : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/boards?ids='+ids,
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

    searchBoard: async function (pageSize,page , search) {
        try {
            const response = await instance.get('meta/boards?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },


}