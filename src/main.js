import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from 'axios';
import CKEditor from 'ckeditor4-vue';
import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

Vue.use(VueDatePicker, {
  lang: 'fr'
});

Vue.use(CKEditor);
Vue.config.productionTip = false
axios.defaults.withCredentials = false
// axios.defaults.baseURL = 'https://lmsbackend.knoggles.ai/api/v1/';
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
