import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    createQuestion: async function (formData) {
        //console.log("creating data",formData)
        try {
            const response = await instance.post('admin/questions', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getQuestions: async function (pageSize,page, question_id = null) {
        let paramsObj = "";
        if(question_id) {
            paramsObj = "&filter[id]="+question_id;
        }
        try {
            const response = await instance.get('admin/questions?pageSize='+pageSize+'&page='+page+paramsObj, {
                headers: {
                    'Authorization': AuthService.getToken()
                },
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteQuestion: async function (id) {

        try {
            const response = await instance.delete('admin/questions/' + id, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    deleteBulkQuestion: async function (ids) {

        try {
            const response = await instance.delete('admin/bulk/questions?ids=' + ids, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    updateQuestion: async function (data,id) {
     
        try {
            const response = await instance.put('admin/questions/'+id, data, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    filterQuestion : async function (questionTypeIds,levelIds,diffLevelIds,complexityLevelIds,knowledgeLevelIds,bloomsTaxonomy,skillIds,subjectIds,pageSize,page){
        //console.log("filter function called");
        try{
            const response = await instance.get('admin/questions?filter[question_type]='+questionTypeIds+'&filter[level_id]='+levelIds+'&filter[difficulty_level]='+diffLevelIds+'&filter[complexity_level]='+complexityLevelIds+'&filter[knowledge_level]='+knowledgeLevelIds+'&filter[blooms_taxonomy]='+bloomsTaxonomy+'&filter[skill_id]='+skillIds+'&filter[subject_id]='+subjectIds+'&pageSize='+pageSize+'&page='+page,
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
    searchQuestion: async function (pageSize,page,search) {

        try {
            const response = await instance.get('admin/questions?pageSize='+pageSize+'&page='+page+'&search='+search, {
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