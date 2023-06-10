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
              v-on:click="assessmentUsers = inProgress"
            >
              Demo Video
            </v-tab>
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
              v-on:click="assessmentUsers = cleared"
            >
              Interview
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
        <div>
          <v-btn class="primary mx-2" rounded @click="filterDialog = true"
            ><v-icon>mdi-tune</v-icon>Filter</v-btn
          >
        </div>
      </v-col>
    </v-row>

    
    <v-data-table
      v-if="showUsers"
      :headers="column"
      :items="assessments"
    >
      <template v-slot:[`item.name`]="{}">
        <div class="d-flex align-center" style="height: 40px;">
          <img
            height="30px"
            width="30px"
            :src="`https://knoggles-lms-assets.s3.amazonaws.com/masters/b2c/123-456-7/images/CISE_48px.svg`"
          />
          <span class="ml-2">Dhrumil</span>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{}">
        <img width="30px" class="pt-2 cursor" src="../assets/todo.svg" />
      </template>
      <template v-slot:[`item.level`]="{}">
        <span
          ><v-chip>{{ 'Secondary' }}</v-chip></span
        >
        <span
          ><v-chip>+{{ 2 }}</v-chip></span
        >
      </template>
      <template v-slot:[`item.ai_recommendation`]="{item}">
        <span v-if="item.ai_recommendation != 'Recommended'" :class="`${item.ai_recommendation == 'Recommended' ? 'success-reco' : 'danger'}`">{{ item.ai_recommendation }}</span>
        <div v-if="item.ai_recommendation == 'Recommended'" :class="`${item.ai_recommendation == 'Recommended' ? 'success-reco' : 'danger'}`">
          <div>{{ item.ai_recommendation }}</div>
          <div class="normaltext">For <strong>Grade 3</strong></div>
        </div>
      </template>

      <template v-slot:[`item.status`]="{item}">
        <div style="width: 200px"><v-select
          label="Gender *"
          single-line
          v-model="item.status"
          item-value="Pending"
          :items="['Pending', 'Disagreed With AI','Agreed With AI']"
          variant="solo"
        ></v-select></div>
      </template>
      
    </v-data-table>

    <!-- <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">New Grade Created</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="successDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog> -->
  
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">{{ successMessage }}</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="successDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="error" size="96">mdi-close-circle-outline</v-icon>
            <p class="text-h5 py-4">{{ errorMessage }}</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="errorDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- ASSESSMENT PUBLISH CONFORMATION POP UP -->
    <v-dialog v-model="publishDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-notebook-check-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">Publish Results</p>
            <p
              class="text-disabled grey--text text-subtitle-1 mb-4"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
            This action will publish the assessment results. This cannot be undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn
                depressed
                class="secondary black--text"
                large
                width="157px"
                rounded
                @click="publishDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="black white--text"
                depressed
                large
                width="157px"
                rounded
                @click="publishResults(publishData.id,publishData.assessmentType)"
                >Publish</v-btn
              >
             </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>


    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">Delete Assessment</p>
            <p
              class="text-disabled grey--text text-subtitle-1"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn
                depressed
                class="secondary black--text"
                large
                width="157px"
                rounded
                @click="deleteDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="black white--text"
                depressed
                large
                width="157px"
                rounded
                @click="deleteAssessment(selectedId)"
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  
    <v-dialog v-model="filterDialog" max-width="400px">
      <v-card width="400px" height="100%">
        <v-card-text class="pa-6">
          <v-row>
            <v-col>
              <div class="pl-1 text-body1 font-weight-bold">FILTER</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <div
                @click="clearFilter"
                class="text-body1 font-weight-bold black--text cursor"
              >
                CLEAR FILTER
              </div>
            </v-col>
          </v-row>
          <div>
            <v-card
              height="450px"
              elevation="0"
              id="myScroll"
              class="pt-5 ,pb-5"
            >
              <v-row class="pl-1">
                <v-col>
                  <div class="text-body1 font-weight-normal black--text">
                    Skills
                  </div>
                </v-col>
              </v-row>
              <v-chip-group
                v-model="selectedSkillsFilter"
                active-class="primary"
                column
                :multiple="true"
              >
                <v-chip
                  v-for="(skillType, index) in skillsList"
                  :key="index"
                  :value="skillType"
                  elevated
                >
                  {{ skillType.name }}
                </v-chip>
              </v-chip-group>
            </v-card>
            <div>
              <v-card-actions class="px-6 pb-6">
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  outlined
                  class="pa-4"
                  @click="filterDialog = false"
                  >Cancel</v-btn
                >
                <v-btn rounded class="primary pa-4">Apply</v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import "../styles.css";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import AssessmentController from "@/controllers/AssessmentController";
import SkillsController from "@/controllers/SkillsController";
import LevelController from "@/controllers/LevelController";

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

    async nextStep(step) {
      if (this.e1 == 4) {
        if (this.Assessmentsupdate()) {
          this.successDialog = true;
        } else {
          alert("Failed");
        }
      } else {
        //console.log("current step is = ", step);
        switch (step) {
          case 1:
            if (this.$refs.step1.validate()) {
              //console.log("step1", this.step1);
              if (this.createAssessment()) {
                this.e1++;
              } else {
                alert("Invalid Data");
              }
            }
            break;
          case 2:
            if (this.$refs.step2.validate()) {
              console.log("step2 value", this.step2);
              // console.log("Selected Assessment type", this.assessment_type);
              if (this.createConfigurations()) {
                this.e1++;
              } else {
                alert("Invalid Data");
              }
            }
            break;
          // case 4:
          //   if (this.$refs.step4.validate()) {
          //     //console.log("step2 value", this.step2);
          //     const response =await this.createMains()
          //     if (response.data.success) {              
          //       this.e1++;
          //       this.getMainsQuestions();
          //     } else {
          //       alert(response.data.error);
          //     }
          //   }
          //   break;

          default:
            this.e1++;
        }
      }
    },
    addSubjectsToSkill() {
      //console.log(this.editedSkill);
      this.editedSkill.subject_ids = this.selectedSubjects;
      // this.selectedSubjects = [];
      this.subjectDialog = false;
      console.log(this.mainsConfiguration.skillsFields);
    },
    addSubjectsToSkillMains() {
      this.MainsDialog = false;
      console.log(this.editedSkill);      
      this.editedSkill.subject_ids = this.selectedSubjectsMains;
      // this.selectedSubjects = [];      
      console.log(this.mainsConfiguration.skillsFields);
    },
    openSubjectDialog(skill, skillsField) {
      this.selectedSkillSubjects = skill.subject_skills;
      this.subjectDialog = true;
      console.log(skill.subject_skills);
      this.editedSkill = skillsField;
      console.log("skill field",skillsField)
    },
    openSubjectDialogMains(skill, skillsField) {
      this.selectedSkillSubjectsMains = skill.subject_skills;
      this.MainsDialog = true;
      console.log(skill.subject_skills);
      this.editedSkill = skillsField;
    },
    async getScreeningQuestions() {
      const response = await AssessmentController.screeningQuestions(
        this.assessmentId
      );
      if(response.data.success){
        this.skillQuestions = response.data.data.skill_questions;
      console.log("skill questions", this.skillQuestions);
      this.storingSkillsQuestionIds();
      this.screeningItem = this.skillQuestions.length;
      this.scrBtnShow=true
      }
      else{
        alert(response.data.error)
      }

      

      //console.log("screening request", response);
    },
    addSubjectField() {
      this.selectedSubjects.push({
        subject_id: 0,
        no_of_questions: 0,
      });
    },
    addSubjectFieldMains() {
      this.selectedSubjectsMains.push({
        subject_id: 0,
        no_of_questions: 0,
      });
    },
    deleteSubjectField(index) {
      this.selectedSubjects.splice(index, 1);
    },
    deleteSubjectFieldMains(index) {
      this.selectedSubjectsMains.splice(index, 1);
    },

    async getMainsQuestions() {
      const response = await AssessmentController.mainsQuestions(
        this.assessmentId
       
      );
    
      //console.log("screening request", response);
      if(response.data.success){
        this.mainsQuestions = response.data.data.skill_questions;
      console.log("mains questions", this.mainsQuestions);
      this.storingMainsQuestionIds();
      this.mainItem=this.mainsQuestions.length
      this.mainBtnShow=true
      }
      else{
        alert(response.data.error)
      }
    },
    addScreeningSkillsField() {
      this.screeningConfiguration.skillsFields.push({
        skill_id: null,
        no_of_questions: 10,
      });
      console.log("list", this.editedSkill);
      this.getAssessmentDuration();
    },
    deleteScreeningSkillField(index) {
      this.screeningConfiguration.skillsFields.splice(index, 1);
      this.getAssessmentDuration();
    },
    addMainsSkillsField() {
      this.mainsConfiguration.skillsFields.push({
        skill_id: null,
        no_of_questions: 10,
      });
      this.getAssessmentDuration();
    },
    getAssessmentDuration() {
      this.screeningConfiguration.assessmentDuration =
        this.screeningConfiguration.skillsFields.length * 20 * 10;
      this.mainsConfiguration.assessmentDuration =
        this.mainsConfiguration.skillsFields.length * 20 * 10;
    },
    deleteMainsSkillField(index) {
      this.mainsConfiguration.skillsFields.splice(index, 1);
      this.getAssessmentDuration();
    },
    async createAssessment() {
      const response = await AssessmentController.createAssessment({
        name: this.name,
        score_type: "ASSESSMENT",
        instructions: this.instructions,
      });
      
      this.assessmentId = response.data.data.id;
      return response.data.success;
    },

    async createConfigurations() {
      let response;
      let payload = {
          skill_distributions: this.screeningConfiguration.skillsFields,
          difficulty_level: this.screeningConfiguration.difficultyLevel,
          total_no_of_questions:
            this.screeningConfiguration.totalNumberQuestions,
          level_id: this.screeningConfiguration.teachingLevel,
          correct_score_answer: this.screeningConfiguration.correctAnswerScore,
          negative_marking: this.screeningConfiguration.negativeMarking,
          duration_of_assessment:
            this.screeningConfiguration.assessmentDuration,
          randomize_questions: this.screeningConfiguration.randomizeQuestions,
          shuffle_questions: this.screeningConfiguration.shuffleOptions,
          display_correct_answer:
            this.screeningConfiguration.displayCorrectAnswer,
          display_result: this.screeningConfiguration.displayResult,
          passing_criteria: this.screeningConfiguration.passingCriteria,
          time_up_first_remainder:
            this.screeningConfiguration.timeUpFirstReminder,
          time_up_last_remainder:
            this.screeningConfiguration.timeUpLastReminder,
        };
      if(this.assessment_type == 'SCREENING') {
        response = await AssessmentController.createScreening( payload, this.assessmentId );
        this.getScreeningQuestions();
      }
      else if(this.assessment_type == 'MAINS') {
        response = await AssessmentController.createMains( payload, this.assessmentId );        
      }

      return response.data.sucess;
      //console.log(response);
    },

    async createMains() {
      const response = await AssessmentController.createMains(
        {
          skill_distributions: this.mainsConfiguration.skillsFields,
          difficulty_level: this.mainsConfiguration.difficultyLevel,
          total_no_of_questions: this.mainsConfiguration.totalNumberQuestions,
          level_id: this.mainsConfiguration.teachingLevel,
          correct_score_answer: this.mainsConfiguration.correctAnswerScore,
          negative_marking: this.mainsConfiguration.negativeMarking,
          duration_of_assessment: this.mainsConfiguration.assessmentDuration,
          randomize_questions: this.mainsConfiguration.randomizeQuestions,
          shuffle_questions: this.mainsConfiguration.shuffleOptions,
          display_correct_answer: this.mainsConfiguration.displayCorrectAnswer,
          display_result: this.mainsConfiguration.displayResult,
          passing_criteria: this.mainsConfiguration.passingCriteria,
          time_up_first_remainder: this.mainsConfiguration.timeUpFirstReminder,
          time_up_last_remainder: this.mainsConfiguration.timeUpLastReminder,
        },
        this.assessmentId
      );

      
      console.log(response);
      return response;
    },
    fetchAssessmentUsers(assessment){
      let type = assessment.assessment_configurations[0].assessment_type;
      if(type == 'SCREENING') {
        this.fetchScreeningUsers(assessment.id);
      }
      else {
        this.fetchMainsUsers(assessment.id);
      }
    },

    // async getSubjects() {
    //   const response = await SubjectController.getSubject();
    //   this.subjectData = response.data.data.rows;
    //   //console.log("surbject responser", this.subjectData);
    // },
    async getSkills() {
      const response = await SkillsController.getSkills();
      //console.log(response);
     
      if(response.data.success){
        this.skillsList = response.data.data.rows;
      }
      else{
        alert(response.data.error)
      }
    },
    async deleteAssessment(id) {
      const response = await AssessmentController.deleteAssessment(id);
      //console.log(response.data);
   
      


      if(response.data.success){
        this.deleteDialog = false;
        this.selected = [];
        this.fetchAssessment();
      }
      else{
        alert(response.data.error)
      }
    },

    async fetchAssessment() {
      const response = await AssessmentController.getAssessments();
      // console.log("response from ", response);   
      if(response.data.success){
        this.assessments = response.data.data.rows;
        this.assessments = this.assessments.map(e => {
          let data = ['Not Recommended', 'Recommended'];
          let oneOrZero = (Math.random()>=0.5)? 1 : 0;
          let dat = {
            screening_score: "48/60",
            main_score: "108/120",
            demo_score: "8/10",
            interview_score: "8/10",
            status:'Pending',
            ai_recommendation: data[oneOrZero]
          }
          let obj = {...e, ...dat};
          return obj;
        })
      this.assessments.reverse();
      }
      else{
        alert(response.data.error)
      }
       console.log(response.data.data);
    },
    async fetchMainsUsers(id) {
      console.log("mains user clicked");
      this.showUsers = true;
      this.selectedId = id;
      const response = await AssessmentController.getMainsUser(id);
      
      if(response.data.success){
              this.assessmentUsers = [];
            this.assessmentUsers = response.data.data.user_assessments;
            if (this.assessmentUsers != undefined) {
              this.filterData();
            }
            console.log("filter data", this.assessmentUsers);
      }
      else{
        alert(response.data.error)
      }
    },
    async fetchScreeningUsers(id) {
      console.log("screening clicked");
      this.showUsers = true;
      this.selectedId = id;
      const response = await AssessmentController.getScreeningUser(id);
     
      if(response.data.success){
        this.assessmentUsers = response.data.data.user_assessments;
      this.filterData();

      // console.log(this.assessmentUsers);
      }
      else{
        alert(response.data.error)
      }
    },

    async getLevels() {
      const response = await LevelController.getLevel();
   
      if(response.data.success){
        this.levels = response.data.data.rows;
      // console.log(this.assessmentUsers);
      }
      else{
        alert(response.data.error)
      }
      // console.log("level data", this.levelData.rows);
    },
    checkSubjects(id) {
      if (id == null) {
        return false;
      } else {
        //console.log(id);
        const skill = this.skillsList.find((skill) => skill.id == id);
        //console.log(skill);
        return skill.subject_skills.length == 0 ? false : true;
      }
    },
    storingSkillsQuestionIds() {
      this.skillQuestions.forEach((Questions_) => {
        Questions_.questions.forEach((question_) => {
          this.skillQuestionsIds.push(question_.id);
        });
      });
      console.log("skills questions", this.skillQuestionsIds);
    },

    storingMainsQuestionIds() {
      this.mainsQuestions.forEach((Questions_) => {
        Questions_.questions.forEach((question_) => {
          this.mainsQuestionsIds.push(question_.id);
        });
      });
      console.log("mains questions", this.mainsQuestionsIds);
    },

    async Assessmentsupdate() {
      const response = await AssessmentController.updateAssessments(
        {
          name: this.name,
          screening_question_ids: this.skillQuestionsIds,
          mains_question_ids: this.mainsQuestionsIds,
        },
        this.assessmentId
      );
      console.log(response);
      this.dialog = false;
      if(response.data.success){
        this.fetchAssessment();
         return response.data.success;
      }
      else {
        alert(response.data.error)        
        return false;
      }
      
    },
    clearFilter() {
      this.selectedSkillsFilter = [];
    },
  },

  created() {
    this.fetchAssessment();
    this.getAssessmentDuration();
    //this.getSubjects();
    this.getSkills();
    this.getLevels();
    if (this.$route.params.cdialog == true) {
      this.dialog = true;
    }

    // this.getScreeningQuestions();
  },
};
</script>
  