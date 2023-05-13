<template>
  <v-app class="background">
    <div v-if="this.$route.name != 'login'">
      <NavDrawer />
    </div>

    <v-main class="secondary">
      
      <v-app-bar
        elevation="0"
        class="ml-8 mr-4 mt-4 white d-flex justify-end rounded-xl"
        v-if="this.$route.name != 'login'"
      >


        <v-icon class="pa-2">mdi-bell-outline</v-icon>






        <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" text icon>
                  <v-avatar>
                    <v-icon class="pa-2">mdi-account-outline</v-icon>
                  </v-avatar>
                </v-btn>
              </template>
              <v-btn @click="logout">logout</v-btn>
            </v-menu>
        
      </v-app-bar>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>
<script type="text/javascript" rel="script" src="https://cdn.ckeditor.com/4.14.0/standard/ckeditor.js"></script> 

<script>

import NavDrawer from "./components/NavDrawer.vue";
import AuthService from "./services/AuthService";
CKEDITOR.plugins.addExternal('ckeditor_wiris', 'https://www.wiris.net/demo/plugins/ckeditor/', 'plugin.js');

export default {
  name: "App",
  components: {
    NavDrawer,
  },
  data() {
    return {
      drawer: false,
      mini: false,
      isLoggedIn: false,
      role: "",
      loginInfo: {},
      index: 0,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }

  },
  methods: {
      logout() {
      AuthService.logout();
      this.$router.push("/login");
    }
    }
};
</script>
