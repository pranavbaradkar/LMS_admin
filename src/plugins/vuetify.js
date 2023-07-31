import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes:{
            light:{
                primary:'#000000',
                secondary:'#F9F8F9',
                background:'#faf8ee',
                success:'#228B22',
                purple:'#6E56CF',
                lightPurple: "#EDE9FE"
                

            }
        }
    }
});
