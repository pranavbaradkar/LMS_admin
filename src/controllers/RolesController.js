import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getAllRoles: async function () {
        try {
            const response = await instance.get('admin/roles')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getAllRolesByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('admin/roles?pageSize='+pageSize+'&page='+page ,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    
    updateRole: async function (name, description,id) {
        try {
            const response = await instance.put('admin/roles/'+id, {
                "name": name,
                "description": description
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
   

   createRole : async function ( name,description) {
        try {
            const response = await instance.post('admin/roles', {
                "name" : name,
                "description": description

            },{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteRole : async function (id) {
        console.log("url link",'admin/roles/'+id,)
        try {
            const response = await instance.delete('admin/roles/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteBulkRole : async function (ids) {
        console.log("url link",'admin/roles?ids='+ids,)
        try {
            const response = await instance.delete('admin/roles?ids='+ids,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    searchRole: async function (pageSize,page,search) {
        try {
            const response = await instance.get('admin/roles?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },

}

