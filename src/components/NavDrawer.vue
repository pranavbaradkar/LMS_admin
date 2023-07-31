<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    mini-variant-width="75"
    overlay-color="white"
    permanent
    width="220"
    class="ma-4"
    style="border-radius: 15px"
    height="95%"
  >
    <div class="d-flex justify-center pt-3 bg-surface-variant" fluid>
      <img v-if="mini" src="../assets/icon.svg" width="50px" height="auto" />
      <!-- <v-img v-if="mini" height="50px" width="50px" src="../assets/icon.svg"> -->
      <!-- </v-img> -->
      <img
        v-if="!mini"
        height="50px"
        width="186px"
        class="ml-4"
        src="../assets/fullLogo.png"
      />
      <v-icon @click.stop="mini = false" v-if="mini" class="drawerIcon"
        >mdi-chevron-right-circle</v-icon
      >
      <v-icon @click.stop="mini = true" v-if="!mini" class="drawerIconRight"
        >mdi-chevron-left-circle</v-icon
      >
    </div>
    <div id="myScroll" class="navCard">
      <v-list>
        <!-- :height="getHeight" -->
        <v-list-item
          color="white"
          key="Home1"
          to="/"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <!-- <v-icon size="25px">mdi-view-grid-outline</v-icon>  -->
           <img src="./../assets/Nav Icons.svg"/>
          </v-list-item-icon>
 
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            (user_permission.recommended &&
              user_permission.recommended.panel &&
              user_permission.recommended.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          color="grey lighten-2"
          key="Home"
          to="/recommendations"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <!-- <v-icon size="25px">mdi-star-outline</v-icon> -->
            <img src="./../assets/Vector (2).svg"/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Recommended</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="
            (user_permission.interview &&
              user_permission.interview.panel &&
              user_permission.interview.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          color="grey lighten-2"
          key="Home-account"
          to="/interview/panel"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <!-- <v-icon size="25px">mdi-clipboard-account</v-icon> -->
            <img src="./../assets/Nav Icons (1).svg"/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Interview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-if="
            (user_permission.users &&
              user_permission.users.panel &&
              user_permission.users.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          no-action
        >
          <template v-slot:activator>
            <v-list-item
              style="border-radius: 16px"
              active-class="primary slider"
            >
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px">mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="ml-4">Users</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item to="/users" active-class="primary white--text slider">
            <v-list-item-content>
              <v-list-item-title>All Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/teachers" active-class="primary white--text slider">
            <v-list-item-content>
              <v-list-item-title>Teachers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/jobseekers" active-class="primary white--text slider">
            <v-list-item-content>
              <v-list-item-title>Job Seekers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="
            (user_permission.assessments &&
              user_permission.assessments.panel &&
              user_permission.assessments.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          color="grey lighten-2"
          key="Assessment"
          to="/assessment"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px">mdi-clipboard-list-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Assessment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="
            (user_permission.question_bank &&
              user_permission.question_bank.panel &&
              user_permission.question_bank.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          color="grey lighten-2"
          to="/question-bank"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px">mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Question Bank</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="
            (user_permission.campaigns &&
              user_permission.campaigns.panel &&
              user_permission.campaigns.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          color="grey lighten-2"
          key="Question Bank"
          to="/campaign"
          style="border-radius: 16px"
          active-class="primary slider"
          class="ma-2 px-2"
        >
          <v-list-item-icon class="ma-4 rounded-xl" slider>
            <v-icon size="25px">mdi-bullhorn-variant-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Campaigns</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          no-action
          v-if="
            (user_permission.master &&
              user_permission.master.panel &&
              user_permission.master.panel.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
        >
          <template v-slot:activator>
            <v-list-item
              color="grey lighten-2"
              style="border-radius: 16px"
              active-class="primary white--text slider"
            >
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px">mdi-database-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="ml-4">Masters</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.clusters &&
                user_permission.master.child.clusters.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/clusters"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-wall</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Clusters</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.brands &&
                user_permission.master.child.brands.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/brands"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-certificate</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Brands</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.schools &&
                user_permission.master.child.schools.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/schools"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-town-hall</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Schools</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.boards &&
                user_permission.master.child.boards.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/boards"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-file-certificate</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Boards</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.levels &&
                user_permission.master.child.levels.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/levels"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-finance</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Levels</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.grades &&
                user_permission.master.child.grades.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/grades"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-notebook-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Grades</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.subject_category &&
                user_permission.master.child.subject_category.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/subject-category"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-book-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Subject Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.subject &&
                user_permission.master.child.subject.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/subjects"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px">mdi-notebook-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Subject</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.skills &&
                user_permission.master.child.skills.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/skills"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" 
                >mdi-lightbulb-on-outline</v-icon
              >
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >Skills</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="
              (user_permission.master &&
                user_permission.master.child.los_bank &&
                user_permission.master.child.los_bank.view) ||
              user.role_type == 'SUPER_ADMIN'
            "
            to="/lo-banks"
            active-class="primary white--text slider"
          >
            <v-list-item-icon class="rounded-xl pr-2" slider>
              <v-icon size="25px" 
                >mdi-graph-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title 
                >LOs Bank</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="
            (user_permission.master &&
              user_permission.master.child.settings &&
              user_permission.master.child.settings.view) ||
            user.role_type == 'SUPER_ADMIN'
          "
          dense
          to="/settings"
          style="border-radius: 15px"
          active-class="primary white--text -4 ma-2 "
        >
          <v-list-item-icon class="ma-4">
            <v-icon size="28px"> mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ma-4">
            <v-list-item-title> Settings </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group no-action v-if="user.role_type == 'SUPER_ADMIN'">
          <template v-slot:activator>
            <v-list-item
              color=" lighten-2"
              style="border-radius: 16px"
              active-class="primary white--text slider"
            >
              <v-list-item-icon class="rounded-xl" slider>
                <v-icon size="25px" color=" lighten-4"
                  >mdi-account-outline</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="ml-4">Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item to="/admins" active-class="primary white--text slider">
            <v-list-item-icon class="rounded-xl me-2" slider>
              <v-icon size="25px" 
                >mdi-account-multiple</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title 
                >All Users</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/roles" active-class="primary white--text slider">
            <v-list-item-icon class="rounded-xl me-2" slider>
              <v-icon size="25px" 
                >mdi-checkbox-multiple-marked-circle-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title 
                >All Roles</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          dense
          to="/help"
          style="border-radius: 15px"
          active-class="primary white--text ma-2 slider"
        >
          <v-list-item-icon class="ma-4">
            <v-icon size="25px" >mdi-help-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ma-4">
            <v-list-item-title > Help </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="fixedBottom white " fluid>
          <v-list-item
            dense
            style="border-radius: 15px"
            active-class="primary white--text ma-2 slider"
          >
            <v-list-item-icon class="ma-4 cursor" @click="logout">
              <v-icon size="28px"> mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ma-4" @click="logout">
              <v-list-item-title >
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
      return AuthService.getLoggedUser();
    },
    user_permission() {
      return AuthService.getPermissions();
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
    AuthService.getLogged();
    console.log(this.user_permission);
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
