import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getTopics: async function (payload) {
        console.log(payload);
        try {
            const response = await instance.get('/meta/topics', {
                params: {
                    filter:  payload
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getStrands: async function (payload) {
        try {
            const response = await instance.get('/meta/strands', {
                params: {
                    filter:  payload
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSubStrand: async function (payload) {
        try {
            const response = await instance.get('/meta/sub_strands',  {
                params: {
                    filter: payload
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    }
}