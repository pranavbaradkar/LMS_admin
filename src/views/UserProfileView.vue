<template>
  <v-container fluid class="pa-8 pt-4 secondary">
    <v-row>
      <v-col class="d-flex align-center">
        <div class="mt-2" v-if="showUsers">
          <span class="m-4 cursor" @click="showUsers = false">Recommended</span>
          <v-icon>mdi-chevron-right</v-icon>
          <span class="text--secondary">User Profile</span>
          <v-icon>mdi-chevron-right</v-icon>
          <span class="text--secondary">{{ userData.first_name && userData.first_name }} {{ userData.last_name && userData.last_name }}</span>
        </div>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-if="!showUsers"
          label="Search"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field
      ></v-col>
    </v-row>


    <v-row>
      <v-col cols="3" class="profile-col">
        <v-card class="rounded pa-3"  outlined>
          <div class="d-flex justify-center flex-column align-center py-8">
            <v-avatar color="indigo" size="80">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <div class="profile-details mt-3">
              <div class="name">{{ userData.first_name && userData.first_name }} {{ userData.last_name && userData.last_name }}</div>
              <div class="email">{{ userData.email && userData.email }}</div>
              <div class="phone">{{ userData.phone_no && userData.phone_no }}</div>
            </div>
          </div>

          <div>
            <div class="profilesub-heading">School</div>
            <div class="profileDetails mt-2">
             {{ userData.schoolData && userData.schoolData.join(', ') }}
            </div>
          </div>

          <hr class="mt-2 mb-2" />

          <div >
            <div class="profilesub-heading">Subject</div>
            <div class="profileDetails mt-2">
              <v-chip v-for="item,index in userData.subjectData" :key="index" class="me-1">{{ item }}</v-chip>
            </div>
          </div>
          <hr class="mt-2 mb-2" />
          <div class="mt-4">
            <div class="profilesub-heading">Level</div>
            <div class="profileDetails mt-2">
              <v-chip v-for="item,index in userData.levelData" :key="index" class="me-1 mb-1" >{{ item }}</v-chip>
            </div>
          </div>
          
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="rounded pa-8" outlined>
          <div class="status-container"  v-if="screeningData && screeningData.result">
            <div class="header-bagde">
                <div class="header-container">
                 
                  <div v-if="screeningData.result == 'PASSED'" class="success-badge"><i class="dot me-2" />Screening Passed</div>
                  <div v-if="screeningData.result == 'FAILED'" class="failed-badge"><i class="dot me-2" />Screening Failed</div>
                  <div class="profile-title">{{ (screeningData.assessment && screeningData.assessment.name) && screeningData.assessment.name }} </div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>{{screeningData.total_scored}}/</span>{{screeningData.total}}</div>
                </div>
                <div>
                  <v-select
                    v-if="screeningData.result == 'PASSED'"
                    label="Status"
                    :items="['Advanced To Mains Test']"
                    v-model="screening_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            <div class="row skills">
              <div  
                v-for="(value, key, index) of screeningData.skill_scores" 
                :key="`${key}-scr`" class="col-6">
                <div class="skill" :class="`color-${index+1}`">
                  <div class="skill-title">{{ key }} </div>
                  <div class="skill-score">{{value}}/10</div>
                </div>
              </div>
            </div>

          </div>

          <div class="status-container" v-if="mainsData && mainsData.result">
            <div class="header-bagde">
                <div class="header-container">
                  <div v-if="mainsData.result == 'PASSED'" class="success-badge"><i class="dot me-2" />Mains Passed</div>
                  <div v-if="mainsData.result == 'FAILED'" class="failed-badge"><i class="dot me-2" />Mains Failed</div>
                  <div class="profile-title">{{ (mainsData.assessment && mainsData.assessment.name) && mainsData.assessment.name }}</div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>{{mainsData.total_scored}}/</span>{{mainsData.total}}</div>
                </div>
                <div>
                  <v-select
                    v-if="mainsData.result == 'PASSED'"
                    label="Status"
                    :items="['Selected For Demo Video']"
                    v-model="mains_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            <div class="row skills">
              <div  
                v-for="(value, key, index) of mainsData.skill_scores" 
                :key="`${key}-scr`" class="col-4">
                <div class="skill" :class="`color-${index+1}`">
                  <div class="skill-title">{{ key }} </div>
                  <div class="skill-score">{{value}}/10</div>
                </div>
              </div>
              
            </div>

          </div>

          <div class="status-container"  
          v-for="(value, key) of demoVideos"
          :key="`${key}-ddd`"
          >
            <div class="header-bagde">
                <div class="header-container">
                  <div class="success-badge"><i class="dot me-2" />Demo Video Selected </div>
                  <div class="profile-title">{{ value.assessment.name }} </div>
                </div>
                
                <div>
                  <v-select
                    label="Status"
                    :items="['Recommended For Interview']"
                    v-model="demo_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            <div class="row">
              <v-col col="6">
                <video width="320" >
                  <source :src="value.video_link" type="video/mp4">
                </video>
              </v-col>
              <v-col col="6">

              </v-col>
            </div>

            <div class="row skills" >
              <div class="col-3"   
              v-for="(val, k) of value.scores"
              :key="`${k}-ddd`">
                <div class="skill demo-video" :class="`color-${k+1}`">
                  <div class="skill-title">{{ Object.keys(val)[0] ? Object.keys(val)[0].split("_").join(" ") : ' - ' }}</div>
                  <div class="skill-score">{{ val[Object.keys(val)[0]] }}/{{ val.total }}</div>
                </div>
              </div>
            </div>

          </div>

          <div class="status-container">
            <div class="header-bagde">
                <div class="header-container">
                  <div class="success-badge"><i class="dot me-2" />Cleared Interview</div>
                  <div class="profile-title">Interview Details </div>
                </div>
               
                <div>
                  <v-select
                    label="Status"
                    :items="['Recommended For Offer Letter']"
                    v-model="interview_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            

          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import "../styles.css";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import UsersController from "@/controllers/UsersController";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  name: "RecommendationView",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
      },
      showUsers:true,
      successMessage:'New Assessment Created',
      breadItems: [
        {
          text: "Dashboard",
          disabled: false,
          to: "/",
        },
        {
          text: "Dashboard",
          disabled: false,
          to: "/",
        },
        {
          text: "Assessments",

          to: "/assessment",
        },
        {
          text: "Users in Mains Assessment",
          disabled: true,
          href: "",
        },
      ],
      screeningMainsUser: "true",
      userId: null,
      screening_status:  "Advanced To Mains Test",
      mains_status: "Selected For Demo Video",
      demo_status: "Recommended For Interview",
      interview_status: "Recommended For Offer Letter",
      userData: {},
      demoVideos: [],
      screeningData: {},
      mainsData: {}
    };
  },
  methods: {
    async userDetails(user_id) {
        const response = await UsersController.getUserDetails(user_id);
       
        if(response && response.data && response.data.data) {
          this.userData = response.data.data;
          this.screeningData = response.data.data && response.data.data.assessment_results ? response.data.data.assessment_results.find(ele => ele.type == 'SCREENING') : {}; 

          this.demoVideos = response.data.data && response.data.data.demo_video ? response.data.data.demo_video : []; 

          this.mainsData = response.data.data && response.data.data.assessment_results ? response.data.data.assessment_results.find(ele => ele.type == 'MAINS') : {}; 
          if(this.screeningData && this.screeningData.skill_scores) {
            let issubjectexist = Object.keys(this.screeningData.skill_scores);
            if(issubjectexist.indexOf('Core Skill') >= 0) {
              delete this.screeningData.skill_scores['Core Skill'];

              if(this.screeningData.subject_scores) {
                let objeUpdate = {};
                Object.keys(this.screeningData.subject_scores).forEach(el => {
                  if(el != 'null') {
                    objeUpdate[`Core Skill - ${el}`] = this.screeningData.subject_scores[el];
                  }
                });
                this.screeningData.skill_scores = {...objeUpdate, ...this.screeningData.skill_scores}
              }
            }
            
          }

          if(this.mainsData && this.mainsData.skill_scores) {
            let issubjectexist = Object.keys(this.mainsData.skill_scores);
            if(issubjectexist.indexOf('Core Skill') >= 0) {
              delete this.mainsData.skill_scores['Core Skill'];

              if(this.mainsData.subject_scores) {
                let objeUpdate = {};
                Object.keys(this.mainsData.subject_scores).forEach(el => {
                  if(el != 'null') {
                    objeUpdate[`Core Skill - ${el}`] = this.mainsData.subject_scores[el];
                  }
                });
                this.mainsData.skill_scores = {...objeUpdate, ...this.mainsData.skill_scores}
              }
            }
            
          }
        }
        console.log(this.userData,this.screeningData, this.mainsData);

    },
  },

  created() {
    this.userDetails(this.$route.params.id);
  },
};
</script>
  