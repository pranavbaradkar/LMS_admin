<template>
  <v-container fluid class="pa-8 secondary">

     <div class="d-flex w-100 flex-row justify-space-between">
      <div class="ma-0 pa-0">
        <span class="cursor">Campaign</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="cursor">All Campaigns</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="cursor">VGOS</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="cursor">Assessments</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="cursor">Assessments -1(VGOS)</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span>Recommended User</span>
        <v-icon>mdi-chevron-down</v-icon>

      </div>
    </div>

    <!-- assessment user table row with filter btn and color code -->
    <v-row justify="space-between" class="my-8" v-if="showUsers">
      <v-col cols="7" sm="7" md="" class="ma-0 pa-0 f-flex align-center">
        <div class="m-tab pt-8">
          <v-tabs
            background-color="#0000000D"
            class="ml-2 d-flex space-evenly"
            height="38"
            hide-slider
            v-model="active_tab"
          >
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
              v-on:click="fetchUserAssessment('PASSED')"
            >
            <v-icon v-if="active_tab==0" color="success" size="14" class="me-2">mdi-checkbox-blank-circle</v-icon> Cleared
            </v-tab>
            <v-tab
              active-class="white ma-1 black--text"
              class="rounded d-flex justify-content-between"
              v-on:click="fetchUserAssessment('INPROGRESS')"
            >
              <v-icon v-if="active_tab==1" color="info" size="14" class="me-2">mdi-checkbox-blank-circle</v-icon>  In Progress
            </v-tab>

            <v-tab
              active-class="white ma-1 black--text"
              class="rounded"
              v-on:click="fetchUserAssessment('FAILED')"
            >
            <v-icon v-if="active_tab==2" color="warning" size="14" class="me-2">mdi-checkbox-blank-circle</v-icon>  Not Cleared
            </v-tab>
            <v-tab
              active-class="ma-1 white black--text"
              class="rounded"
              v-on:click="fetchUserAssessment('STARTED')"
            >
            <v-icon v-if="active_tab==3" color="default" size="14" class="me-2">mdi-checkbox-blank-circle</v-icon> Yet To Attempt
            </v-tab>
          </v-tabs>
          <!-- <v-breadcrumbs :items="breadCrumps">
            <template v-slot:prepend>
              <v-icon size="small" icon="mdi-vuetify"></v-icon>
            </template>
            <template v-slot:title="{ breadCrump }">
              {{ breadCrump.title }}
            </template>
          </v-breadcrumbs> -->
        </div>
      </v-col>
      <!-- filter btn and color code -->
      <v-col
        cols="5"
        sm="5"
        md="5"
        class="d-flex flex-column justify-end align-end ma-0 pa-0"
      >
      <div class="d-flex flex-column">
        <div class="text-subtitle-2 pb-2">Recommendation :</div>
        <v-btn-toggle
          v-model="toggle"
          divided
          color="primary"
          variant="outlined"
          class="button-group-filter"
          rounded
        >
          <v-btn>
            <v-icon v-if="toggle == 0" small class="pa-2">
              mdi-check
            </v-icon>
            <span class="hidden-sm-and-down">Appraisal</span>
          </v-btn>
          <v-btn>
            <v-icon v-if="toggle == 1" small class="pa-2">
              mdi-check
            </v-icon>
            <span class="hidden-sm-and-down">PIP</span>
          </v-btn>
          <v-btn>
            <v-icon v-if="toggle == 2" small class="pa-2">
              mdi-check
            </v-icon>
            <span class="hidden-sm-and-down">Top 10</span>
          </v-btn>
          <v-btn>
            <v-icon v-if="toggle == 3" small class="pa-2">
              mdi-check
            </v-icon>
            <span class="hidden-sm-and-down">Bottom 10</span>
          </v-btn>
        </v-btn-toggle>
      </div>
      </v-col>
    </v-row>

    <!-- Assessment row and fiter and export btn -->

    

    <v-data-table
      v-if="showUsers"
      :headers="screeningHeaders"
      :items="assessmentUsers"
    >
      <template v-slot:[`item.actions`]="{}">
        <img width="30px" class="pt-2 cursor" src="../assets/todo.svg" />
      </template>
      
      <template v-slot:[`item.status`]="{ item }">
        <span :class="item.status == 'INPROGRESS' ? 'bg-info' : (item.status == 'PASSED' ? 'bg-success' : (item.status == 'FAILED' ? 'bg-warning' :  'bg-default' ) )">
          
          <v-icon :color="item.status == 'INPROGRESS' ? 'info' : (item.status == 'PASSED' ? 'success' : (item.status == 'FAILED' ? 'warning' :  'default' ) )" size="14" class="me-0">mdi-checkbox-blank-circle</v-icon> {{  item.status == 'INPROGRESS' ? 'In Progress' : (item.status == 'PASSED' ? 'Cleared' : (item.status == 'FAILED' ? 'Not Cleared' :  'Not Yet Attempt' ) )  }}
        </span>
      </template>
      
      <template v-slot:[`item.user.email`]="{ item }">
        {{ item.user && item.user.email ? item.user.email : 'N/A' }}
      </template>

      <template v-slot:[`item.cluster`]="{ item }">
        {{ item.cluster ? item.cluster : 'N/A' }}
      </template>
      
      <template v-slot:[`item.brand`]="{ item }">
        {{ item.brand ? item.brand : 'N/A' }}
      </template>
      
      <template v-slot:[`item.user.first_name`]="{ item }">
        <div class="d-flex align-center" >
          <img class="me-1" :src="item.user.profile_pic" width="25" />
          {{ item.user && item.user.first_name ? item.user.first_name : 'N/A' }}
        </div>
      </template>
    </v-data-table>
    
  </v-container>
</template>
<script>
import "../styles.css";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import AssessmentController from "@/controllers/AssessmentController";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  name: "AssessmentView",
  data() {
    return {
      breadCrumps: [
        {
          title: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          title: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          title: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
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
      headers: [
        { text: "Assessment Name", value: "name" },
        { text: "Created At", value: "created_at" },
        { text: "Instructions", value: "instructions" },
        { text: "Score Type", value: "score_type" },
        { text: "Actions", value: "actions" },
      ],
      breadMenu: ["menu1", "menu2", "menu3"],
      breadData: "menu1",
      screeningHeaders: [
        { text: "Name", value: "user.first_name" },
        { text: "Email ID", value: "user.email" },
        { text: "Cluser", value: "cluster" },
        { text: "Brand", value: "brand" },
        { text: "Stage", value: "stage" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      active_tab: 0,
      toggle: 0
    };
  },
  methods: {
    screeningBtnValue(){
      return this.screenPanel.length === 0 ? "EXPAND" : "COLLAPSE";
    },
    expandAndCollMethod(){
      return this.screenPanel.length === 0 ? this.screenPanel = [...Array(this.screeningItem).keys()].map((k, i) => i):this.screenPanel = [];
    },
    mainBtnValue(){
      return this.mainPanel.length === 0 ? "EXPAND" : "COLLAPSE";
    },
    mainExpandAndCollMethod(){
      return this.mainPanel.length === 0 ? this.mainPanel = [...Array(this.mainItem).keys()].map((k, i) => i):this.mainPanel = [];
    },
    publishMethod(id,type){
      this.publishData.id = id; 
      this.publishData.assessmentType = type;
      this.publishDialog = true;
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      //const remainingSeconds = seconds % 60;
      if (hours == 0) {
        return String(minutes).padStart(2, "0") + " mins";
      } else {
        return (
          String(hours).padStart(2, "0") +
          " h and " +
          String(minutes).padStart(2, "0") +
          " mins"
        );
      }
    },
    async publishResults(assessmentId,type) {
      
      const response=await AssessmentController.publishResults(assessmentId,type);
     

      if(response.data.success){
        this.successMessage='Results Published Successfully';
        this.successDialog=true;
      }
      else{
        this.errorDialog=true;

      }
      this.publishDialog = false;

    },
    filterData() {
      this.notCleared = this.assessmentUsers.filter(
        (item) => item.screening_status == "FAILED"
      );
      console.log("not cleared", this.notCleared);
      this.inProgress = this.assessmentUsers.filter(
        (item) => item.screening_status == "STARTED"
      );
      console.log("inprogress", this.inProgress);
      this.yetToAttempt = this.assessmentUsers.filter(
        (item) => item.screening_status == "PENDING"
      );

      console.log("yet to attemp", this.yetToAttempt);
      this.cleared = this.assessmentUsers.filter(
        (item) => item.screening_status == "FINISHED"
      );
      console.log("cleared", this.cleared);
    },
    async fetchUserAssessment(status) {
      const response = await AssessmentController.getUserAssessments(338, status);
      // console.log("response from ", response);   
      if(response.data.success){
        this.assessmentUsers = response.data.data;
        this.assessmentUsers = this.assessmentUsers.map(ele => {
          ele.status = ele.screening_status ? ele.screening_status : ele.mains_status;
          ele.cluster = ele.cluster ? ele.cluster : 'N/A';
          ele.brand = ele.brand ? ele.brand : 'N/A';
          ele.stage = ele.screening_status ? 'Screening' : 'Mains';
          return ele;
        })
        this.assessmentUsers.reverse();
      }
      else{
        alert(response.data.error)
      }
       console.log(response.data.data);
    }
  },

  created() {
    this.fetchUserAssessment('PASSED');
    if (this.$route.params.cdialog == true) {
      this.dialog = true;
    }

    // this.getScreeningQuestions();
  },
};
</script>
  