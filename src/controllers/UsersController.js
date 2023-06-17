import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    createUser: async function (formData) {
        
        try {
            const response = await instance.post('admin/users', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getUsers: async function (pageSize,page, search) {

        try {
            const response = await instance.get('admin/users/list?pageSize='+pageSize+'&page='+page+'&search='+search
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getTeacher: async function (pageSize,page, search) {

        try {
            const response = await instance.get('admin/users/list?filter[user_type]=TEACHER&pageSize='+pageSize+'&page='+page+'&search='+search
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getJobSeeker: async function (pageSize,page,search) {

        try {
            const response = await instance.get('admin/users/list?filter[user_type]=JOB_SEEKER&pageSize='+pageSize+'&page='+page+'&search='+search
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    updatePersonalInfo: async function (data,id) {

        try {
            console.log("update data for personal info ",data, "id is",id)
            const response = await instance.put('admin/users/'+id,data
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
  async  getAcademics(id){
        try {
        
            const response = await instance.get('admin/users/'+id+'/academics'
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
     async  getprofessionalInfo(id){
        try {
        
            const response = await instance.get('admin/users/'+id+'/professional-infos'
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
  async  updateAcademics(data,userId,academicsId){
        try {
            console.log("academic data",data)
            console.log("update url",'admin/users/'+userId+'/academics/'+academicsId)
            const response = await instance.put('admin/users/'+userId+'/academics/'+academicsId,data
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
      async  updateProfessionalInfo(data,userId,professionalInfoId){
        try {
          
            const response = await instance.put('admin/users/'+userId+'/professional-infos/'+professionalInfoId,data
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    // getUsers: async function () {

    //     try {
    //         const response = await instance.get('admin/users/list?filter[user_type]=JOB_SEEKER', {
    //             headers: {
    //                 'Authorization': AuthService.getToken()
    //             }
    //         })
    //         return response;
    //     } catch (error) {
    //         return error.response;
    //     }
    // },
    deleteUser : async function (id) {
      
        try {
            const response = await instance.delete('admin/users/'+id,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    bulkDeleteUser : async function (ids) {
      
        try {
            console.log(ids," ids from controller")
            const response = await instance.delete('admin/bulk/users?ids='+ids,{
                headers: {
                    'Authorization': AuthService.getToken()
                  }
            })
            console.log("response here",response)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getUserDetails: async function (user_id) {
        try {
            const response = await instance.get(`admin/users/details/${user_id}`
                , {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
}