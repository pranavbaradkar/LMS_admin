<template>
  <!-- <div class="container "> -->
  <v-container v-container fluid class="pa-8 pt-4 secondary">
    <!-- VGOS -->
    <!-- <v-row justify="space-between" class="my-8 mt-0 mb-2">
          <v-col cols="4" sm="4" md="4">
            <div class="text-h5 ml-0"></div>
          </v-col>
        </v-row> -->

    <!-- Assessment row and fiter and export btn -->

    <v-row justify="space-between" class="my-0 mt-0">
      <v-col cols="6" sm="6" md="" class="ma-0 pa-0 f-flex align-center">
        <v-col cols="12" sm="12" md="12">
          <div class="text-h5 ml-0">Interview Panel</div>
        </v-col>
      </v-col>
      <v-col cols="8" sm="8" class="d-flex justify-end">
        <div class="text-feild">
          <v-text-field label="Search" class="pt-0" prepend-inner-icon="mdi-magnify" v-model="search"
            clearable></v-text-field>
        </div>
        <div>
          <v-btn class="primary white--text mx-2" rounded-lg @click="filterDialog = true"><v-icon>mdi-tune</v-icon>Filter</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="section1">

      <v-col v-for="(item, index) in this.interviewData" :key="index" cols="4">
        <v-card class="rounded-xl card" cols="3" outlined>
          <v-row>
            <V-col cols="2">
              <v-avatar class="mt-3 ms-3">
                <img src="../assets/user.svg" alt="John">
              </v-avatar>
            </V-col>

            <v-col cols="10" class="mt-2 avtar-left">
              <span class=" ms-1  ">{{ item.user.first_name + ' ' + item.user.last_name }} / {{ item.user.email }}</span>
              <div class="">
                <v-chip v-for="level in item.levels_string.slice(0, 3)" :key="level" class="ma-1 fs" small>
                  {{ level }}
                </v-chip>
                <v-chip v-if="item.levels_string.length > 3" class="ma-1 circle-chip" small>
                  +{{ item.levels.length - 3 }}
                </v-chip>
              </div>
            </v-col>


          </v-row>
          <div class="information">
            <v-row>
              <v-col class="user-tag pb-0 ms-5 pb-0 mb-0 mt-1 ">  <img src="../assets/user-tag.svg" cols="" alt="" class="pe-2" /> <span class="color" cols="10">Assessed to  <strong>{{ item.interviewer &&  item.interviewer.name ?  item.interviewer.name : ' - N/A - '
              }}</strong></span></v-col>

            </v-row>
            <v-row>
              <v-col class="user-tag pb-0 ms-5 pb-0 mb-0 mt-1"> <img src="../assets/Vector.svg" cols="" alt="" class="pe-2" /> <span class="color" cols="10" >{{ item.subjects_string.join(', ') }}</span></v-col>

            </v-row>
            <v-row>
              <v-col class="user-tag1 pb-0 ms-5 pb-0 mb-0 mt-1 "> 

                <img src="../assets/Vector (8).svg" cols="" alt="" class="pe-2" />

                <span class="color" cols="" v-if="item.interviewer != ''">{{   new
                Date(item.interviewer.interview_slot).toLocaleDateString() }} {{ '(' }} {{ new
    Date(item.interviewer.interview_slot).toLocaleTimeString('en', { hour12: false, hour: 'numeric', minute: 'numeric' }) }} - {{
    new Date(new Date(item.interviewer.interview_slot).setHours(new Date(item.interviewer.interview_slot).getHours() +
      1)).getHours() + ':' + new Date(new Date(item.interviewer.interview_slot).setHours(new
        Date(item.interviewer.interview_slot).getHours() + 1)).getMinutes() }} {{ ')' }} </span>

                <span class="color" cols="" v-if="item.interviewer == ''"> - N/A -</span>

              </v-col>

            </v-row>
            <v-row>
              <v-col cols="" class="user-tag pb-0 ms-5 pb-0 mb-0 mt-1 ">
                <img src="../assets/Vector (9).svg" cols="" alt="" class="pe-2"><span>{{ item.exam_location }}</span>
                <!-- <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p> -->
              </v-col>

            </v-row>
            <v-row v-if="item.recommended_level">
              <v-col cols="12" class="user-tag pb-0 ms-5 pb-0 mb-0 mt-1 ">
                <img src="../assets/Vector (10).svg" cols="" alt="" class="pe-2"> <span class="recommend1 "><strong class="text-color-green">Recommended</strong> For <strong>{{
                  item.recommended_level }}</strong></span>
              </v-col>

            </v-row>
            <v-row class="mb-4">
              <v-col cols="2" class="ms-5 mt-2 ms-5 pb-0 mb-0 mt-1 ">
                <v-btn variant="tonal"
                  v-if="((user_permission.interview && user_permission.interview.panel && user_permission.interview.panel.create) || user.role_type == 'SUPER_ADMIN')"
                  @click="startInterview(item, item.user_id, item.recommended_level, item.levels_string.join(','), item.user.first_name + ' ' + item.user.last_name, 0)"

                  class=" end-btn primary white--text">  {{ item.interview_feedback != '' ? 'Response Submitted' : 'Start Interview' }} <span
                    v-if="item.status === 'PENDING'" class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols=""
                      alt=""> </span></v-btn>
              </v-col>
            </v-row>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- </div> -->
</template>
  
<script>
// @ is an alias to /src

import "../styles.css";
import InterviewController from '@/controllers/InterviewController'
import AuthService from "@/services/AuthService";


export default {
  name: "CandidatesFormview",
  data() {
    return {
      search: "",
      filterDialog: false,
      interviewData: [],
      
    }
  },
  computed: {
    user() {
      return AuthService.getLoggedUser();
    },
    user_permission() {
      return AuthService.getPermissions();
    },
  },
  methods: {
    async getInterviewDetail() {
      const response = await InterviewController.getInterviewDetails();
      if (response.data.success) {
        this.interviewData = response.data.data.map(ele => {
          console.log(ele.levels);
          ele.levels_string = ele.levels.map(e =>  { return e.name });
          ele.subjects_string = ele.subjects.map(e =>  { return e.name });
          return ele;
        });
        
      }
      else {
        alert('No data found')
      }
    },
    startInterview(item, user_id, recommended_level, levels, name, school_id) {
      if(item.interview_feedback == '') {
        this.$router.push({
          path: '/candidates/form', query: {
            user_id: user_id,
            recommended_level: recommended_level,
            levels: levels,
            name: name,
            school_id: school_id
          }
        })
      }
      
    }
  },
  created() {
    this.getInterviewDetail();
  },
};
</script>

  <style>
  .user-tag {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .user-tag span {
    width: 88%;
    display: block;
  }
  .start-interview {
    border-radius: 24px;
    background-color: #000000 !important;
    color: #fff !important;
  }
  .text-color-green {
    color: #03C988; 
  }
</style>