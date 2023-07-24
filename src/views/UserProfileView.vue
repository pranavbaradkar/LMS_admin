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
        <v-card class="rounded-xl pa-3"  outlined>
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
        <v-card class="rounded-xl pa-8 pl-9" outlined style="border: 1px solid #DADADA;">
          <div style="border-left: 3px solid #F6F6F6; border-radius: 0%" class="pl-4">
          <div  class="status-container pl-6"  v-if="screeningData && screeningData.result">
            <div class="header-bagde" style="position: relative;">
                <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/screening.svg"></v-img>
                </div>
                <div class="header-container">                
                  <div v-if="screeningData.result == 'PASSED'" class="success-badge"><i class="dot me-2" />Screening Passed</div>
                  <div v-if="screeningData.result == 'FAILED'" class="failed-badge"><i class="dot me-2" />Screening Failed</div>
                  <div class="profile-title">{{ (screeningData.assessment && screeningData.assessment.name) && screeningData.assessment.name }} </div>
                </div>
                <div class="score" v-if="screeningData.total_scored || screeningData.total">
                  <label>Score</label>
                  <div class="per"><span>{{screeningData.total_scored}}/</span>{{screeningData.total}}</div>
                </div>
                <div class="score" >
                  <div v-if="screeningData.result == 'PASSED'">
                    <label>Status</label>
                    <div>{{ screening_status }}</div>
                  </div>
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

          <div class="status-container pl-6" v-if="mainsData && mainsData.result && screeningData && screeningData.result =='PASSED'">
            <div class="header-bagde" style="position: relative;">
              <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/mains.svg"></v-img>
                </div>
                <div class="header-container">
                  <div v-if="mainsData.result == 'PASSED'" class="success-badge"><i class="dot me-2" />Mains Passed</div>
                  <div v-if="mainsData.result == 'FAILED'" class="failed-badge"><i class="dot me-2" />Mains Failed</div>
                  <div class="profile-title">{{ (mainsData.assessment && mainsData.assessment.name) && mainsData.assessment.name }}</div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>{{mainsData.total_scored}}/</span>{{mainsData.total}}</div>
                </div>
                <div class="score" >
                  <div v-if="mainsData.result == 'PASSED'">
                    <label>Status</label>
                    <div>{{ mains_status }}</div>
                  </div>
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

          <div class="status-container pl-6" v-if="mainsData == null && screeningData && screeningData.result =='PASSED'">
            <div class="header-bagde" style="position: relative;">
                <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/mains.svg"></v-img>
                </div>
                <div class="header-container">
                  <div class="warning-badge"><i class="dot me-2" />Mains Not Yet Submitted</div>
                </div>
            </div>
          </div>

          <div v-if="mainsData && mainsData.result =='PASSED'">
            <div class="status-container pl-6"  
            v-for="(value, key) of demoVideos"
            :key="`${key}-ddd`"
            >
              <div class="header-bagde" style="position: relative;">
                <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/demo.svg"></v-img>
                </div>
                  <div class="header-container">
                    <div class="success-badge" v-if="value.status == 'AGREE'"><i class="dot me-2" />Demo Video Selected </div>
                    <div class="failed-badge" v-if="value.status == 'DISAGREE'"><i class="dot me-2" />Demo Video Not Selected </div>
                    <div class="warning-badge" v-if="value.status == 'PENDING'"><i class="dot me-2" />Demo Video Pending</div>
                    <div class="warning-badge" v-if="value.status == 'SUBMITTED'"><i class="dot me-2" />Demo Video Submitted </div>
                    <div class="profile-title">Demo Video</div>
                  </div>
                  
                  <div>
                    <div class="score">
                      <label>Status</label>
                      <div>{{ value.status == 'AGREE' ? 'Recommended For Interview' : (value.status == 'DISAGREE') ? 'Not Recommended For Interview' : 'Pending'}}</div>
                    </div>
                  </div>
              </div>

              <div class="row">
                <v-col col="6">
                  <video width="320" controls>
                    <source :src="value.video_link" type="video/mp4">
                  </video>
                </v-col>
                <v-col col="6">
                  <v-card
                      v-if="value"
                      height="237"
                      elevation="0"
                      style="overflow-y: scroll; margin-left: 30px"
                      class="pa-4 mt-1 vertical-steps-demo-video"
                      id="vertical-steps-demo-video"
                      depressed
                      outlined
                    >
                      <p class="topic-head mb-0">Topic</p>
                      <p class="topic-name">{{ value.demo_topic}}</p>
                      <hr class="border-hr" />
                      <p class="topic-head">Pointers to Cover</p>
                      <v-stepper v-if="value.demo_description" v-model="e6" vertical class="steper">
                        <v-stepper-step class="stepper-step" step="">
                        <strong>{{ value.demo_description[0][0] }}</strong> {{ value.demo_description[0][1] }}
                        </v-stepper-step>

                        <v-stepper-content step="1">
                        </v-stepper-content>

                        <v-stepper-step class="stepper-step" :complete="e6 > 2" step="">
                          <strong>{{ value.demo_description[1][0] }}</strong> {{ value.demo_description[1][1] }}
                        </v-stepper-step>

                        <v-stepper-content step="2">
                        </v-stepper-content>

                        <v-stepper-step class="stepper-step" :complete="e6 > 3" step="">
                          <strong>{{ value.demo_description[2][0] }}</strong> {{ value.demo_description[2][1] }}
                        </v-stepper-step>

                        <v-stepper-content step="3">
                        </v-stepper-content>

                        <v-stepper-step class="stepper-step" step="">
                          <strong>{{ value.demo_description[3][0] }}</strong> {{ value.demo_description[3][1] }}
                        </v-stepper-step>
                        <v-stepper-content step="4">
                        </v-stepper-content>

                        <v-stepper-step class="stepper-step" step="" v-if="value.demo_description && value.demo_description[4]">
                          <strong>{{ value.demo_description[4][0] }}</strong> {{ value.demo_description[4][1] }}
                        </v-stepper-step>
                        <v-stepper-content step="5">
                        </v-stepper-content>

                        <v-stepper-step class="stepper-step" step="" v-if="value.demo_description && value.demo_description[5]">
                          <strong>{{ value.demo_description[5][0] }}</strong> {{ value.demo_description[5][1] }}
                        </v-stepper-step>
                        <v-stepper-content step="6">
                        </v-stepper-content>

                      </v-stepper>
                    </v-card>
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
          </div>
          

          <div class="status-container pl-6" v-if="demoVideos.length == 0 && mainsData && mainsData.result =='PASSED'">
            <div class="header-bagde" style="position: relative;">
              <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/demo.svg"></v-img>
                </div>
                <div class="header-container">
                  <div class="warning-badge"><i class="dot me-2" />Demo Not Yet Submitted</div>
                </div>
            </div>
          </div>

          <div class="status-container pl-6" v-if="interviewFeedback">
            <div class="header-bagde" style="position: relative;">
              <div style="position: absolute; left: -64px;" class="stepper-container">
                  <v-img src="@/assets/interview.svg"></v-img>
                </div>
                <div class="header-container">
                  <div class="success-badge" v-if="interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.offer_selection == 'YES'"><i class="dot me-2" />Cleared Interview </div>
                  <div class="failed-badge" v-if="interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.offer_selection == 'NO'"><i class="dot me-2" />Interview Not Cleared</div>
                  <div class="warning-badge" v-if="interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.offer_selection == 'MAYBE'"><i class="dot me-2" />Decision Pending</div>
                  <!-- <div class="success-badge"><i class="dot me-2" />Cleared Interview</div> -->
                  <div class="profile-title">Interview Details </div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>{{interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.overall_rating ? interviewFeedback.interview_feedback.overall_rating : 0}}/</span>{{10}}</div>
                </div>
                <div>
                  <div>
                    <div class="score">
                      <label>Status</label>
                      <div>{{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.offer_selection == 'NO' ? 'Rejected' : (interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.offer_selection == 'YES') ? 'Recommended For Offer Letter' : 'Offer Letter Pending'}}</div>
                    </div>
                  </div>
                  <!-- <v-select
                    label="Status"
                    :items="['Recommended For Offer Letter']"
                    v-model="interview_status"
                    variant="underlined"
                  ></v-select> -->
                </div>
            </div>

            <div class="row skills" >
              <div class="col-6">
                <div class="skill demo-video" :class="`color-1`">
                  <div class="skill-title">{{ "Appearence Score" }}</div>
                  <div class="skill-score">{{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.appearence_score ? interviewFeedback.interview_feedback.appearence_score : 0 }}/10</div>
                </div>
              </div>
              <div class="col-6">
                <div class="skill demo-video" :class="`color-2`">
                  <div class="skill-title">{{ "Confidence Score" }}</div>
                  <div class="skill-score">{{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.confidence_score ? interviewFeedback.interview_feedback.confidence_score : 0 }}/10</div>
                </div>
              </div>
            </div>

            <div class="detail-row-data d-flex align-items-center px-4 py-4 justify-content-between mt-4">
              
              <div class="col-data">
                <div class="head">Mode</div>
                <div class="text">At School</div>
              </div>

              <div class="col-data">
                <div class="head">Date / Time</div>
                <div class="text">12/09/2023 (12:00 - 14:00)</div>
              </div>

              <!-- <div class="col-data">
                <div class="head">Time</div>
                <div class="text">At School</div>
              </div> -->

              <div class="col-data">
                <div class="head">Current CTC</div>
                <div class="text">{{ interviewFeedback.interview_feedback ? interviewFeedback.interview_feedback.ctc_current : 'N/A' }}</div>
              </div>

              <div class="col-data">
                <div class="head">Expected CTC</div>
                <div class="text">{{ interviewFeedback.interview_feedback ? interviewFeedback.interview_feedback.ctc_expected : 'N/A' }}</div>
              </div>

              <div class="col-data">
                <div class="head">Interviewer's Name</div>
                <div class="text">{{ interviewFeedback.interviewer ? `${interviewFeedback.interviewer.email} / ${interviewFeedback.interviewer.name}` : 'N/A' }}</div>
              </div>

            </div>

            <div class="title-container">
              <div class="profile-title-interview">Interview Remarks </div>
              <p>
                {{ interviewFeedback && interviewFeedback.interview_remark ? interviewFeedback.interview_remark : '-N/A-' }}
              </p>
            </div>

            <div class="title-container">
              <div class="profile-title-interview">About Candidate </div>
              <p>
                {{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.about_candidate ? interviewFeedback.interview_feedback.about_candidate : '-N/A-' }}
              </p>
            </div>

            <div class="title-container">
              <div class="profile-title-interview">Candidate Past </div>
              <p>
                {{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.candidate_past ? interviewFeedback.interview_feedback.candidate_past : '-N/A-' }}
              </p>
            </div>

            <div class="title-container">
              <div class="profile-title-interview">Interview Notes </div>
              <p>
                {{ interviewFeedback.interview_feedback && interviewFeedback.interview_feedback.interview_notes ? interviewFeedback.interview_feedback.interview_notes : '-N/A-' }}
              </p>
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
      interviewFeedback: null,
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
          this.interviewFeedback = response.data.data && response.data.data.interview ? response.data.data.interview : null; 

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
<style>
.steper {
  box-shadow: none !important;
  position: relative;
  top: 14px;
  left: -14px;
  padding-bottom: 0px;
}
.border-hr {
  margin-top: 5px;
  margin-bottom: 5px;
}
.topic-head {
  font-size: 12px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0.02em;
  text-align: left;
}
.vertical-steps-demo-video .v-stepper--vertical .v-stepper__step {
  padding: 0px 31px 0px;
}

#vertical-steps-demo-video > span.v-stepper__step__step {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-size: 0.75rem;
  justify-content: center;
  height: 10px;
  min-width: 10px;
  width: 10px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: #444!important;
}

.vertical-steps-demo-video .v-stepper--vertical .v-stepper__step {
  padding: 0px 14px 0px;
}

.vertical-steps-demo-video .v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none!important;
}

.vertical-steps-demo-video .theme--light.v-stepper .v-stepper__label {
  color: #000!important;;
}

#vertical-steps-demo-video .theme--light.v-stepper .v-stepper__label {
  font-size: 14px;
  font-weight: 300;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-align: left;
}

.v-application--is-ltr .v-stepper--vertical .v-stepper__content {
  margin: -8px -36px -6px 20px!important;
}


.theme--light .stepper-step  .v-stepper__step__step {
  background: rgb(0 0 0 / 64%) !important;
  width: 14px;
    height: 14px;
    max-width: 14px;
    min-width: 14px;
}
.detail-row-data {
  background-color: rgba(248, 250, 252, 1);
  border:1px solid rgba(218, 218, 218, 1);
  border-radius: 10px;
  justify-content: space-between;
}

.col-data {
  border-left: 1px solid #d9dada;
  padding-left: 10px;
}
.col-data:first-child {
  border: none;
  padding-left: 10px;
}
.col-data .head {
  color :rgba(0, 0, 0, 0.6);
  padding-bottom: 6px;
  font-size: 12px;
}

.col-data .text {
  color :rgba(0, 0, 0, 0.87);
  font-size: 14px;
}

.profile-title-interview { 
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: rgba(0, 0, 0, 0.84);
}

.title-container {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.title-container p {
  font-size: 14px;
  padding-top: 5px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.02em;
  text-align: left;
  color: rgba(77, 77, 77, 1);

}

</style>
  