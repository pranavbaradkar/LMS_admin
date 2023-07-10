import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    createAssessment: async function (formData) {
        try {
            //console.log("pushing data",formData)
            const response = await instance.post('admin/assessments', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
   async getScreeningUser(id){
       
            try {
                console.log(id)
                const response = await instance.get('admin/assessments/'+id+'/configurations/screening/users', {

                    headers: {
                        'Authorization': AuthService.getToken()
                    }
                })
                return response;
            } catch (error) {
                return error.response;
            }


    },
    async getUserAssessments(id, status) {
        let params = {
            filter: {
                screening_status: status,
                mains_status: status
            }
        }
        try {
            const response = await instance.get('admin/users/assessments/'+id, {
                headers: {
                    'Authorization': AuthService.getToken()
                },
                params: params
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async getMainsUser(id){
       
        try {
           console.log(id)
            const response = await instance.get('admin/assessments/'+id+'/configurations/mains/users', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }


},

    createScreening: async function (formData,no) {
        try {

            const response = await instance.post('admin/assessments/'+no+'/configurations/screening', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    screeningQuestions: async function (id) {
        try {  
           
            const response = await instance.get('admin/assessments/'+id+'/configurations/screening/questions', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    mainsQuestions: async function (id) {
        try {  
           
            const response = await instance.get('admin/assessments/'+id+'/configurations/mains/questions', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },



    createMains: async function (formData,no) {
        try {
            console.log("mains data",formData,"id=",no)
            const response = await instance.post('admin/assessments/'+no+'/configurations/mains', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },


    updateAssessments: async function (formData,no) {
        try {
            console.log("mains data",formData,"id=",no)
            const response = await instance.put('admin/update/assessments/'+no, formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },



    publishResults: async function (assessmentId,type) {
        try {  
            const response = await instance.get('admin/result/assessments/'+assessmentId+'?type='+type, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },



    getAssessments: async function () {

        try {
            const response = await instance.get('admin/assessments',{
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    getAssessmentData: async function (id) {
        try {
            const response = await instance.get(`admin/assessments/${id}/configurations`,{
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteAssessment: async function (id) {

        try {
            const response = await instance.delete('admin/delete/assessments/' + id, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSubject: async function () {
        try {
            const response = await instance.get('/meta/subjects')
            return response;
        } catch (error) {
            return error.response;
        }
    },
}