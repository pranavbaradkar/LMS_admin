import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from 'axios';
import CKEditor from 'ckeditor4-vue';

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
