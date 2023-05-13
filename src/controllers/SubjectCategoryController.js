import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getCategory: async function () {
        try {
            const response = await instance.get('meta/subject-categories')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getCategoryByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('meta/subject-categories?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },



    updateCategory: async function (category,description,name, level_id, grade_id, icon, id) {
               try {
            const response = await instance.put('admin/meta/subject-categories/'+id, {
                "name": name,
                "level_id": level_id,
                "grade_id": grade_id,
                "category": category,
                "icon": icon,
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


    

   createCategory : async function ( category, description,name, level_id, grade_id,  icon,) {
        try {
            const response = await instance.post('admin/meta/subject-categories', {
                "name": name,
                "level_id": level_id,
                "grade_id": grade_id,
                "category": category,
                "icon": icon,
                "description": description,
                

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



    deleteCategory : async function (id) {
        console.log("delete selected url link",'admin/meta/subject-categories/'+id)
        try {
            const response = await instance.delete('admin/meta/subject-categories/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkCategory : async function (ids) {
        console.log("delete selected url link",'admin/meta/subject-categories/'+ids)
        try {
            const response = await instance.delete('admin/bulk/meta/subject-categories?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    searchSubCat: async function (pageSize,page,search) {
        try {
            const response = await instance.get('meta/subject-categories?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },


}