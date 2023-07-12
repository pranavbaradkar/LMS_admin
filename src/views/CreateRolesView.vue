<template>
    <v-container fluid class="pa-8">
    
      <div v-if="createQuestionDialog">
        <v-card class="secondary" :height="getHeight + 'px'" elevation="0">
          <v-card-title class="pt-0">
            <v-toolbar elevation="0" class="secondary">
              <v-toolbar-title class="text-h5"
                >{{ formbtn() }} Question</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-row align="center" justify="end">
                <v-btn text @click="createQuestionDialog = false">Cancel</v-btn>
                <v-progress-circular
                  v-if="isCreatingQuestion"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
  
                <v-btn
                  v-else
                  rounded
                  x-large
                  class="primary"
                  @click="!formbtnBool ? createQuestion() : updateInput(editId)"
                >
                  <v-icon>mdi-book-open-variant</v-icon>{{ formbtn() }}
                </v-btn>
              </v-row>
            </v-toolbar>
          </v-card-title>
          <v-card  class="card">
            <v-form ref="form" >
                <v-col class="">
                      <div class="text-body-1 my-2">Role Name*</div>
                      <div outlined class="rounded-xl outlined tag-compo">
                        <v-chip
                          v-for="(tag, index) in tagsList"
                          :key="index"
                          :close="true"
                          @click:close="removeTag(index)"
                          class="ma-2"
                        >
                          {{ tag }}
                        </v-chip>
                        <input
                          class="ma-4 tag-input"
                          placeholder="Enter Role Name"
                          @keydown.enter="addTag"
                          v-model="tag"
                        />
                      </div>
                     
                </v-col>
              
             
            </v-form>
          </v-card>
          <v-row>
            <v-col cols="">
                <v-card
                        class="user-card mb-3 mt-5"
                        max-width="1800"
                        max-height=""
                        outlined
                        >
                        <div class="mt-3">
                    
                            <v-row class="black">
                              <v-col cols="12" class="d-flex">
                                <v-col class="d-flex" cols="6">
                                  <span>Module Name</span>
                                </v-col>
                                <v-col class="d-flex" cols="6">
                                  <span>Actions</span>
                                </v-col>
                              </v-col>
                              
                              
                            </v-row>
                            <v-row class=" mt-1 ">
                                <v-col cols="2" class="ms-3 mt-2 user-management">
                                  <span>User Management</span>
                                </v-col>
                            </v-row>
                            <v-row class="ms-2  teacher-onboarding ">
                                <v-col cols="4">
                                  <span>Teacher Onboarding</span>
                                </v-col>
                                <v-col cols="8" class="d-flex">
                                  <v-col cols="2">
                                    <v-checkbox
                                  v-model="checkbox"
                                  label="Create"
                                ></v-checkbox>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-checkbox
                                  v-model="checkbox"
                                  label="View"
                                ></v-checkbox>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-checkbox
                                  v-model="checkbox"
                                  label="Delete"
                                ></v-checkbox>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-checkbox
                                  v-model="checkbox"
                                  label="Update"
                                ></v-checkbox>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-checkbox
                                  v-model="checkbox"
                                  label="Export"
                                ></v-checkbox>
                                  </v-col>
                              
                                </v-col>
                            </v-row>
                         
                        
                        
                        </div>
                    </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>
  
  
   
    
    </v-container>
  </template>
  
  <script>
  import UploadController from "@/controllers/UploadController";
  import QuestionsController from "../controllers/QuestionsController";
  import LoBankController from "@/controllers/LoBankController";
  import SubjectController from "@/controllers/SubjectController";
  import SkillsController from "@/controllers/SkillsController";
  import GradeController from "@/controllers/GradeController";
  import LevelController from "@/controllers/LevelController";
  import BoardController from "@/controllers/BoardController";

  import { v4 as uuidv4 } from 'uuid';
  export default {
    name: "CreateRolesView",
    data() {
      return {
        questionUuid:'',
        editorConfig: {
          extraPlugins: "ckeditor_wiris",
        },
        editorConfigForOption: {
          extraPlugins: "ckeditor_wiris",
        },
        editorConfigForAns: {
          extraPlugins: "ckeditor_wiris",
        },
        filterData: false,
        windowHeight: window.innerHeight,
        dataTableOptions: {},
        totalItems: 0,
        pageSize: 10,
        page: 1,
        count: 0,
        preSignedUrl: "",
        selectedFile: null,
        questionAssetUrl: "",
        questionAssetType: null,
        uploadingForOption: false,
        tableData: [],
        selectedLOs: [],
        selectedTags: [],
        LOData: [],
        skills: [],
        search: "",
        editId: null,
        formbtnBool: false,
        subjectData: [],
        selectedAnswersForMultitpleTypeQuestions: [],
        searchLOs: "",
        singleSelect: false,
        createQuestionDialog: true,
        deleteDialog: false,
        optionTextFieldDialog: false,
        editedOptionIndex: 0,
        editedCkeditorValue: "",
        editedCkeditorValueAns: "",
        successDialog: false,
        successMessage: "New Question Created",
        errorDialog: false,
        filterDialog: false,
        selectedTableItems: [],
        uploadingDialog: false,
        uploadingMsg: "File Uploading...",
        questionType: "",
        questionName: "",
        optionTextFieldDialogAns: false,
        answerExplanation: "",
        questionDescription: "NA",
        errorMessage: "",
        skillId: 0,
        level: 0,
        searchBool: false,
        tag: "",
        correctAnswerScore: 0,
        estimatedTime: 0,
        bloomsTaxonomy: "",
        knowledgeLevel: "",
        complexityLevel: "",
        difficultyLevel: "",
        correctAnswer: "NA",
        hint: "",
        subjectShowBool: false,
        subject: null,
        proficiencyLevel: "",
  
        isCreatingQuestion: false,
        dummyLO: [{ name: "lO1_1" }, { name: "lO1_2" }, { name: "lO1_3" }],
        rules: {
          required: (value) => !!value || "Field is required",
        },
        options: [
          {
            option_key: "A",
            option_value: "Option 1",
            option_type: "TEXT",
            is_correct: false,
            option_uuid: uuidv4()
          },
          {
            option_key: "B",
            option_value: "Option 2",
            option_type: "TEXT",
            is_correct: false,
            option_uuid: uuidv4()
          },
          {
            option_key: "C",
            option_value: "Option 3",
            option_type: "TEXT",
            is_correct: false,
            option_uuid: uuidv4()
          },
          {
            option_key: "D",
            option_value: "Option 4",
            option_type: "TEXT",
            is_correct: false,
            option_uuid: uuidv4()
          },
        ],
        headers: [
          { text: "Question", value: "statement", cellClass: "w-60" },
          { text: "Question Type", value: "question_type" },
          // { text: "Learning Objective", value: "learning_objective_id" },
          { text: "Learning Objective", value: "MyLo", cellClass: "w-action" },
          { text: "Created On", value: "created_at", cellClass: "w-action" },
          { text: "Actions", value: "actions", cellClass: "w-action" },
        ],
  
        questionTypeList: [
          "SINGLE_CHOICE",
          "MULTIPLE_CHOICE",
          "FILL_IN_THE_BLANKS",
          "TRUE_FALSE",
          "MATCH_THE_FOLLOWING",
        ],
        selectedQuestionTypeFilter: [],
        levels: [],
        gradeList: [],
        strandList: [],
        singleSelectCorrectAnswer: null,
        trueFalseCorrectAnswer: null,
        selectedLevelFilter: [],
        difficultyLevels: ["EASY", "MEDIUM", "HARD", "VERY_HARD"],
        selecteddifficultyLevelFilter: [],
        complexityLevels: ["P1", "P2", "P3", "P4", "P5"],
        selectedcomplexityLevelFilter: [],
        knowledgeLevels: ["MUST_KNOW", "SHOULD_KNOW", "NICE_TO_KNOW"],
        selectedknowlewdgeLevelFilter: [],
        bloomsTaxonomyLevel: [
          "REMEMBER",
          "UNDERSTAND",
          "APPLY",
          "ANALYZE",
          "EVALUTE",
          "CREATE",
        ],
        selectedbloomsTaxonomyLevelFilter: [],
        selectedskillsFilter: [],
        subjects: [],
        selectedsubjectsFilter: [],
  
        selectedlearningObjectives: [],
        tagsList: [],
  
        selectedtags: [],
        mtfAnswers: [
          {
            answer_key: 'A',
            answer_value: "Answer 1",
            answer_type: "TEXT",
            answer_uuid: uuidv4(),
          },
          {
            answer_key: 'B',
            answer_value: "Answer 2",
            answer_type: "TEXT",
            answer_uuid: uuidv4(),
          },
          {
            answer_key: 'C',
            answer_value: "Answer 3",
            answer_type: "TEXT",
            answer_uuid: uuidv4(),
          },
          {
            answer_key: 'D',
            answer_value: "Answer 4",
            answer_type: "TEXT",
            answer_uuid: uuidv4(),
          },
        ],
      };
    },
    watch: {
      dataTableOptions: {
        handler() {
          this.pageSize = this.dataTableOptions.itemsPerPage;
          this.page = this.dataTableOptions.page;
          if (this.filterData) {
            this.filterQuestions(
              this.selectedQuestionTypeFilter,
              this.selectedLevelFilter,
              this.selecteddifficultyLevelFilter,
              this.selectedcomplexityLevelFilter,
              this.selectedknowlewdgeLevelFilter,
              this.selectedbloomsTaxonomyLevelFilter,
              this.selectedskillsFilter,
              this.selectedsubjectsFilter
            );
          } else if (this.searchBool) {
            this.searchData(this.search);
          } else {
            this.fetchQuestions();
          }
        },
        deep: true,
      },
      search(newValue) {
        console.log(newValue);
        this.searchBool = true;
        this.pageSize = this.dataTableOptions.itemsPerPage;
        this.page = this.dataTableOptions.page;
        this.dataTableOptions.page = 1;
        this.searchData(newValue);
        if (newValue == "" || newValue == null) {
          this.fetchQuestions();
          this.searchBool = false;
        }
      },
      tag(newValue) {
        console.log(newValue.indexOf(","));
        if (newValue.indexOf(",") != -1) {
          var temp = newValue.split(",")[0];
          if (temp != "") {
            this.tagsList.push(temp);
          }
          this.tag = "";
          console.log("value inside", this.tag);
        }
        console.log("index value", newValue.indexOf(","));
        console.log("outside", this.tag);
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
    computed: {
      getHeight() {
        return this.windowHeight;
      },
    },
    methods: {
      saveEditedValue() {
        this.options[this.editedOptionIndex].option_value =
          this.editedCkeditorValue;
        this.optionTextFieldDialog = false;
      },
      saveEditedAnswer() {
        this.mtfAnswers[this.editedOptionIndex].answer_value =
          this.editedCkeditorValueAns;
        this.optionTextFieldDialogAns = false;
      },
      getAlphabet(num) {
        // ASCII value for 'A' is 65
        // The alphabet letter corresponding to num can be calculated by adding num to 65 and then getting the character using fromCharCode()
        return String.fromCharCode(65 + num);
      },
      getLastPart(url) {
        const parts = url.split('/');
        return parts.at(-1);
      },
      clearValue() {
        (this.questionName = ""), (this.questionType = "");
        (this.questionDescription = "NA"),
          (this.selectedLOs = []),
          (this.skillId = 0),
          (this.subject = null),
          (this.correctAnswerScore = 0),
          (this.estimatedTime = 0),
          (this.bloomsTaxonomy = ""),
          (this.knowledgeLevel = ""),
          (this.complexityLevel = ""),
          (this.difficultyLevel = ""),
          (this.proficiencyLevel = ""),
          (this.level = 0),
          (this.hint = ""),
          (this.answerExplanation = ""),
          (this.selectedTags = []),
          (this.formbtnBool = false);
      },
      checkSubjects(id) {
        if (id == null) {
          this.subjectShowBool = false;
        } else {
          console.log(id);
          const skill = this.skills.find((skill) => skill.id == id);
          //console.log(skill);
          if (skill.subject_skills.length == 0) {
            this.subjectShowBool = false;
            if (!this.subjectShowBool) {
              this.subject = null;
              console.log("dvhgb", this.subject);
            }
          } else {
            this.subjectShowBool = true;
          }
        }
      },
      async searchData(search) {
        const response = await QuestionsController.searchQuestion(
          this.pageSize,
          this.page,
          search
        );
        console.log(response.data);
        console.log(this.searchBool);
        this.count = response.data.data.count;
        this.tableData = response.data.data.rows;
      },
  
      addTag() {
        if (this.tag && !this.tagsList.includes(this.tag)) {
          this.tagsList.push(this.tag);
          this.tag = "";
        }
      },
      removeTag(index) {
        this.tagsList.splice(index, 1);
      },
      reload() {
        console.log("Reload");
        this.$router.go(0);
        //window.location.reload();
      },
  
      onResize() {
        this.windowHeight = window.innerHeight;
      },
      onChange(e) {
        this.selectedFile = e.target.files[0];
        this.uploadingMsg = 'File Uploading...'
        console.log("selected file",this.selectedFile)
        this.uploadingDialog = true;
        this.getPreSignedUrl();
      },
      async getPreSignedUrl() {
        const response = await UploadController.getPreSignedUrl({
          context: "question-bank",
          file_name: this.selectedFile.name,
          mime_type: this.selectedFile.type,
          file_type: this.selectedFile.type,
          business_type: "b2c",
          question_uuid: this.questionUuid,
          option_uuid: this.uploadingForOption?  this.options[this.editedOptionIndex].option_uuid:'',
        });
        this.preSignedUrl = response.data.data.signed_request;
       
        this.uploadToS3(response.data.data.url);
      },
      async uploadToS3(imgUrl) {
        console.log("Image URL: ",imgUrl);
        console.log("Pre-Signed URL: ", this.preSignedUrl);
        const uploadResponse = await UploadController.uploadFile(
          this.preSignedUrl,
          this.selectedFile
        );
        if (this.uploadingForOption) {
          this.options[this.editedOptionIndex].option_value = imgUrl;
          this.options[this.editedOptionIndex].option_type = "IMAGE";
        } else {
          this.questionAssetUrl = imgUrl;
          this.questionAssetType = this.selectedFile.type;
          console.log(this.selectedFile.type);
        }
        this.uploadingForOption = false;
        this.uploadingMsg = "File uploaded";
        this.selectedFile = null
        console.log("Upload Response: ", uploadResponse);
      },
      formbtn() {
        return this.formbtnBool === false ? "Create" : "Update";
      },
      async updateInput(id) {
        console.log("update called");
        //if (this.$refs.form.validate()) {
        const response = await QuestionsController.updateQuestion(
          {
            statement: this.questionName,
            question_type: this.questionType,
            questionDescription: this.questionDescription,
            lo_ids: this.selectedLOs,
            skill_id: this.skillId,
            subject_id: this.subject,
            correct_answer_score: this.correctAnswerScore,
            estimated_time: this.estimatedTime != '' ? parseInt(this.estimatedTime) : 0 ,
            blooms_taxonomy: this.bloomsTaxonomy,
            knowledge_level: this.knowledgeLevel,
            complexity_level: this.complexityLevel,
            difficulty_level: this.difficultyLevel,
            question_mtf_answers: this.questionType == 'MATCH_THE_FOLLOWING' ? this.mtfAnswers : null,
            level_id: this.level,
            // correct_answer: this.getCorrectAnswer(),
            hint: this.hint,
            answer_explanation: this.answerExplanation,
            question_options: this.getOptions(),
          },
          id
        );
        console.log(response.data);
        if (response.data.success) {
          this.isCreatingQuestion = false;
          this.successMessage = "Question Updated Successfully";
          this.successDialog = true;
          this.createQuestionDialog = false;
          //this.fetchQuestions();
        } else {
          this.isCreatingQuestion = false;
          this.errorDialog = true;
        }
        // }
      },
  
      updateData(item) {
        this.editId = item.id; // selected id for edit
        this.formbtnBool = true; // change update/create btn value
        this.createQuestionDialog = true;
        this.questionType = item.question_type;
        this.skillId = item.skill_id;
        this.correctAnswerScore = item.correct_answer_score;
        
        this.estimatedTime = item.estimated_time != '' ? parseInt(item.estimated_time) : 0 ;
        this.bloomsTaxonomy = item.blooms_taxonomy != '' ? item.blooms_taxonomy : null;
        this.knowledgeLevel = item.knowledge_level != '' ? item.knowledge_level : null;
        this.complexityLevel = item.complexity_level != '' ? item.complexity_level : null;
        this.difficultyLevel = item.difficulty_level != '' ? item.difficulty_level : null;
        this.correct_answer = item.correct_answer;
        this.hint = item.hint;
        this.subject = item.subject_id;
        this.proficiencyLevel = item.proficiency_level != '' ? item.proficiency_level : null;
        this.level = item.level_id;
        this.options = item.question_options;
        this.mtfAnswers = item.question_mtf_answers;
        this.questionAssetType = item.mime_type;
        this.questionAssetUrl = item.s3_asset_urls;
        this.selectedFile = null;
        // this.selectedLOs = item.lo_ids data not comming
        this.answerExplanation = item.answer_explanation;
  
        setTimeout(() => {
          // This code will execute after a 1 second delay
          this.questionName = item.statement;
        }, 2000);
      },
      getDate(timeStamp) {
        return new Date(timeStamp).toString().substring(0, 16);
      },
      async deleteData(data) {
        //console.log("getting data", data);
        if (data.length == 1) {
          const response = await QuestionsController.deleteQuestion(data[0].id);
          if (response.data.success) {
            this.fetchQuestions();
            console.log(response);
          } else {
            alert(response.data.error);
          }
        } else {
          var ids = "";
          for (var i = 0; i < data.length; i++) {
            ids = ids + data[i].id;
            if (i != data.length - 1) {
              ids = ids + ",";
            }
          }
          const response = await QuestionsController.deleteBulkQuestion(ids);
          if (response.data.success) {
            this.fetchQuestions();
            console.log(response);
          } else {
            alert(response.data.error);
          }
        }
  
        //console.log("deleted", response);
        this.deleteDialog = false;
        this.selectedTableItems.length = "0";
      },
      async getLO() {
        const response = await LoBankController.getLO();
        //console.log(response);
        this.LOData = response.data.data.rows;
      },
      async getLevels() {
        const response = await LevelController.getLevel();
        this.levels = response.data.data.rows;
        // console.log("level data", this.levelData.rows);
      },
      async getSkills() {
        const response = await SkillsController.getSkills();
        //console.log(response);
        this.skills = response.data.data.rows;
      },
      async getSubjects() {
        const response = await SubjectController.getSubject();
        //console.log(response);
        this.subjects = response.data.data.rows;
      },
      addOption() {
        this.options.push({
          option_key: this.getAlphabet(this.options.length),
          option_value: "Option " + (this.options.length + 1),
          option_type: "TEXT",
          is_correct: false,
          option_uuid: uuidv4()
        });
        console.log(this.options);
      },
      removeOption(index) {
        this.options.splice(index, 1);
      },
      getCorrectAnswer() {
        switch (this.questionType) {
          case "SINGLE_CHOICE":
            this.options.forEach((option) => {
              if (option.option_key == this.singleSelectCorrectAnswer) {
                option.is_correct = true;
              } else {
                option.is_correct = false;
              }
            });
            return this.singleSelectCorrectAnswer;
  
          case "MULTIPLE_CHOICE":
            this.options.forEach((option) => {
              if (
                this.selectedAnswersForMultitpleTypeQuestions.includes(
                  option.option_key
                )
              ) {
                option.is_correct = true;
              } else {
                option.is_correct = false;
              }
            });
            return JSON.stringify(this.selectedAnswersForMultitpleTypeQuestions);
  
          case "FILL_IN_THE_BLANKS":
            return this.correctAnswer;
  
          case "TRUE_FALSE":
            return this.trueFalseCorrectAnswer;
  
          case "MATCH_THE_FOLLOWING":
            return 'NA';
  
          default:
            break;
        }
      },
      getOptions() {
        switch (this.questionType) {
          case "SINGLE_CHOICE":
            return this.options;
  
          case "MULTIPLE_CHOICE":
            return this.options;
  
          case "FILL_IN_THE_BLANKS":
            return [];
  
          case "TRUE_FALSE":
            return [
              {
                option_key: "A",
                option_value: "TRUE",
                option_type: "TEXT",
              },
              {
                option_key: "B",
                option_value: "FALSE",
                option_type: "TEXT",
              },
            ];
  
          case "MATCH_THE_FOLLOWING":
            return this.options;
  
          default:
            break;
        }
      },
  
      async createQuestion() {
        if (this.$refs.form.validate()) {
          var selectTags = "";
          this.selectedTags.forEach((item) => {
            selectTags = selectTags + item + ",";
          });
          selectTags = selectTags.slice(0, -1);
          console.log(selectTags);
          this.isCreatingQuestion = true;
          const response = await QuestionsController.createQuestion({
            uuid:this.questionUuid,
            statement: this.questionName,
            question_type: this.questionType,
            questionDescription: this.questionDescription,
            s3_asset_urls: this.questionAssetUrl,
            mime_type:this.questionAssetType,
            lo_ids: this.selectedLOs,
            skill_id: this.skillId,
            subject_id: this.subject,
            correct_answer_score: this.correctAnswerScore,
            estimated_time: this.estimatedTime,
            blooms_taxonomy: this.bloomsTaxonomy,
            knowledge_level: this.knowledgeLevel,
            complexity_level: this.complexityLevel,
            difficulty_level: this.difficultyLevel,
            proficiency_level: this.proficiencyLevel,
             correct_answer: this.getCorrectAnswer(), 
             question_mtf_answers: this.questionType == 'MATCH_THE_FOLLOWING' ? this.mtfAnswers : null,
            level_id: this.level,
            hint: this.hint,
            tags: selectTags,
            answer_explanation: this.answerExplanation,
            question_options: this.getOptions(),
          });
          console.log("create question res",response.data.success);
          if (response.data.success) {
            this.isCreatingQuestion = false;
            this.successDialog = true;
            this.createQuestionDialog = false;
            this.fetchQuestions();
          } else {
            this.isCreatingQuestion = false;
            this.errorDialog = true;
            this.errorMessage = response.data.error;
          }
        }
      },
      editOption(index) {
        console.log("Edit Option Called");
        console.log("Checkpoint 1:", this.options);
        this.editedOptionIndex = index;
        this.optionTextFieldDialog = true;
        setTimeout(() => {
          this.editedCkeditorValue =
            this.options[this.editedOptionIndex].option_value;
  
          // This code will execute after a 1 second delay
          //this.options[this.editedOptionIndex] = this.options[index];
        }, 1000);
        console.log("Checkpoint 2:", this.options);
      },
      editAnswer(index) {
        console.log("Edit Option Called");
        console.log("Checkpoint 1:", this.options);
        this.editedOptionIndex = index;
        this.optionTextFieldDialogAns = true;
        setTimeout(() => {
          this.editedCkeditorValueAns =
            this.mtfAnswers[this.editedOptionIndex].answer_value;
  
          // This code will execute after a 1 second delay
          //this.options[this.editedOptionIndex] = this.options[index];
        }, 1000);
        console.log("Checkpoint 2:", this.options);
      },
      async fetchQuestions() {
        const response = await QuestionsController.getQuestions(
          this.pageSize,
          this.page
        );
        console.log(response.data);
        this.count = response.data.data.count;
        this.tableData = response.data.data.rows;
      },
      async deleteQuestion() {
        await QuestionsController.deleteQuestion();
        //console.log(response.data);
      },
      clearFilter() {
        this.selectedQuestionTypeFilter = [];
        this.selectedLevelFilter = [];
        this.selecteddifficultyLevelFilter = [];
        this.selectedcomplexityLevelFilter = [];
        this.selectedknowlewdgeLevelFilter = [];
        this.selectedbloomsTaxonomyLevelFilter = [];
        this.selectedskillsFilter = [];
        this.selectedsubjectsFilter = [];
        this.fetchQuestions();
        this.filterDialog = false;
        this.filterData = false;
      },
      async filterQuestions(
        questionTypeIds,
        levelIds,
        diffLevelIds,
        complexityLevelIds,
        knowledgeLevelIds,
        bloomsTaxonomy,
        skillIds,
        subjectIds
      ) {
        //console.log("filter function call");
        var questionIds = "";
        var levelId = "";
        var diffLevelId = "";
        var compLevelIds = "";
        var knowLevelIds = "";
        var bloomsLevelIds = "";
        var skillsId = "";
        var subIds = "";
        questionTypeIds.forEach((item) => {
          questionIds = questionIds + item + ",";
        });
        levelIds.forEach((item) => {
          levelId = levelId + item.id + ",";
        });
        diffLevelIds.forEach((item) => {
          diffLevelId = diffLevelId + item + ",";
        });
        complexityLevelIds.forEach((item) => {
          compLevelIds = compLevelIds + item + ",";
        });
        knowledgeLevelIds.forEach((item) => {
          knowLevelIds = knowLevelIds + item + ",";
        });
        bloomsTaxonomy.forEach((item) => {
          bloomsLevelIds = bloomsLevelIds + item + ",";
        });
        skillIds.forEach((item) => {
          skillsId = skillsId + item.id + ",";
        });
        subjectIds.forEach((item) => {
          subIds = subIds + item.id + ",";
        });
        questionIds = questionIds.slice(0, -1);
        levelId = levelId.slice(0, -1);
        diffLevelId = diffLevelId.slice(0, -1);
        compLevelIds = compLevelIds.slice(0, -1);
        knowLevelIds = knowLevelIds.slice(0, -1);
        bloomsLevelIds = bloomsLevelIds.slice(0, -1);
        skillsId = skillsId.slice(0, -1);
        subIds = subIds.slice(0, -1);
        const response = await QuestionsController.filterQuestion(
          questionIds,
          levelId,
          diffLevelId,
          compLevelIds,
          knowLevelIds,
          bloomsLevelIds,
          skillsId,
          subIds,
          this.pageSize,
          this.page
        );
        console.log("filter responce", response);
        //console.log("skillsId", skillsId);
        this.filterDialog = false;
        this.tableData = response.data.data.rows;
        this.count = response.data.data.count;
        this.filterData = true;
      },
      async getGrades() {
        const response = await GradeController.getAllGradesByPagination(
          this.pageSize,
          this.page);
          if (response.data.success) {
            console.log("",response);
            this.gradeData = response.data.data;
            this.gradeList = this.gradeData.rows;
            this.count = response.data.data.count;
        }
        else {
          alert(response.data.error)
        }
      

      },
      async getBoards() {
      const response = await BoardController.getBoards();
      if (response.data.success) {
        this.strandList = response.data.data.rows;

      }
      else {
        alert(response.data.error)
      }
    },
      
    },
    
    created() {
      this.fetchQuestions();
      this.getLO();
      this.getGrades();
      this.getBoards();
      this.getSubjects();
      this.getSkills();
      this.getLevels();
      this.questionUuid=uuidv4();
    },
  };
  </script>
  <style scoped>
  .v-list-item__content {
    min-height: 64px;
  }
  </style>