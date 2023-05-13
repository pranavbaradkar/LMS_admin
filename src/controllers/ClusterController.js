import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getAllClusters: async function () {
        try {
            const response = await instance.get('meta/clusters')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getAllClustersByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/clusters?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    
    updateCluster: async function (name, description,id) {
        try {
            const response = await instance.put('admin/meta/clusters/'+id, {
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
   

   createCluster : async function ( name,description) {
        try {
            const response = await instance.post('admin/meta/clusters', {
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

    deleteCluster : async function (id) {
        console.log("url link",'admin/meta/clusters/'+id,)
        try {
            const response = await instance.delete('admin/meta/clusters/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteBulkCluster : async function (ids) {
        console.log("url link",'admin/bulk/meta/clusters?ids='+ids,)
        try {
            const response = await instance.delete('admin/bulk/meta/clusters?ids='+ids,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    searchCluster: async function (pageSize,page,search) {
        try {
            const response = await instance.get('meta/clusters?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },

}

