<template>
  <v-container fluid class="pa-8 pt-4 secondary">
    <!-- assessment user table row with filter btn and color code -->
    <v-row justify="space-between" class="my-8 mt-0 mb-2" v-if="showUsers">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5 ml-0">Recommendation Panel</div>
      </v-col>
    </v-row>

    <!-- Assessment row and fiter and export btn -->

    <v-row justify="space-between" class="my-0" v-if="showUsers">
      <v-col cols="6" sm="6" md="" class="ma-0 pa-0 f-flex align-center">
        <div class="m-tab">
          <v-tabs
            background-color="#0000000D"
            class="ml-2 d-flex space-evenly"
            height="38"
            hide-slider
          >
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
              v-on:click="onClickRecommendation('TEACHER')"
            >
              TEACHER
            </v-tab>
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
              v-on:click="onClickRecommendation('JOB_SEEKER')"
            >
              JOB SEEKER
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <v-col cols="8" sm="8" class="d-flex justify-end">
        <div>
          <v-text-field
            label="Search"
            class="pt-0"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            clearable
          ></v-text-field>
        </div>
      </v-col>
    </v-row>

    <!--diolog for delete academic and professional array-->
    <v-dialog v-model="statusRecomm" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="#db44371f" size="90"
              ><v-icon size="65" color="#32CD32"
                >mdi-check-circle-outline</v-icon
              ></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">
              You are "{{ isAgreeText.toLocaleLowerCase() }}" with ai recommendation?
            </p>
           
            <div class="d-flex justify-space-between" fluid>
              <v-btn
                class="black--text"
                color="#0000001a"
                large
                width="157px"
                rounded
                @click="statusRecomm = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="primary"
                large
                width="157px"
                rounded
                @click="recommendedUpdate(isAgreeText)"
                >YES</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogInterview" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="#db44371f" size="90"
              ><v-icon size="65" color="#32CD32"
                >mdi-check-circle-outline</v-icon
              ></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">
              You are procedding "{{ user_name }}" candidate for interview
            </p>
           
            <div class="d-flex justify-space-between" fluid>
              <v-btn
                class="black--text"
                color="#0000001a"
                large
                width="157px"
                rounded
                @click="dialogInterview = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="primary"
                large
                width="157px"
                rounded
                @click="sendForInterview()"
                >YES</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    
    <v-data-table
      :headers="column"
      :items="recommendations"
    >
      <template v-slot:[`item.actions`]="{item}">
        <div style="width: 140px" class="d-flex">
          <a :href="`/#/users/profile/${item.id}`">
            <img 
              width="30px"
              class="pt-2 cursor"
              src="../assets/user.svg"
              />
          </a>
          <div v-if="item.is_show_icon" @click="() => {
              user_id = item.id;
              isAgreeText = 'AGREE';
              statusRecomm = true;
            }" class="ml-2">
            <img 
              width="30px"
              class="pt-2 cursor"
              src="../assets/thumbs-up.svg"
              />
          </div>
          <div v-if="item.is_show_icon" @click="() => {
              user_id = item.id;
              statusRecomm = true;
              isAgreeText = 'DISAGREE';
            }"  class="ml-2">
            <img 
              width="30px"
              class="pt-2 cursor"
              src="../assets/thumbs-down.svg"
              />
          </div>
          <div class="ml-2">
            <img
             v-if="!item.is_interview_icon" 
              width="30px"
              class="pt-2 cursor"
              src="../assets/iv-grey.svg"
              />

              <img
              v-if="item.is_interview_icon" 
                width="30px"
                class="pt-2 cursor"
                src="../assets/iv-black.svg"

                @click="() => {
                  user_id = item.id;
                  user_name = item.name;
                  dialogInterview = true;
                  recommendations_id = item.r_id
                }" 
              />


          </div>
        </div>
      </template>
      <template v-slot:[`item.name`]="{item}">
        <div>{{ item.name }}</div>
        <div>{{ item.email }}</div>
      </template>
      <template v-slot:[`item.levels`]="{item}">
        <span
          ><v-chip class="mb-1" v-for="(data, index) in item.levels"
          :key="`chip-${index}`">{{ data }}</v-chip></span
        >
      </template>
      <template v-slot:[`item.ai_recommendation`]="{item}">
        <div v-if="item.ai_recommendation" class="success-reco">
          <div>Recommended</div>
          <div class="normaltext">For <strong>{{ item.ai_recommendation }}</strong></div>
        </div>
        <span v-else class="danger">Not Recommended</span>
      </template>

      
      <template v-slot:[`item.demo_score`]="{item}">
        <div style="width: 90px;" class="d-flex justify-content-center">
          {{ item.demo_score ? item.demo_score : ' - '  }}
        </div>
      </template>

      <template v-slot:[`item.status`]="{item}">
        <div style="width: 120px;" class="d-flex justify-content-center">
          <div class="white-with-text" :class="`${item.status.toLocaleLowerCase() == 'interview' ? 'interview' : (item.status.toLocaleLowerCase() == 'selected' ? 'can-selected' : '')}`">{{ item.status ? item.status : 'PENDING'  }}</div>
          <!-- <div class="white-with-text interview">{{ item.status && item.status.text ? item.status.text: 'NO'  }}</div>
          <div class="white-with-text can-selected">{{ item.status && item.status.text ? item.status.text: 'NO'  }}</div> -->
        </div>
      </template>
      
    </v-data-table>

  </v-container>
</template>
<script>
import "../styles.css";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
// import AssessmentController from "@/controllers/AssessmentController";
// import SkillsController from "@/controllers/SkillsController";
// import LevelController from "@/controllers/LevelController";
import RecommendationController from '@/controllers/RecommendationController'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  name: "RecommendationView",
  data() {
    return {
      isAgreeText: 'agree',
      user_id: 0,
      recommendations_id: 0,
      user_name: null,
      dialogInterview: false,
      user_type: 'TEACHER',
      statusRecomm: false,
      rules: {
        required: (value) => !!value || "Field is required",
      },
      successMessage:'New Assessment Created',
      selectedSkillSubjects: [],
      selectedSkillSubjectsMains: [],
      MainsDialog: false,
      selectedSubjects: [
        {
          subject_id: 0,
          no_of_questions: 0,
        },
      ],
      selectedSubjectsMains: [
        {
          subject_id: 0,
          no_of_questions: 0,
        },
      ],
      screenPanel:[],
      e1: 1,
      showUsers: true,
      cleared: [],
      inProgress: [],
      notCleared: [],
      yetToAttempt: [],
      search: null, 
      name: "",
      scrBtnShow:false,
      screeningItem:0,
      mainItem:0,
      assessmentUsers: [],
      screeningMainsUser: "true",
      instructions: "",
      filterDialog: false,
      mainPanel:[],
      mainBtnShow:false,
      assessment_type: 'SCREENING',
      screeningConfiguration: {
        difficultyLevel: null,
        totalNumberQuestions: null,
        assessmentId: null,
        teachingLevel: null,
        searchSubjects: null,
        correctAnswerScore: 1,
        assessmentDuration: 0,
        negativeMarking: "NO",
        randomizeQuestions: "NO",
        shuffleOptions: "NO",
        displayCorrectAnswer: "NO",
        displayResult: "NO",
        selectedId: null,
        passingCriteria: 40,
        timeUpFirstReminder: null,
        timeUpLastReminder: null,
        assessmentType: "SCREENING",
        skillsFields: [{ skill_id: null, no_of_questions: 10 }],
        
      },
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
      publishData: {
          id: null,
          assessmentType: null,
        },
      skill_questions: [],
      skillQuestions: [],
      mainsQuestions: [],
      statusItems:[{key: 'PENDING', text: 'Pending'},
          {key: 'DISAGREE', text: 'Disagreed With AI'},
          {key: 'AGREE', text: 'Agreed With AI'}],
      mainsConfiguration: {
        difficultyLevel: null,
        totalNumberQuestions: null,
        teachingLevel: null,
        correctAnswerScore: 1,
        assessmentDuration: null,
        negativeMarking: "NO",
        randomizeQuestions: "NO",
        shuffleOptions: "NO",
        displayCorrectAnswer: "NO",
        displayResult: "NO",
        passingCriteria: 40,
        timeUpFirstReminder: null,
        timeUpLastReminder: null,
        assessmentType: "MAINS",
        skillsFields: [{ skill_id: null, no_of_questions: 10 }],
      },
      screeningUsers: [],
      errorMessage: "Failed",
      dialog: false,
      subjectDialog: false,
      singleSelect: true,
      selected: [],
      successDialog: false,
      errorDialog: false,
      deleteDialog: false,
      publishDialog: false,
      subjectData: [],
      selectedSkillsFilter: [],
      headers: [
        { text: "Assessment Name", value: "name" },
        { text: "Created At", value: "created_at" },
        { text: "Instructions", value: "instructions" },
        { text: "Score Type", value: "score_type" },
        { text: "Actions", value: "actions" },
      ],
      breadMenu: ["menu1", "menu2", "menu3"],
      breadData: "menu1",
      column: [
        { text: "Name", value: "name" },
        { text: "Applied For Level", value: "levels" },
        { text: "Screening Score", value: "screening_score" },
        { text: "Main Score", value: "main_score" },
        { text: "Demo Score", value: "demo_score"},
        { text: "Interview Score", value: "interview_score" },
        { text: "AI recommendation", value: "ai_recommendation" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      assessments: [],
      recommendations: [],
      skillsList: [],
      levels: [],
      skillQuestionsIds: [],
      mainsQuestionsIds: [],
      editedSkill: null,
    };
  },
  methods: {
    truncate (string) {
      if(string) {
        if (string && string.length < 17) return string;
        const first_part = string.slice(0,4);
        const last_part = string.slice(-10);
        return first_part + '...' + last_part;
      } else {
        return string;
      }
      
    },
    async fetchRecommendations(type) {
      this.user_type = type;
      const response = await RecommendationController.getRecommendations(type);
      this.recommendations = response.data.data.rows;
      this.recommendations = this.recommendations.map(e => {
        console.log(e);
          let dat = {
            id: e.user_id,
            name: e.user.first_name,
            email: e.user.email ? e.user.email : ' - ',
            levels: e.levels,
            screening_score: e.screening_score ? `${e.screening_score} / ${e.screening_score_total}` : ' - ',
            main_score: e.mains_score ? `${e.mains_score} / ${e.mains_score_total}` : ' - ',
            demo_score: e.demo_score ? `${e.demo_score} / ${e.demo_score_total}` : ' - ',
            interview_score:  e.interview_score ? `${e.interview_score} / ${e.interview_score_total}` : ' - ',
            status:  e.status ? e.status.split('_').join(' ') : 'PENDING',
            ai_recommendation: e.ai_recommendation,
            is_show_icon: e.demo_score > 0 && (e.status == 'DEMO_SUBMITTED' || e.status == 'INTERVIEW') ? true : false,
            is_interview_icon: (e.status == "DEMO_SUBMITTED" && e.recommendation_status == 'AGREE') || (e.demo_score > 0 && e.status == "DEMO_SUBMITTED" && e.recommendation_status == 'DISAGREE') ? true : false,
            r_id: e.id
          }
          let obj = {...dat};
          console.log(obj);
          return obj;
        })
      this.recommendations.reverse();
      console.log(this.recommendations);
    },
   
    onClickRecommendation(type) {
      this.fetchRecommendations(type);
    },
    async recommendedUpdate(status) {
      const response = await RecommendationController.setAIRecommendations({
        recommendation_status: status
      }, this.user_id );
      this.statusRecomm = false;
      console.log(response);
      this.fetchRecommendations(this.user_type);
    },
    async sendForInterview() {
      let findOj = this.recommendations.find(ele => ele.r_id == this.recommendations_id);
      let payload = {
        "recommended_level": findOj.levels[0],
      }
      const response = await RecommendationController.setToInterview(payload, this.user_id);
      console.log(response);
      window.location.href = "/#/interview/panel";
    }
  },

  created() {
    // this.getAssessmentDuration();
    // //this.getSubjects();
    // this.getSkills();
    // this.getLevels();
    this.fetchRecommendations('TEACHER');
    if (this.$route.params.cdialog == true) {
      this.dialog = true;
    }

    // this.getScreeningQuestions();
  },
};
</script>
<style>
.white-with-text {
  font-size: 11px;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #2D2D2D;
  background-color: #F6F6F6;
  width: auto;
  height: auto;
  padding: 8px 8px 8px 8px;
  border-radius: 68px;
  justify: space-between;

}

.interview {
  background-color:  #CBD5E1;
  color: #475569;
}

.can-selected {
  background-color: #03C988;
  color: #fff;
 
}
</style>