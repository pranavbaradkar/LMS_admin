import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getCountries: async function () {
        console.log('env',process.env.VUE_APP_API_URL)
        try {
            const response = await instance.get('meta/countries?[sortBy]=asc')
            return response;
           
        } catch (error) {
            return error.response;
        }
    },
    getStates: async function (countryId) {
        try {
            const response = await instance.get('meta/states?country_id='+countryId+'&[sortBy]=asc')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getDistricts: async function (stateId) {
        try {
            const response = await instance.get('/meta/districts?state_id='+stateId+'&[sortBy]=asc')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getTalukas: async function (districtId) {
        try {
            const response = await instance.get('meta/talukas?district_id='+districtId+'&[sortBy]=asc')
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,
    getCities: async function (stateId,talukaId) {
        try {
            const response = await instance.get('/meta/cities?state_id='+stateId+'&taluka_id='+talukaId+'&[orderBy]=city_name&[sortBy]=asc')
            return response;
        } catch (error) {
            return error.response;
        }
    }
}