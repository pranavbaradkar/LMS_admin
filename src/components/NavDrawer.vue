<template>
  <v-navigation-drawer app color="primary" v-model="drawer" :mini-variant.sync="mini" mini-variant-width="75"
    overlay-color="white" permanent width="220" class="ma-4" style="border-radius: 15px" height="95%">
    <div class="d-flex justify-center pt-3 bg-surface-variant topfixed" fluid>
      <img v-if="mini" src="../assets/icon.svg" width="50px" height="auto">
      <!-- <v-img v-if="mini" height="50px" width="50px" src="../assets/icon.svg"> -->
      <!-- </v-img> -->
      <img v-if="!mini" height="50px" width="186px" class="ml-4" src="../assets/fullLogo.png" />
      <v-icon @click.stop="mini = false" v-if="mini" class="drawerIcon">mdi-chevron-right-circle</v-icon>
      <v-icon @click.stop="mini = true" v-if="!mini" class="drawerIconRight">mdi-chevron-left-circle</v-icon>
    </div>
    <div id="myScroll" class="navCard">
      <v-list>
        <!-- :height="getHeight" -->
        <v-list-item color="grey lighten-2" key="Home1" to="/" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-view-grid-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="grey lighten-2" key="Home" to="/recommendations" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-star-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Recommended</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item color="grey lighten-2" key="Home" to="/interview/panel" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-clipboard-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Interview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item color="grey lighten-2" style="border-radius: 16px" active-class="grey darken-4 slider">
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px" color="grey lighten-4">mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="white--text ml-4">Users</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item to="/users" active-class="grey darken-4 slider">
            <v-list-item-content>
              <v-list-item-title class="white--text">All Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/teachers" active-class="grey darken-4 slider">
            <v-list-item-content>
              <v-list-item-title class="white--text">Teachers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/jobseekers" active-class="grey darken-4 slider">
            <v-list-item-content>
              <v-list-item-title class="white--text">Job Seekers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item color="grey lighten-2" key="Assessment" to="/assessment" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-clipboard-list-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Assessment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item color="grey lighten-2" to="/question-bank" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Question Bank</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="grey lighten-2" key="Question Bank" to="/campaign" style="border-radius: 16px"
          active-class="grey darken-4 slider" class="ma-2 px-2">
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px" color="grey lighten-4">mdi-bullhorn-variant-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Campaigns</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item color="grey lighten-2" style="border-radius: 16px" active-class="grey darken-4 slider">
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px" color="grey lighten-4">mdi-database-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="white--text ml-4">Masters</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item to="/clusters" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-wall</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">Clusters</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/brands" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-certificate</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">Brands</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/schools" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-town-hall</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">Schools</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/boards" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-file-certificate</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">Boards</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/levels" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-finance</v-icon>
            </v-list-item-icon>
            <v-list-item-content>

              <v-list-item-title class="white--text">Levels</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/grades" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-notebook-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>

              <v-list-item-title class="white--text">Grades</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/subject-category" active-class="grey darken-4 slider">

            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-book-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">Subject Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/subjects" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-notebook-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>

              <v-list-item-title class="white--text">Subject</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/skills" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-lightbulb-on-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">Skills</v-list-item-title>
            </v-list-item-content>
          </v-list-item>









          <v-list-item to="/lo-banks" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" color="grey lighten-4">mdi-graph-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>

              <v-list-item-title class="white--text">LOs Bank</v-list-item-title>
            </v-list-item-content>
          </v-list-item>






        </v-list-group>




        <v-list-item dense to="/settings" style="border-radius: 15px" active-class="grey darken-4 ma-2 ">
          <v-list-item-icon class="ma-4">
            <v-icon size="28px" color="white"> mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ma-4">
            <v-list-item-title class="white--text">
              Settings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item
              color="grey lighten-2"
              style="border-radius: 16px"
              active-class="grey darken-4 slider"
            >
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px" color="grey lighten-4"
                  >mdi-account-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="white--text ml-4"
                  >Admin</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item to="/admin-user" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl me-2" slider>
                <v-icon size="25px" color="grey lighten-4"
                  >mdi-account-multiple</v-icon>
              </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text"
                >All Users</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/all-roles" active-class="grey darken-4 slider">
            <v-list-item-icon class="rounded-xl me-2" slider>
                <v-icon size="25px" color="grey lighten-4"
                  >mdi-checkbox-multiple-marked-circle-outline</v-icon>
              </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text"
                >All Roles</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item dense to="/help" style="border-radius: 15px" active-class="grey darken-4 ma-2 slider">
          <v-list-item-icon class="ma-4">
            <v-icon size="25px" color="white">mdi-help-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ma-4">
            <v-list-item-title class="white--text"> Help </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="fixedBottom black" fluid>
          <v-list-item dense style="border-radius: 15px" active-class="grey darken-4 ma-2 slider">
            <v-list-item-icon class="ma-4 cursor" @click="logout">
              <v-icon size="28px" color="white"> mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ma-4" @click="logout">
              <v-list-item-title class="white--text">
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  name: "NavDrawer",
  data() {
    return {
      drawer: true,
      mini: true,
      windowHeight: window.innerHeight,
    };
  },
  computed: {
    user() {
      return AuthService.getUser();
    },
    getHeight() {
      return this.windowHeight - 300;
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/login");
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style>
.fixedBottom {
  position: sticky !important;
  bottom: 0 !important;
  width: 100%;
}

.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: unset;
}
</style>