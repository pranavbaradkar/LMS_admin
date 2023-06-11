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
              <div class="name">Dhrumil Mankodiya</div>
              <div class="email">abcd@gmail.com</div>
              <div class="phone">XXXXXX3177</div>
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
  