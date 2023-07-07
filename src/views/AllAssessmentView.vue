<template>
  <v-container fluid class="pa-8">
    <v-row class="first-row">
      <v-col cols="6">
        <span class="all-assessment"> All Assessments</span>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          clearable
        ></v-text-field
      ></v-col>
      <v-col cols="">
        <v-btn class="primary mx-2" rounded @click="filterDialog = true"
          ><v-icon>mdi-tune</v-icon>Filter</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip
                  class="assessment-red-btn mt-5"
                  color="red"
                  text-color="white"
                >
                  30 mins Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">National Level Scholarship </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="assessment-card" max-width="374" outlined>
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn1 mt-5" color="">
                  2 Hours Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn1 mt-5" color="">
                  3 Hours Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn2 mt-5" color="">
                  30 mins Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip
                  class="assessment-red-btn mt-5"
                  color="red"
                  text-color="white"
                >
                  30 mins Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">National Level Scholarship </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="assessment-card" max-width="374" outlined>
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn1 mt-5" color="">
                  2 Hours Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn1 mt-5" color="">
                  3 Hours Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          class="assessment-card"
          max-width="374"
          max-height="264"
          outlined
        >
          <div class="ms-5">
            <v-row>
              <v-col>
                <v-chip class="assessment-red-btn2 mt-5" color="">
                  30 mins Left
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="assessment-level">
                <span class="">Assessment - 1 (VGOS) </span>
              </v-col>
            </v-row>
            <v-row class="ms-0">
              <v-chip class="assessment-chip1"> Secondary </v-chip>

              <v-chip class="assessment-chip2 ms-2"> Senior Secondary </v-chip>

              <v-chip class="assessment-chip3 ms-2"> Primary </v-chip>
            </v-row>
            <v-row>
              <v-col>
                <v-chip class="assessment-chip4"> Pre Primary </v-chip>
              </v-col>
            </v-row>
            <v-row class="icons-row">
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/Vector .svg" alt=""
                /></span>
                <span class="img-heading"> 06/03/23 </span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/clock.svg" alt=""
                /></span>
                <span class="img-heading">1 hours</span>
              </v-col>
              <v-col class="d-flex">
                <span class="me-2"
                  ><img src="../assets/users.svg" alt=""
                /></span>
                <span class="img-heading mt-1"> 400</span>
              </v-col>
            </v-row>
            <row>
              <v-btn class="assessment-start-btn text-capitalize mt-1">
                Start Test
              </v-btn>
            </row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadController from "@/controllers/UploadController";
import QuestionsController from "../controllers/QuestionsController";
import LoBankController from "@/controllers/LoBankController";

import { v4 as uuidv4 } from "uuid";
export default {
  name: "AllAssessmentView",
  data() {
    return {
      imagePath: "../assets/Vector.svg",
      imagePathclock: "../assets/clock.svg",
      imagePathusers: "../assets/users.svg",
    };
  },
  watch: {
    dataTableOptions: {},
    search() {},
    tag() {},
  },

  computed: {
    getHeight() {
      return this.windowHeight;
    },
  },
  methods: {
    clearValue() {},

    async uploadToS3(imgUrl) {
      console.log("Image URL: ", imgUrl);
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
      this.selectedFile = null;
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
          estimated_time:
            this.estimatedTime != "" ? parseInt(this.estimatedTime) : 0,
          blooms_taxonomy: this.bloomsTaxonomy,
          knowledge_level: this.knowledgeLevel,
          complexity_level: this.complexityLevel,
          difficulty_level: this.difficultyLevel,
          question_mtf_answers:
            this.questionType == "MATCH_THE_FOLLOWING" ? this.mtfAnswers : null,
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

      this.estimatedTime =
        item.estimated_time != "" ? parseInt(item.estimated_time) : 0;
      this.bloomsTaxonomy =
        item.blooms_taxonomy != "" ? item.blooms_taxonomy : null;
      this.knowledgeLevel =
        item.knowledge_level != "" ? item.knowledge_level : null;
      this.complexityLevel =
        item.complexity_level != "" ? item.complexity_level : null;
      this.difficultyLevel =
        item.difficulty_level != "" ? item.difficulty_level : null;
      this.correct_answer = item.correct_answer;
      this.hint = item.hint;
      this.subject = item.subject_id;
      this.proficiencyLevel =
        item.proficiency_level != "" ? item.proficiency_level : null;
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

    addOption() {
      this.options.push({
        option_key: this.getAlphabet(this.options.length),
        option_value: "Option " + (this.options.length + 1),
        option_type: "TEXT",
        is_correct: false,
        option_uuid: uuidv4(),
      });
      console.log(this.options);
    },
  },

  created() {},
};
</script>
