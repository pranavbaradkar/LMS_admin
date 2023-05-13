import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getSubject: async function () {
        try {
            const response = await instance.get('/meta/subjects')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSubjectByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('/meta/subjects?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    searchSubject: async function (pageSize,page,search) {
        try {
            const response = await instance.get('/meta/subjects?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    },



    updateSubject: async function (subName, subCat,icon, id) {
        console.log("update  subject", {
            "name": subName,
            "subject_category_id": subCat,
            "grade_id": -1,
            "level_id": -1,
            "icon": icon
        } )
               try {
            const response = await instance.put('admin/meta/subjects/'+id, {
                "name": subName,
                "subject_category_id": subCat,
                "grade_id": -1,
                "level_id": -1,
                "icon": icon
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


    

   createSubject : async function ( subName, subCat,icon) {
        console.log("creqating subject", {
            "name": subName,
            "subject_category_id": subCat,
            "grade_id": -1,
            "level_id": -1,
            "icon": icon
        } )
        try {        
            const response = await instance.post('/admin/meta/subjects',
                {
                    "name": subName,
                    "subject_category_id": subCat,
                    "grade_id": -1,
                    "level_id": -1,
                    "icon": icon
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



    deleteSubject : async function (id) {
        console.log("delete selected url link",'admin/meta/subject-category/'+id)
        try {
            const response = await instance.delete('admin/meta/subjects/'+id,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkSubject : async function (ids) {
        console.log("delete selected url link",'admin/meta/subject-category/'+ids)
        try {
            const response = await instance.delete('admin/bulk/meta/subjects?ids='+ids,
             { headers: {
                'Authorization': AuthService.getToken()
              }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterSubject : async function (subCategoriesIds,pageSize,page){
        console.log("filter function called");
        try{
            const response = await instance.get('/meta/subjects?filter[subject_category_id]='+subCategoriesIds+'&pageSize='+pageSize+'&page='+page,
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
    }



}