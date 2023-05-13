import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getBrands: async function () {
        try {
            const response = await instance.get('meta/brands')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getBrandsByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/brands?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    updateBrand: async function (name, description,id) {
        try {
            const response = await instance.put('admin/meta/brands/'+id, {
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
   

   createBrand : async function ( name,description) {
    console.log("barnd object",{"name" : name, "description": description });
        try {
            const response = await instance.post('admin/meta/brands', {
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

    deleteBrand : async function (id) {
              try {
                console.log("deleted id from controoler",id)
            const response = await instance.delete('admin/meta/brands/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkBrand : async function (ids) {
        try {
          console.log("deleted id from controoler admin/bulk/meta/brands?ids=",ids)
      const response = await instance.delete('admin/bulk/meta/brands?ids='+ids,{
          headers: {
              'Authorization': AuthService.getToken()
            }
      })
      return response;
  } catch (error) {
      return error.response;
  }
},
    searchBrand: async function (pageSize,page, search) {
    try {
        const response = await instance.get('meta/brands?pageSize='+pageSize+'&page='+page+'&search='+search)
        return response;
    } catch (error) {
        return error.response;
    }
},


}

