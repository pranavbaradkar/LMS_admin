<template>
  <v-container fluid class="pa-8 pt-4 secondary">
    <v-row>
      <v-col class="d-flex align-center">
        <div class="mt-2" v-if="showUsers">
          <span class="m-4 cursor" @click="showUsers = false">Assessments</span>
          <v-icon>mdi-chevron-right</v-icon>
          <span class="text--secondary">Assessment Name</span>
          <v-icon>mdi-chevron-right</v-icon>
          <select
            @change="
              () => {
                screeningMainsUser == 'false'
                  ? fetchMainsUsers(selectedId)
                  : fetchScreeningUsers(selectedId);
              }
            "
            v-model="screeningMainsUser"
          >
            <option value="true" selected>
              Dhrumil’s Profile page
            </option>
            <option value="false"> Dhrumil’s Profile pages</option>
          </select>
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
            <img
              height="80px"
              width="80px"
              :src="`https://knoggles-lms-assets.s3.amazonaws.com/masters/b2c/123-456-7/images/CISE_48px.svg`"
            />
            <div class="profile-details mt-3">
              <div class="name">{{ userData.first_name && userData.first_name }} {{ userData.last_name && userData.last_name }}</div>
              <div class="email">{{ userData.email && userData.email }}</div>
              <div class="phone">{{ userData.phone_no && userData.phone_no }}</div>
            </div>
          </div>

          <div>
            <div class="profilesub-heading">School</div>
            <div class="profileDetails mt-2">
              Vibgyor High (Malad East)
            </div>
          </div>

          <hr class="mt-2 mb-2" />

          <div >
            <div class="profilesub-heading">Subject</div>
            <div class="profileDetails mt-2">
              <v-chip>{{ 'Secondary' }}</v-chip><v-chip class="ms-2 mb-2">{{ 'test' }}</v-chip><v-chip  class="ms-2 mb-2">{{ 'sdsd' }}</v-chip>
            </div>
          </div>
          <hr class="mt-2 mb-2" />
          <div class="mt-4">
            <div class="profilesub-heading">Level</div>
            <div class="profileDetails mt-2">
              <v-chip>{{ 'Secondary' }}</v-chip><v-chip  class="ms-2 mb-2">{{ 'Secondary' }}</v-chip><v-chip  class="ms-2 mb-2">{{ 'Secondary' }}</v-chip><v-chip  class="ms-2 mb-2">{{ 'Secondary' }}</v-chip>
            </div>
          </div>
          
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="rounded pa-8" outlined>
          <div class="status-container">
            <div class="header-bagde">
                <div class="header-container">
                  <div class="success-badge"><i class="dot me-2" />Screening Passed</div>
                  <div class="profile-title">Primary Teacher Assessment (VGOS) </div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>48/</span>60</div>
                </div>
                <div>
                  <v-select
                    label="Status"
                    :items="['Advanced To Mains Test']"
                    v-model="screening_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            <div class="row skills">
              <div class="col-6 ">
                <div class="skill color-1">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
                
              </div>
              <div class="col-6">
                <div class="skill color-2">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
            </div>

          </div>

          <div class="status-container">
            <div class="header-bagde">
                <div class="header-container">
                  <div class="success-badge"><i class="dot me-2" />Mains Passed</div>
                  <div class="profile-title">Primary Teacher Assessment (VGOS) </div>
                </div>
                <div class="score">
                  <label>Score</label>
                  <div class="per"><span>108/</span>120</div>
                </div>
                <div>
                  <v-select
                    label="Status"
                    :items="['Selected For Demo Video']"
                    v-model="mains_status"
                    variant="underlined"
                  ></v-select>
                </div>
            </div>

            <div class="row skills">
              <div class="col-4">
                <div class="skill color-1">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-4">
                <div class="skill color-2">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-4">
                <div class="skill color-3">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-6">
                <div class="skill color-4">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-6">
                <div class="skill color-5">
                  <div class="skill-title">Core Skill - Social Science</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              
            </div>

          </div>

          <div class="status-container">
            <div class="header-bagde">
                <div class="header-container">
                  <div class="success-badge"><i class="dot me-2" />Demo Video Selected </div>
                  <div class="profile-title">Demo Video </div>
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
                  <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4">
                </video>
              </v-col>
              <v-col col="6">

              </v-col>
            </div>

            <div class="row skills">
              <div class="col-3">
                <div class="skill demo-video color-1">
                  <div class="skill-title">Knowledge Score</div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-3">
                <div class="skill demo-video color-2">
                  <div class="skill-title">Confidences Score </div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-3">
                <div class="skill demo-video color-3">
                  <div class="skill-title">Behavioral Score </div>
                  <div class="skill-score">6/10</div>
                </div>
              </div>
              <div class="col-3">
                <div class="skill demo-video color-4">
                  <div class="skill-title">Fluency Score</div>
                  <div class="skill-score">6/10</div>
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
      screening_status:  "Advanced To Mains Test",
      mains_status: "Selected For Demo Video",
      demo_status: "Recommended For Interview",
      interview_status: "Recommended For Offer Letter",
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
        { text: "Apply For Level", value: "level" },
        { text: "Screening Score", value: "screening_score" },
        { text: "Main Score", value: "main_score" },
        { text: "Demo Score", value: "demo_score"},
        { text: "Interview Score", value: "interview_score" },
        { text: "AI recommendation", value: "ai_recommendation" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      assessments: [],
      skillsList: [],
      levels: [],
      skillQuestionsIds: [],
      mainsQuestionsIds: [],
      editedSkill: null,
      userData: {},
      screeningData: {},
      mainsData: {}
    };
  },
  methods: {
    async userDetails() {
        const response = await UsersController.getUserDetails(3675);
       
        if(response && response.data && response.data.data) {
          this.userData = response.data.data;
          this.screeningData = response.data.data && response.data.data.user_assessments ? response.data.data.user_assessments.find(ele => ele.type == 'SCREENING') : {}; 
          this.mainsData = response.data.data && response.data.data.user_assessments ? response.data.data.user_assessments.find(ele => ele.type == '"MAINS"') : {}; 
        }
        console.log(this.userData);

    },
  },

  created() {
    this.userDetails();
  },
};
</script>
  