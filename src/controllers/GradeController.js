import axios from 'axios'
import AuthService from '@/services/AuthService';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getAllGrades: async function () {
        try {
            const response = await instance.get('/meta/grades')
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,
    getAllGradesByPagination: async function (pageSize,page) {
        try {
            const response = await instance.get('/meta/grades?pageSize='+pageSize+'&page='+page)
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,
    updateGrade: async function (data,id) {
        try {
            const response = await instance.put('admin/meta/grades/'+id, data,
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
   

   createGrade : async function ( data) {   

        try {
            console.log("full grade data from controller",data)
            const response = await instance.post('admin/meta/grades',data,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteGrade : async function (id) {
        console.log("delete selected id",id)
        try {
            const response = await instance.delete('admin/meta/grades/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkGrade : async function (ids) {
        console.log("delete selected id",ids)
        try {
            const response = await instance.delete('admin/bulk/meta/grades?ids='+ids,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterGrade : async function (boardIds ,subjectIds,pageSize,page){
        console.log("filter function called" ,boardIds,subjectIds);
        try{
            const response = await instance.get('/meta/grades?filter[board_id]='+boardIds+'&filter[subject_id]='+subjectIds+'&pageSize='+pageSize+'&page='+page,
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
    searchGrade: async function (pageSize,page,search) {
        try {
            const response = await instance.get('/meta/grades?pageSize='+pageSize+'&page='+page+'&search='+search)
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,

}
