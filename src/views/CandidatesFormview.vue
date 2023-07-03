<template>
  <v-form class="form" ref="form" lazy-validation>
    <v-container fluid class="pa-8 secondary">
      <!-- VGOS -->
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-xl" outlined>
            <v-card-text>
              <div>
                <v-row>
                  <v-col cols="3" class="d-flex">
                    <div >
                       <v-avatar class="mt-0 ms-0">
                        <img src="../assets/user.svg" alt="John">
                      </v-avatar>

                    </div>
                    <div>
                      <span style="font-size: 18px;">{{ this.name }}</span>
                      <div class="badge">
                        <v-chip v-for="level in levels" :key="level" class="ma-1 fs" small>
                          {{ level }}
                        </v-chip>
                      </div>
                    </div>
                  </v-col>
                  <v-col v-if="this.recommended_level" cols="9" class="endsec justify-end d-flex mt-0 me-0 align-center">
                    <p> <img src="../assets/Vector (10).svg" cols="" alt="" class="pe-2" /> <strong class="recommend text-color-green">Recommended</strong> <span>For</span> <strong>{{ this.recommended_level
                    }}</strong></p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
      <!-- Job Seekers -->
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-xl card-height " outlined>
            <div class="d-flex align">
              <V-col cols="1">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  1
                </v-btn>
              </V-col>
              <v-col cols="3" class="ml-n8">
                <strong class="d-flex   ">About Candidate in his/her words *</strong>
              </v-col>
            </div>

            <v-row>
              <v-col cols="12" class="px-10">
                <v-text-field v-model="about_candidate" color="primary" label="Your Answer" variant="underlined"
                  class="underline" required></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-xl card-height " outlined>
            <div class="d-flex align">
              <V-col cols="1">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  2
                </v-btn>
              </V-col>
              <v-col cols="3" class="ml-n8">
                <strong class="d-flex   ">Candidate's Past Experiance *</strong>
              </v-col>
            </div>

            <v-row>
              <v-col cols="12" class="px-10">
                <v-text-field v-model="candidate_past" color="primary" label="Your Answer" variant="underlined"
                  class="underline"></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-xl card-height " outlined>
            <div class="d-flex align-center">
              <V-col cols="1">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  3
                </v-btn>
              </V-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex   ">Current CTC And Expected CTC of Candidate *</strong>
              </v-col>
            </div>

            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="6" class="d-flex flex-row">
                    <span class="ms-6 gray">Current CTC- </span>
                    <v-text-field style="width: 20px;    padding-top: 0px;margin-top: 0px;" v-model="ctc_current" color="primary" variant="underlined"
                      class="underline" maxLength="4" @keypress="isNumber($event)"></v-text-field>
                    <span>LPA</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" class="d-flex flex-row">
                <span class="ms-6 gray">Expected CTC- </span>
                <v-text-field style="width: 20px;  padding-top: 0px;margin-top: 0px;" v-model="ctc_expected" color="primary" variant="underlined"
                  class="underline" maxLength="4" @keypress="isNumber($event)"></v-text-field>
                <span>LPA</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card " outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  4
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Grades candidate is teaching *</strong>
              </v-col>
            </div>

            <v-row class=" ms-1">
              <v-col cols="11 " class="ms-5 search">
                <v-select v-model="teaching_grades" 
                :items="gradeList" 
                attach chips clearable label="Type Grade" multiple
                item-value="id"
                item-text="name"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 4">
                      <span>{{ item.name }}</span>
                    </v-chip>
                    <span v-if="index === 4" class="text-grey text-caption align-self-center">
                      (+{{ teaching_grades.length - 4 }} others)
                    </span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card " outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  5
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Boards candidate teaches *</strong>
              </v-col>
            </div>
            <v-row class="checkbox ms-2">
              <v-col cols="3" class="checkbox1"  v-for="item in boardData"
                :key="item.id">
                <v-checkbox
                v-model="teaching_boards" :value="item.id" :label="item.name"></v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card " outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  6
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Confidences Score</strong>
              </v-col>
            </div>


            <v-row>
              <v-col cols="11" class="ms-5 mt-10">
                <v-slider v-model="confidence_score" step="1" ticks max="10" show-ticks="always" tick-size="4"
                  thumb-label="always" track-color="grey" color="#277BC0"></v-slider>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card" outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  7
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Appearance Score</strong>
              </v-col>
            </div>
            <v-row>
              <v-col cols="11" class="ms-5 mt-10">
                <v-slider v-model="appearence_score" step="1" ticks max="10" show-ticks="always" tick-size="4"
                  thumb-label="always" track-color="grey" color="#277BC0"></v-slider>
              </v-col>
            </v-row>




          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-xl card-height " outlined>
            <div class="d-flex align-center">
              <V-col cols="1">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  8
                </v-btn>
              </V-col>
              <v-col cols="3" class="ml-n8">
                <strong>Interview Notes</strong>
              </v-col>
            </div>

            <v-row>
              <v-col cols="12"  class="px-10">
                <v-text-field v-model="interview_notes" color="primary" label="Your Answer" variant="underlined"
                  class="underline"></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card " outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  9
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Overall Rating</strong>
              </v-col>
            </div>


            <v-row>
              <v-col cols="11" class="ms-5 mt-8">
                <v-slider v-model="overall_rating" step="1" ticks max="10" show-ticks="always" tick-size="4"
                  thumb-label="always" track-color="grey" color="#277BC0"></v-slider>
              </v-col>
            </v-row>


          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card " outlined>
            <div class="d-flex align-center">
              <v-col cols="2">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  10
                </v-btn>
              </v-col>
              <v-col cols="8" class="ml-n8">
                <strong class="d-flex  ms-3 "> Select For Offer ?</strong>
              </v-col>
            </div>

            <v-row class=" ms-5 d-flex">
              <v-radio-group v-model="offer_selection" row>
                <v-radio label="Yes" value="YES" checked></v-radio>
                <v-radio label="No" value="NO"></v-radio>
                <v-radio label="Maybe" value="MAYBE"></v-radio>
              </v-radio-group>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="2">
          <v-btn @click="submitForm" class="submit-btn ">Submit </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>
  
<script>
// @ is an alias to /src

import "../styles.css";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import InterviewController from '@/controllers/InterviewController'
import GradeController from "@/controllers/GradeController";
import BoardController from "@/controllers/BoardController";

export default {
  name: "CandidatesFormview",
  mixins: [validationMixin],
  components: {

  },
  validations: {
    about_candidate: { required },
    candidate_past: { required },
    ctc_current: { required },
    ctc_expected: { required },
    teaching_grades: { required },
    teaching_boards: { required },
    confidence_score: { required },
    appearence_score: { required },
    interview_notes: { required },
    overall_rating: { required },
    offer_selection: { required },
  },
  data() {
    return {
      user_id: '',
      recommended_level: '',
      levels: [],
      name: '',
      gradeList: [],
      boardData: [],
      pageSize: 500,
      page: 1,
      about_candidate: null,
      candidate_past: null,
      ctc_current: null,
      ctc_expected: null,
      teaching_grades: null,
      teaching_boards: null,
      confidence_score: 0,
      appearence_score: 0,
      interview_notes: null,
      overall_rating: 0,
      offer_selection: "YES",
      grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    }
  },
  created() {
    this.getUserData();
    this.getGrades();
    this.getBoards();
  },
  methods: {
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getUserData() {
      const { user_id, name, levels, recommended_level } = this.$route.query;
      this.user_id = user_id,
      this.name = name;
      console.log(levels);
      this.levels = levels.split(",");

      this.recommended_level = recommended_level;
    },
    async submitForm() {
      console.log(this.$refs.form);
      if (this.$refs.form.validate()) {
        const formData = {
          about_candidate: this.about_candidate,
          candidate_past: this.candidate_past,
          ctc_current: this.ctc_current,
          ctc_expected: this.ctc_expected,
          teaching_grades: this.teaching_grades,
          teaching_boards: this.teaching_boards,
          confidence_score: this.confidence_score,
          appearence_score: this.appearence_score,
          interview_notes: this.interview_notes,
          overall_rating: this.overall_rating,
          offer_selection: this.offer_selection,
        }
        const response = await InterviewController.postCandidateData(formData, this.user_id);
        if (response.data.success) {
          this.$route.push('/interview/panel');
        } else {
          alert("Something went wrong could you please check with admin");
        }
      }
    },
    async getGrades() {
      const response = await GradeController.getAllGradesByPagination(
          this.pageSize,
        this.page);
        if (response.data.success) {
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
        this.boardData = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
    }
  },

};
</script>
  

<style>
.v-slider__track-background.grey {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px
}
.v-slider__track-fill {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px
}
.v-slider--horizontal .v-slider__track-container {
  height: 25px;
}
.submit-btn {
  border-radius: 24px;
  background-color: #000000 !important;
  color: #fff !important;
}
.v-slider__thumb:before {
  left: -4px;
  top: -6px;
}

.v-slider__thumb {
  width: 25px;
  height: 25px;
  left: -10px;
}
</style>
