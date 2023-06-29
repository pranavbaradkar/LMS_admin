<template>
    <form class="form">
      <v-container>
        <!-- VGOS -->
        <v-row>
          <v-col cols="12">
            <v-card class="rounded-xl" outlined>   
              <v-card-text>
              <div>
              <v-row>
                <v-col cols="3">
                   <span style="font-size: 18px;">{{ this.name }}</span>
                   <div class="badge">
                    <v-chip
                            v-for="level in this.levels"
                            :key="level"
                            class="ma-1 fs"
                            small
                            >
                            {{level}}
                    </v-chip>
                   </div>
                </v-col>
                <v-col v-if="this.recommended_level" cols="8" class="endsec mt-4 me-3">
                 <p> <span class="recommend">Recommended</span> <span>For</span> <strong>{{ this.recommended_level }}</strong></p>
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
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        1
                        </v-btn> 
                    </V-col>
                    <v-col cols="3" class="ml-n8">
                        <strong  class="d-flex   ">About Candidate in his/her words *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="about_candidate"
                    color="primary"
                    label="Your Answer"
                    variant="underlined"
                    class="underline"
                 ></v-text-field>
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
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        2
                    </v-btn> 
                    </V-col>
                    <v-col cols="3" class="ml-n8">
                        <strong  class="d-flex   ">Candidate's Past Experiance *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="candidate_past"
                    color="primary"
                    label="Your Answer"
                    variant="underlined"
                    class="underline"
                 ></v-text-field>
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
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        3
                    </v-btn> 
                    </V-col>
                    <v-col cols="3" class="ml-n8">
                        <strong  class="d-flex   ">Current CTC And Expected CTC of Candidate *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="6">
                <v-row>
                <v-col cols="6" class="d-flex flex-row">
                <span class="ms-5 gray">Current CTC- </span>
                  <v-text-field
                    style="width: 20px;"
                    v-model="ctc_current"
                    color="primary"
                    variant="underlined"
                    class="underline"
                    maxLength="4"
                    @keypress="isNumber($event)"
                 ></v-text-field>
                <span>LPA</span>
              </v-col>
              </v-row>
              </v-col>
              <v-col cols="3" class="d-flex flex-row">
                <span class="ms-5 gray">Expected CTC- </span>
                  <v-text-field
                    style="width: 20px;"
                    v-model="ctc_expected"
                    color="primary"
                    variant="underlined"
                    class="underline"
                    maxLength="4"
                    @keypress="isNumber($event)"
                 ></v-text-field>
                <span>LPA</span>
              </v-col>
              </v-row>
            </v-card>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="rounded-xl cross-card " outlined>
                <v-row>
                   <V-col cols="" class="four mt-4 ms-3">
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        4
                    </v-btn> 
                    <strong  class="d-flex  ms-3 ">Grades candidate is teaching *</strong>
                    </V-col>
             </v-row>
                <v-row class=" ms-1">
                 <v-col cols="11  " class="ms-5 search"> 
                      <v-select
                        v-model="teaching_grades"
                        :items="grades"
                        attach
                        chips
                        clearable
                        label="Type Grade"
                        multiple
                     >
                     <template v-slot:selection="{ item, index }">
      <v-chip v-if="index < 4">
        <span>{{item}}</span>
      </v-chip>
      <span
        v-if="index === 4"
        class="text-grey text-caption align-self-center"
      >
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
                <v-row class="mt-2">
                   <V-col cols="" class="four  ms-3">
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        5
                    </v-btn> 
                    <strong  class="d-flex  ms-3 ">Boards candidate teaches</strong>
                    </V-col>
             </v-row>
                <v-row class="checkbox ms-2">
                  <v-col cols="2" class="checkbox1">
                    <v-checkbox v-model="teaching_boards" value="State"></v-checkbox>
                    <span>State</span>
                  </v-col> 
                  <v-col cols="2" class="checkbox1">
                    <v-checkbox v-model="teaching_boards" value="CISCE"></v-checkbox>
                    <span>CISCE</span>
                  </v-col> 
                  <v-col cols="2" class="checkbox1">
                    <v-checkbox v-model="teaching_boards" value="CBSE"></v-checkbox>
                    <span>CBSE</span>
                  </v-col> 
                  <v-col cols="2" class="checkbox1">
                    <v-checkbox v-model="teaching_boards" value="CAIF"></v-checkbox>
                    <span>CAIF</span>
                  </v-col>                  
              </v-row> 
            </v-card>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="rounded-xl cross-card " outlined>
                <v-row>
                   <V-col cols="" class="four mt-4 ms-3">
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        6
                    </v-btn> 
                      <strong  class="d-flex  ms-3 ">Confidences Score</strong>
                    </V-col>
             </v-row>
                
              
            <v-row>
              <v-col cols="11" class="ms-3">
                  <v-slider
                    v-model="confidence_score"
                    step="1"
                    ticks
                    max="10"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label="always"
                    track-color="grey"
                    color="#277BC0"
                ></v-slider>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl cross-card" outlined>
            <v-row class="mt-2">
              <V-col cols="" class="four ms-3">
                <v-btn class="mx-2 btn-gray" fab disable small color="">
                  7
                </v-btn>
                <strong class="d-flex ms-3">Appearance Score</strong>
              </V-col>
            </v-row>
            <v-row>
              <v-col cols="11" class="ms-3">
                  <v-slider
                  v-model="appearence_score"
                  step="1"
                    ticks
                    max="10"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label="always"
                    track-color="grey"
                    color="#277BC0"
                ></v-slider>
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
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        8
                    </v-btn> 
                    </V-col>
                    <v-col cols="3" class="ml-n8">
                        <strong>Interview Notes</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="interview_notes"
                    color="primary"
                    label="Your Answer"
                    variant="underlined"
                    class="underline"
                 ></v-text-field>
              </v-col>
              </v-row>
            </v-card>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="rounded-xl cross-card " outlined>
                <v-row>
                   <V-col cols="" class="four mt-4 ms-3">
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        9
                    </v-btn> 
                    <strong  class="d-flex  ms-3 ">Overall Rating</strong>
                    </V-col>
             </v-row>
                
              
             <v-row>
              <v-col cols="11" class="ms-3">
                  <v-slider
                    v-model="overall_rating"
                    step="1"
                    ticks
                    max="10"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label="always"
                    track-color="grey"
                    color="#277BC0"
                ></v-slider>
              </v-col>
            </v-row>
              
             
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="rounded-xl cross-card " outlined>
                <v-row class="mt-2">
                   <V-col cols="" class="four  ms-3">
                        <v-btn
                                class="mx-2 btn-gray"
                                fab
                                disable
                                small
                            color=""
                            >
                        10
                    </v-btn> 
                    <strong  class="d-flex  ms-3 "> Select For Offer ?</strong>
                    </V-col>
             </v-row>
                <v-row class=" ms-5 d-flex">
                  <v-radio-group
                    v-model="offer_selection"
                    row
                  >
                    <v-radio
                      label="Yes"
                      value="YES"
                    ></v-radio>
                    <v-radio
                      label="No"
                      value="NO"
                    ></v-radio>
                    <v-radio
                      label="Maybe"
                      value="MAYBE"
                    ></v-radio>
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
    </form>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import "../styles.css";
  import InterviewController from '@/controllers/InterviewController'
  export default {
    name: "CandidatesFormview",
    components: {
    
    },
    data() {
      return  {
    user_id: '',
    recommended_level:'',
    levels: [],
    name: '',
    about_candidate : "",
    candidate_past : "",
    ctc_current: "",
    ctc_expected : "",
    teaching_grades : [],
    teaching_boards : [],
    confidence_score : 0,
    appearence_score : 0,
    interview_notes : "",
    overall_rating : 0,
    offer_selection : "yes",
    grades: ['Grade 1', 'Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],
      }
    },
    created() {
      this.getUserData();
    },
    methods: {
      isNumber (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getUserData() {
      const {user_id, name, levels, recommended_level} = this.$route.query;
      this.user_id = user_id,
      this.name = name;
      this.levels = levels;
      this.recommended_level = recommended_level;
    },
      async submitForm () {
        const formData = {
          about_candidate : this.about_candidate,
    candidate_past : this.candidate_past,
    ctc_current: this.ctc_current,
    ctc_expected : this.ctc_expected,
    teaching_grades : this.teaching_grades,
    teaching_boards : this.teaching_boards,
    confidence_score : this.confidence_score,
    appearence_score : this.appearence_score,
    interview_notes : this.interview_notes,
    overall_rating : this.overall_rating,
    offer_selection : this.offer_selection,
        }
        console.log(formData)
        const response = await InterviewController.postCandidateData(formData, this.user_id);
        if (response.success) {
          this.$route.push('/interview/panel');
        }
        else {
          alert(response.error)
        }
      }
    }
  };
  </script>
  

  <style>
  .v-slider--horizontal .v-slider__track-container {
    height: 25px;
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
