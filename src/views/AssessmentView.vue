<template>
  <v-container fluid class="pa-8 secondary">
    <v-row cols="12" sm="12" md="" class="ma-0 pa-0 ">
      <v-col cols="8" class="d-flex align-center">
        <v-btn
          v-if="((user_permission.assessments && user_permission.assessments.panel && user_permission.assessments.panel.create) || user.role_type == 'SUPER_ADMIN') && !showUsers"
          @click="() => {
              dialog = true;
              e1 = 1;
              isEdit = false;
            }
            " class="primary" large rounded elevation="0"><v-icon>mdi-plus</v-icon>Create Assessment</v-btn>

        <div class="mt-4" v-if="showUsers">
          <span class="m-4 cursor" @click="showUsers = false">Assessments</span>
          <v-icon>mdi-chevron-right</v-icon>
          <span class="text--secondary">Assessment Name</span>
          <v-icon>mdi-chevron-right</v-icon>
          <select @change="() => {
              screeningMainsUser == 'false'
                ? fetchMainsUsers(selectedId)
                : fetchScreeningUsers(selectedId);
            }
            " v-model="screeningMainsUser">
            <option value="true" selected>
              Users in Screening Assessments
            </option>
            <option value="false">Users in Mains Assessments</option>
          </select>
        </div>
      </v-col>
      <v-col cols="4">
        <v-text-field v-if="!showUsers" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field></v-col>
    </v-row>

    <!-- assessment user table row with filter btn and color code -->
    <v-row justify="space-between" class="my-8" v-if="showUsers">
      <v-col cols="6" sm="6" md="" class="ma-0 pa-0 f-flex align-center">
        <div class="m-tab">
          <v-tabs background-color="#0000000D" class="ml-2 d-flex space-evenly" height="38" hide-slider>
            <v-tab active-class=" white ma-1 black--text" class="rounded" v-on:click="assessmentUsers = inProgress">
              In Progress
            </v-tab>
            <v-tab active-class=" white ma-1 black--text" class="rounded" v-on:click="assessmentUsers = cleared">
              Cleared
            </v-tab>

            <v-tab active-class="white ma-1 black--text" class="rounded" v-on:click="assessmentUsers = yetToAttempt">
              Not Cleared
            </v-tab>
            <v-tab active-class="ma-1 white black--text" class="rounded" v-on:click="assessmentUsers = yetToAttempt">
              Yet To Attempt
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <!-- filter btn and color code -->
      <v-col cols="6" sm="6" md="6" class="d-flex justify-end align-center ma-0 pa-0">
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-text-field label="Search" class="ma-0 pa-0" prepend-inner-icon="mdi-magnify"></v-text-field>
        <v-btn class="primary ml-2" rounded>
          <v-icon>mdi-tune</v-icon>Filter</v-btn>

      </v-col>
    </v-row>

    <!-- Assessment row and fiter and export btn -->

    <!-- <v-row justify="space-between" class="my-0" v-if="!showUsers">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5 ml-4">Assessments</div>
      </v-col>
      
    </v-row> -->

    <v-row cols="12" sm="12" md="" class="ma-0 pa-0 f-flex align-center" v-if="!showUsers">
      <v-col cols="6" sm="6" class="d-flex justify-end">
        <div class="m-tab">
          <v-tabs
            background-color="#0000000D"
            class="ml-2 d-flex space-evenly tab-style"
            height="38"
            hide-slider
          >
            <v-tab
              active-class=" white ma-1 black--text text-transform-cap"
              class="rounded  text-transform-cap"
              v-on:click="onClickRecommendation('TEACHER')"
            >
              Screening
            </v-tab>

            <v-tab
              active-class=" white ma-1 black--text "
              class="rounded text-transform-cap"
              v-on:click="onClickRecommendation('JOB_SEEKER')"
            >
              Mains
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <v-col cols="6" sm="6" class="d-flex justify-end">
        <div>

          <v-btn class="purple-button-light lightPurple purple-button-light-height-large mx-2"  elevation="0" rounded @click="filterDialog = true"><v-icon>mdi-tune</v-icon>Filter</v-btn>
          <v-btn class="purple-button-light lightPurple purple-button-light-height-large mx-2" elevation="0" rounded><v-icon>mdi-export</v-icon>Export</v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Live assessment and color code row  -->
    <v-row justify="space-between" class="mb-4 mt-0" v-if="!showUsers">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5 ml-4">
          Live Assessments ({{ assessments.filter((item) => item.status == 'PUBLISHED').length }})
        </div>
      </v-col>

      <!-- <v-col cols="8" sm="8" class="d-flex justify-end align-center">
        <v-icon color="#06C270CC" class="mr-2 ml-4">mdi-circle</v-icon> Cleared
        <v-icon class="mr-2 ml-4" color="#1B72E8B2">mdi-circle</v-icon> In
        progress
        <v-icon class="mr-2 ml-4" color="#FF9501CC">mdi-circle</v-icon> Not
        Cleared<v-icon class="mr-2 ml-4" color="#0000001F">mdi-circle</v-icon>
        Yet to attempt
      </v-col> -->
    </v-row>

    <!------------------------------------------ Assessment card here---------------------------- -->
    <div class="d-flex flex-row pb-4 pointradius" id="myScroll-x" v-if="!showUsers">
      <v-card variant="tonal" width="312px" min-width="312px" height="auto" class="pa-4 ml-4"
        v-for="assessment in assessments.filter((item) => item.status == 'PUBLISHED')" :key="assessment.id">
        <div>
          <v-chip class="live pa-3">
            <img src="../assets/radar.svg" class="mr-1" alt="question Icon" />
            Live
          </v-chip>
          <v-btn variant="tonal" class="grey-round ml-2"  elevation="0"  @click="fetchAssessmentUsers(assessment)" >
            <svg class="mr-2" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Profile">
              <path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd" d="M5.99028 9.22852C3.41187 9.22852 1.20996 9.61836 1.20996 11.1796C1.20996 12.7409 3.3979 13.1447 5.99028 13.1447C8.56869 13.1447 10.77 12.7542 10.77 11.1936C10.77 9.63296 8.58266 9.22852 5.99028 9.22852Z" stroke="#1A1523" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M5.98993 7.00262C7.68199 7.00262 9.05342 5.63056 9.05342 3.93849C9.05342 2.24643 7.68199 0.875 5.98993 0.875C4.29786 0.875 2.9258 2.24643 2.9258 3.93849C2.92008 5.62484 4.28262 6.9969 5.96834 7.00262H5.98993Z" stroke="#1A1523" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>

            321 Users
          </v-btn>
        </div>
        <v-card-title class="pa-0">
          <div style="width: 100%;" class="d-flex justify-space-between">
            <div class="font-size-16">
              {{ assessment.name }}
            </div>
          </div>
        </v-card-title>
        <!-- assessment type -->
        <div v-for="data in assessment.assessment_configurations" :key="data.id"
          class="d-flex justify-space-between flex-column">
          <div>
            <div class="mb-2 text-subtitle-1 grey-color-application font-size-14 font-weight-400">
              <!-- Assessment title -->
              {{ data.level.name }} <span v-if="data.subjects && data.subjects.length > 0">(<span style="font-weight: 400;" v-for="subject in data.subjects" :key="subject">{{ subject + ' ' }}</span>)</span>
            </div>

            <!-- <v-chip class="my-chip">{{ data.assessment_type }}</v-chip> -->
            <div class="mb-2 d-flex flex-row grey--text justify-space-between mt-0 mb-0 ">
              <div class="assessmentIconColor  font-size-12">
                <img src="../assets/marks.svg" class="mr-1" alt="question Icon" />
                {{ data.total_no_of_questions }} Questions
              </div>
              <div class="assessmentIconColor font-size-12">
                <img src="../assets/question.svg" class="mr-1" alt="question Icon" />
                {{ formatTime(data.duration_of_assessment) }}
              </div>
              <div class="assessmentIconColor pointradius font-size-12">
                <img src="../assets/clock.svg" class="mr-1" alt="clock Icon" />
                {{ data.correct_score_answer }} marks
              </div>
            </div>
            <div class="mb-2">
              <div class="d-flex justify-space-between ">
                <v-chip class="my-clear font-size-10 v-chip-custom">43 Cleared</v-chip>
                <v-chip class="my-progress font-size-10 v-chip-custom">43 In progress</v-chip>
                <v-chip class="my-notcleared font-size-10 v-chip-custom">43 Not Cleared</v-chip>
              </div>
            </div>
          </div>

          <div class="d-flex justify-space-between">
            <v-card-title v-if="user.role_type == 'SUPER_ADMIN'" class="pa-0 cursor roletype publish purple-button-light"
              @click="publishMethod(data.assessment_id, data.assessment_type)">Publish Result </v-card-title>
            <!-- <img src="../assets/edit.svg" alt="Edit Icon" class="custom-margin" />

            <img src="../assets/trash.svg" alt="Edit Icon" /> -->

          </div>
        </div>
      </v-card>
    </div>

    <v-row justify="space-between" class="mb-4 mt-0" v-if="!showUsers">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5 ml-4">
          Assessments in Draft ({{ assessments.filter((item) => item.status != 'PUBLISHED').length }})
        </div>
      </v-col>
    </v-row>

    <!------------------------------------------ Assessment card here---------------------------- -->
    <div class="d-flex flex-row pb-4" id="myScroll-x" v-if="!showUsers">
      <v-card width="427px" min-width="427px" height="auto" class="pa-5 ml-4 pb-8"
        v-for="assessment in assessments.filter((item) => item.status != 'PUBLISHED')" :key="assessment.id">
        <v-card-title class="pa-0">
          <div style="width: 100%;" class="d-flex justify-space-between">
            <div>
              {{ assessment.name }}
            </div>
            <div>
              <v-btn
                v-if="((user_permission.assessments && user_permission.assessments.panel && user_permission.assessments.panel.update) || user.role_type == 'SUPER_ADMIN')"
                fab color="white" style="width: 32px; height: 32px;"
                @click="getAssesmentDetails(assessment, assessment.id)" depressed>
              </v-btn>

              <v-btn
                v-if="((user_permission.assessments && user_permission.assessments.panel && user_permission.assessments.panel.delete) || user.role_type == 'SUPER_ADMIN')"
                class="ml-4" fab color="#ff000059" style="width: 32px; height: 32px;" @click="() => {
                  deleteDialog = true
                  selectedId = assessment.id;
                }" depressed>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <!-- assessment type -->
        <div v-for="data in assessment.assessment_configurations" :key="data.id"
          class="d-flex justify-space-between flex-column" style="height: 80%;">
          <div>
            <div class="my-2 text-subtitle-1">
              <!-- Assessment title -->
              {{ data.level && data.level.name }}
            </div>

            <div class="my-2 text-subtitle-1">
              <!-- Assessment title -->
              <span style="font-weight: 500" v-for="subject in data.subjects" :key="subject">{{ subject + ' ' }}</span>
            </div>
            <v-chip class="my-chip">{{ data.assessment_type }}</v-chip>
            <div class="d-flex flex-row grey--text justify-space-between mt-4 mb-4 ">
              <div class="assessmentIconColor">
                <img src="../assets/marks.svg" alt="question Icon" />
                {{ data.total_no_of_questions }} Questions
              </div>
              
              <div class="assessmentIconColor">
                <img src="../assets/question.svg" alt="question Icon" />
                {{ formatTime(data.duration_of_assessment) }}
              </div>
              <div class="assessmentIconColor">
                <img src="../assets/clock.svg" alt=" clock Icon" />
                {{ data.correct_score_answer }} marks
              </div>
            </div>
          </div>
          <div class="d-flex">
            <v-card-title v-if="user.role_type == 'SUPER_ADMIN'" class="pa-0 cursor" @click="assessment.status == 'PENDING' ? getAssesmentDetails(assessment, data.assessment_id) :
              showDialog(data.assessment_id)">
              {{ assessment.status == 'PENDING' ? 'CREATE' : 'Publish' }}
              <img src="../assets/edit.svg" alt="Edit Icon" class="custom-margin" />
              <img src="../assets/trash.svg" alt="Edit Icon" />
            </v-card-title>
          </div>
        </div>
        <v-divider class="mb-4 mt-2"></v-divider>
        <!-- Assessment type -->
      </v-card>
    </div>

    <v-data-table v-if="showUsers" :headers="screeningHeaders" :items="assessmentUsers">
      <template v-slot:[`item.actions`]="{}">
        <img width="30px" class="pt-2 cursor" src="../assets/todo.svg" />
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
    <!-- Assessment Creation Dialog Form -->
    <v-dialog v-model="dialog" fullscreen hide-overlay>
      <v-card class="secondary">
        <v-card-title class="mx-4">
          <v-toolbar elevation="0" class="secondary">
            <v-toolbar-title class="text-h5">Create Assessment</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row align="center" justify="end">
              <v-btn text @click="cancelClicked">Cancel</v-btn>
              <!-- <v-btn outlined rounded v-if="e1 > 1" @click="e1--" class="mr-4"
                >Back</v-btn
              > -->
              <v-btn width="111px" height="48px" rounded class="primary" @click="nextStep(e1)">
                <v-icon v-if="e1 == 4">mdi-book-open-variant</v-icon>{{ e1 == 4 ? isEdit ? "Update" : "Create" : "Next" }}
              </v-btn>
            </v-row>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-stepper v-model="e1" elevation="0" class="secondary">
            <v-stepper-header class="mx-6 white rounded-xl">
              <v-stepper-step :complete="e1 > 1" step="1">
                DETAILS
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                {{ assessment_type == 'MAINS' ? 'MAINS' : 'SCREENING' }} CONFIGURATION
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">
                QUESTIONS
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 4" step="4">
                PREVIEW
              </v-stepper-step>
            </v-stepper-header>
            <!-- stepper items starts here -->
            <v-stepper-items class="secondary">
              <v-stepper-content step="1">
                <v-form ref="step1" lazy-validation>

                  <v-card elevation="0" class="my-4">
                    <v-card-text>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1 my-4">Assessment Type</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="assessment_type" :rules="[(v) => !!v || 'Please select one']" required>
                            <v-row>
                              <v-col>
                                <v-radio label="SCREENING" value="SCREENING"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="MAINS" value="MAINS"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-card elevation="0">
                    <v-card-text class="pt-10">

                      <v-row class="py-0">
                        <v-col class="py-0">
                          <div class="text-body-1 my-2">Assessment Name*</div>
                          <v-text-field outlined class="rounded-xl" v-model="name" solo flat
                            label="Enter Assessment Name*" :rules="[
                              (v) => !!v || 'Assessment Name is required',
                            ]"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col class="py-0">
                          <div class="text-body-1 my-2">Instructions*</div>
                          <v-textarea outlined class="rounded-xl" label="Enter Instructions" solo flat
                            v-model="instructions" :rules="[(v) => !!v || 'Instructions is required']">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form ref="step2" lazy-validation>
                  <v-card elevation="0">
                    <v-card-text>
                      <div class="text-body-1 my-4">
                        Screening Configuration
                      </div>
                      <v-row class="py-0" v-for="(
                          skillsField, index
                        ) in screeningConfiguration.skillsFields" :key="index" align="center">
                        <v-col fluid class="py-0" cols="5">
                          <div class="text-body-1 my-2">
                            Skill Distribution* (change skill settings)
                          </div>
                          <v-select :items="skillsList" outlined class="rounded-xl py-0 mytextFiled"
                            v-model="skillsField.skill_id" item-text="name" item-value="id"
                            :rules="[(v) => !!v || 'Skill is required']">
                          </v-select>
                          <div class="py-0 text-subtitle-2 font-weight-light">
                            Novice : 0-20, Advance : 20-40, Competent : 40-60,
                            Proficient : 60-80, Expert : 80-100
                          </div>
                        </v-col>
                        <v-col class="py-0 pl-10" cols="3">
                          <div class="text-body-1 my-2">
                            Number of Questions*
                          </div>
                          <v-text-field v-model.number="skillsField.no_of_questions" outlined class="rounded-xl"
                            type="number" :rules="[
                              (v) => !!v || 'Number of Questions is required',
                            ]" required></v-text-field>
                        </v-col>
                        <v-col align-self="center" v-if="screeningConfiguration.skillsFields.length > 1">
                          <v-btn @click="deleteScreeningSkillField(index)" text color="blue">
                            Delete
                          </v-btn>
                        </v-col>
                        <v-col>
                          <!-- screning open dialog -->
                          <v-btn v-if="checkSubjects(skillsField.skill_id)" text color="blue" @click="
                            openSubjectDialog(
                              skillsList.find(
                                (skill) => skill.id == skillsField.skill_id
                              ),
                              skillsField
                            )
                            ">Add/Edit Subject</v-btn>
                        </v-col>
                      </v-row>

                      <v-row justify="start" align="center" class="px-2 blue--text" @click="addScreeningSkillsField">
                        <v-icon large>mdi-plus-circle-outline</v-icon>
                        <v-btn width="125px" height="20px" class="pl-0" text x-large color="blue">Add Skills</v-btn>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-card elevation="0" class="my-4">
                    <v-card-text>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1 my-4">Difficulty Level*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="screeningConfiguration.difficultyLevel"
                            :rules="[(v) => !!v || 'Please select one']" required>
                            <v-row>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                  <v-card elevation="0" class="my-4">
                    <v-card-text>
                      <v-row>
                        <v-col cols="6">
                          <div class="text-body-1 my-4">
                            Total Number Of Questions*
                          </div>
                          <v-text-field outlined class="rounded-xl" solo flat label="Total Number Of Questions"
                            type="number" v-model.number="screeningConfiguration.totalNumberQuestions
                              " :rules="[(v) => !!v || 'Please select number of questions']"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <div class="text-body-1 my-4">Teaching Level*</div>
                          <v-select label="Choose Level" :items="levels" item-text="name" item-value="id" outlined
                            class="rounded-xl" v-model="screeningConfiguration.teachingLevel"
                            :rules="[(v) => !!v || 'please select level']">
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">
                            Score For Correct Answer*
                          </div>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field hide-details outlined class="rounded-xl green" solo flat type="number" required
                            v-model.number="screeningConfiguration.correctAnswerScore
                              "></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Duration Of Assessment*</div>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field hide-details type="number" outlined class="rounded-xl green" solo flat
                            v-model.number="screeningConfiguration.assessmentDuration
                              " required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Negative Marking*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="screeningConfiguration.negativeMarking" required>
                            <v-row>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Randomize Questions*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="screeningConfiguration.randomizeQuestions" required>
                            <v-row>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col> </v-row><v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Shuffle Options*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="screeningConfiguration.shuffleOptions" required>
                            <v-row>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col> </v-row><v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Display Correct Answer*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group required v-model="screeningConfiguration.displayCorrectAnswer
                            ">
                            <v-row>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col> </v-row><v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Display Result*</div>
                        </v-col>
                        <v-col cols="3">
                          <v-radio-group v-model="screeningConfiguration.displayResult" required>
                            <v-row>
                              <v-col>
                                <v-radio label="YES" value="YES"></v-radio>
                              </v-col>
                              <v-col>
                                <v-radio label="NO" value="NO"></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="3">
                          <div class="text-body-1">Passing Criteria*</div>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field append-icon="mdi-percent-outline" hide-details type="number" outlined required
                            class="rounded-xl green" solo flat v-model.number="screeningConfiguration.passingCriteria
                              "></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <div class="text-body-1 my-4">
                            Assessment Time Up First Reminder
                          </div>
                          <v-select v-model="screeningConfiguration.timeUpFirstReminder" hide-details
                            label="Choose First Reminder Time" :items="[1, 2, 3, 4, 5]" outlined class="rounded-xl">
                          </v-select>
                        </v-col>
                        <v-col cols="6">
                          <div class="text-body-1 my-4">
                            Assessment Time Up Last Reminder
                          </div>
                          <v-select v-model="screeningConfiguration.timeUpLastReminder" hide-details
                            label="Choose Last Reminder Time" :items="[1, 2, 3, 4, 5]" outlined class="rounded-xl">
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-form>
                  <v-card elevation="0">
                    <v-card-text>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-btn v-if="scrBtnShow" class="ma-4" @click="expandAndCollMethod"
                          text>{{ screeningBtnValue() }}</v-btn>
                      </v-row>

                      <v-expansion-panels v-model="screenPanel" popout multiple>
                        <v-expansion-panel v-for="(skill, index) in skillQuestions" :key="index">
                          <v-expansion-panel-header>{{
                            skill.name
                          }}</v-expansion-panel-header>
                          <v-expansion-panel-content v-for="(question, i) in skill.questions" :key="i">
                            <v-card>
                              <v-card-subtitle class="pb-0">
                                <div class="d-flex justify-space-between flex-row">
                                  <div>
                                    {{ question.question_type }}
                                  </div>
                                  <v-btn elevation="0" @click="replaceQuestion(question)">Replace</v-btn>
                                </div>
                              </v-card-subtitle>
                              <v-card-title class="pt-0">
                                {{ question.statement }}
                              </v-card-title>
                              <v-card-text>
                                <p>Options</p>
                                <v-row justify="start">
                                  <div v-for="(
                                      option, inx
                                    ) in question.question_options" :key="inx">
                                    <v-chip class="ma-2">{{
                                      option.option_value
                                    }}</v-chip>
                                  </div>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel v-for="(skill, index) in mainsQuestions" :key="index">
                          <v-expansion-panel-header>{{
                            skill.name
                          }}</v-expansion-panel-header>
                          <v-expansion-panel-content v-for="(question, i) in skill.questions" :key="i">
                            <v-card>
                              <v-card-subtitle class="pb-0">
                                <div class="d-flex justify-space-between flex-row">
                                  <div>
                                    {{ question.question_type }}
                                  </div>
                                  <v-btn elevation="0" @click="replaceQuestionMains(question)">Replace</v-btn>
                                </div>
                              </v-card-subtitle>
                              <v-card-title class="pt-0">
                                {{ question.statement }}
                              </v-card-title>
                              <v-card-text>
                                <p>Options</p>
                                <v-row justify="start">
                                  <div v-for="(
                                      option, inx
                                    ) in question.question_options" :key="inx">
                                    <v-chip class="ma-2">{{
                                      option.option_value
                                    }}</v-chip>
                                  </div>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                      </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-form>
                  <v-row>
                    <v-col cols="6">
                      <v-card elevation="0">
                        <v-card-title> Mobile App </v-card-title>
                        <v-card-title>
                          <v-img src="../assets/phone.png" height="60vh" contain></v-img>
                        </v-card-title>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card elevation="0">
                        <v-card-title> Web App </v-card-title>
                        <v-card-title>
                          <v-img src="../assets/web.png" height="60vh" contain></v-img>
                        </v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">{{ successMessage }}</p>
            <v-btn class="primary" large width="157px" rounded @click="successDialog = false">OK</v-btn>
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
            <v-btn class="primary" large width="157px" rounded @click="errorDialog = false">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- ASSESSMENT PUBLISH CONFORMATION POP UP -->
    <v-dialog v-model="publishDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0 ">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-notebook-check-outline</v-icon></v-avatar>

            <p class="text-h5 pt-4 pb-0">Publish Results</p>
            <p class="text-disabled grey--text text-subtitle-1 mb-4" color="rgba(0, 0, 0, 0.6)" disabled>
              This action will publish the assessment results. This cannot be undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn depressed class="secondary black--text" large width="157px" rounded
                @click="publishDialog = false">CANCEL</v-btn>
              <v-btn class="black white--text" depressed large width="157px" rounded
                @click="publishResults(publishData.id, publishData.assessmentType)">Publish</v-btn>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="approveDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-notebook-check-outline</v-icon></v-avatar>

            <p class="text-h5 pt-4 pb-0">Publish Assessment</p>
            <p class="text-disabled grey--text text-subtitle-1 mb-4" color="rgba(0, 0, 0, 0.6)" disabled>
              This action will make the assessment live. This cannot be undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn depressed class="secondary black--text" large width="157px" rounded
                @click="approveDialog = false">CANCEL</v-btn>
              <v-btn class="black white--text" depressed large width="157px" rounded
                @click="ApproveAssessment(current_assessment)">Publish</v-btn>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>


    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>

            <p class="text-h5 pt-4 pb-0">Delete Assessment</p>
            <p class="text-disabled grey--text text-subtitle-1" color="rgba(0, 0, 0, 0.6)" disabled>
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn depressed class="secondary black--text" large width="157px" rounded
                @click="deleteDialog = false">CANCEL</v-btn>
              <v-btn class="black white--text" depressed large width="157px" rounded
                @click="deleteAssessment(selectedId)">DELETE</v-btn>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Add Subject Dialog Screening-->
    <v-dialog max-width="550px" v-model="subjectDialog" center>
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title class="secondary mb-8">Add Subject</v-card-title>

          <v-container>
            <v-card-text>
              <v-row v-for="(subjectField, index) in selectedSubjects" :key="index">
                <v-col fluid class="py-0" cols="6">
                  <div class="font-weight-medium">Subject</div>
                  <v-select v-model.number="subjectField.subject_id" clearable deletable-chips
                    label="Select or Search Subject" outlined class="rounded-xl" :items="selectedSkillSubjects"
                    item-text="name" item-value="id">
                  </v-select>
                </v-col>
                <v-col fluid class="py-0" cols="4">
                  <div class="font-weight-medium">Number of Questions*</div>
                  <v-text-field v-model.number="subjectField.no_of_questions" hide-details type="number" outlined
                    class="rounded-xl green" solo flat :rules="[rules.required]" required></v-text-field>
                </v-col>

                <v-col class="pr-5 mb-5" align-self="center" cols="2" v-if="selectedSubjects.length > 1">
                  <v-btn @click="deleteSubjectField(index)" text color="blue">
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="start" align="center" class="px-2 blue--text" @click="addSubjectField">
                <v-icon large>mdi-plus-circle-outline</v-icon>
                <v-btn class="pl-0" text x-large color="blue">Add New Subject</v-btn>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-6 pb-6">
              <v-btn rounded outlined class="pa-4" @click="() => {
                  subjectDialog = false;
                }
                ">Cancel</v-btn>
              <v-btn rounded class="primary pa-4" @click="addSubjectsToSkill">Apply</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- Add Subject Dialog Mains-->
    <v-dialog max-width="550px" v-model="MainsDialog" center>
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title class="secondary mb-8">Add Subject</v-card-title>

          <v-container>
            <v-card-text>
              <v-row v-for="(subjectField, index) in selectedSubjectsMains" :key="index">
                <v-col fluid class="py-0" cols="6">
                  <div class="font-weight-medium">Subject</div>
                  <v-select v-model.number="subjectField.subject_id" clearable deletable-chips
                    label="Select or Search Subject" outlined class="rounded-xl" :items="selectedSkillSubjectsMains"
                    item-text="name" item-value="id">
                  </v-select>
                </v-col>
                <v-col fluid class="py-0" cols="4">
                  <div class="font-weight-medium">Number of Questions*</div>
                  <v-text-field v-model.number="subjectField.no_of_questions" hide-details type="number" outlined
                    class="rounded-xl green" solo flat :rules="[rules.required]" required></v-text-field>
                </v-col>

                <v-col class="pr-5 mb-5" align-self="center" cols="2" v-if="selectedSubjectsMains.length > 1">
                  <v-btn @click="deleteSubjectFieldMains(index)" text color="blue">
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="start" align="center" class="px-2 blue--text" @click="addSubjectFieldMains">
                <v-icon large>mdi-plus-circle-outline</v-icon>
                <v-btn class="pl-0" text x-large color="blue">Add New Subject</v-btn>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-6 pb-6">
              <v-btn rounded outlined class="pa-4" @click="MainsDialog = false">Cancel</v-btn>
              <v-btn rounded class="primary pa-4" @click="addSubjectsToSkillMains">Apply</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- filter dialog-->
    <v-dialog v-model="filterDialog" max-width="400px">
      <v-card width="400px" height="100%">
        <v-card-text class="pa-6">
          <v-row>
            <v-col>
              <div class="pl-1 text-body1 font-weight-bold">FILTER</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <div @click="clearFilter" class="text-body1 font-weight-bold black--text cursor">
                CLEAR FILTER
              </div>
            </v-col>
          </v-row>
          <div>
            <v-card height="450px" elevation="0" id="myScroll" class="pt-5 ,pb-5">
              <v-row class="pl-1">
                <v-col>
                  <div class="text-body1 font-weight-normal black--text">
                    Skills
                  </div>
                </v-col>
              </v-row>
              <v-chip-group v-model="selectedSkillsFilter" active-class="primary" column :multiple="true">
                <v-chip v-for="(skillType, index) in skillsList" :key="index" :value="skillType" elevated>
                  {{ skillType.name }}
                </v-chip>
              </v-chip-group>
            </v-card>
            <div>
              <v-card-actions class="px-6 pb-6">
                <v-spacer></v-spacer>
                <v-btn rounded outlined class="pa-4" @click="filterDialog = false">Cancel</v-btn>
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
import QuestionsController from '@/controllers/QuestionsController';
import AuthService from "@/services/AuthService";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  name: "AssessmentView",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
      },
      approveDialog: false,
      current_assessment: null,
      successMessage: 'New Assessment Created',
      isEdit: false,
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
      screenPanel: [],
      e1: 1,
      showUsers: false,
      cleared: [],
      inProgress: [],
      notCleared: [],
      yetToAttempt: [],
      name: "",
      scrBtnShow: false,
      screeningItem: 0,
      mainItem: 0,
      assessmentUsers: [],
      screeningMainsUser: "true",
      instructions: "",
      filterDialog: false,
      mainPanel: [],
      mainBtnShow: false,
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
      deleteId: null,
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
        { text: "Cluser", value: "cluser" },
        { text: "Brand", value: "score_type" },
        { text: "Status", value: "screening_status" },
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
  computed: {
    user() {
      return AuthService.getLoggedUser();
    },
    user_permission() {
      return AuthService.getPermissions();
    },
  },
  methods: {
    showDialog(assessment_id) {
      this.current_assessment = assessment_id;
      this.approveDialog = true;
    },
    screeningBtnValue() {
      return this.screenPanel.length === 0 ? "EXPAND" : "COLLAPSE";
    },
    expandAndCollMethod() {
      return this.screenPanel.length === 0 ? this.screenPanel = [...Array(this.screeningItem).keys()].map((k, i) => i) : this.screenPanel = [];
    },
    mainBtnValue() {
      return this.mainPanel.length === 0 ? "EXPAND" : "COLLAPSE";
    },
    mainExpandAndCollMethod() {
      return this.mainPanel.length === 0 ? this.mainPanel = [...Array(this.mainItem).keys()].map((k, i) => i) : this.mainPanel = [];
    },

    async getAssesmentDetails(data) {
      console.log(data);
      this.name = data.name;
      this.instructions = data.instructions;
      this.screeningConfiguration.skillsFields = data.assessment_configurations[0].skill_distributions;
      this.screeningConfiguration.difficultyLevel = data.assessment_configurations[0].difficulty_level
      this.screeningConfiguration.totalNumberQuestions = data.assessment_configurations[0].total_no_of_questions
      this.screeningConfiguration.teachingLevel = data.assessment_configurations[0].level_id
      this.screeningConfiguration.correctAnswerScore = data.assessment_configurations[0].correct_score_answer
      this.screeningConfiguration.negativeMarking = data.assessment_configurations[0].negative_marking
      this.screeningConfiguration.assessmentDuration = data.assessment_configurations[0].duration_of_assessment
      this.screeningConfiguration.randomizeQuestions = data.assessment_configurations[0].randomize_questions
      this.screeningConfiguration.shuffleOptions = data.assessment_configurations[0].shuffle_questions
      this.screeningConfiguration.displayCorrectAnswer = data.assessment_configurations[0].display_correct_answer
      this.screeningConfiguration.displayResult = data.assessment_configurations[0].display_result
      this.screeningConfiguration.passingCriteria = data.assessment_configurations[0].passing_criteria
      this.screeningConfiguration.timeUpFirstReminder = data.assessment_configurations[0].time_up_first_remainder
      this.screeningConfiguration.timeUpLastReminder = data.assessment_configurations[0].time_up_last_remainder
      this.assessment_type = data.assessment_configurations[0].assessment_type
      this.assessmentId = data.assessment_configurations[0].assessment_id
      this.dialog = true;
      this.isEdit = true;
    },
    publishMethod(id, type) {
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
    async publishResults(assessmentId, type) {
      console.log(assessmentId);
      const response = await AssessmentController.publishResults(assessmentId, type);
      if (response.data.success) {
        this.successMessage = 'Results Published Successfully';
        this.successDialog = true;
      }
      else {
        this.errorDialog = true;
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
      console.log("skill field", skillsField)
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
      if (response.data.success) {
        this.skillQuestions = response.data.data.skill_questions;
        console.log("skill questions", this.skillQuestions);
        this.storingSkillsQuestionIds();
        this.screeningItem = this.skillQuestions.length;
        this.scrBtnShow = true
      }
      else {
        alert(response.data.error)
      }
      //console.log("screening request", response);
    },
    async replaceQuestion(question) {
      const response = await QuestionsController.replaceQuestion(question.id, this.assessmentId);
      if (response.data.success) {
        if (response.data.data) {
          this.skillQuestions = this.skillQuestions.map((skill_q) => {
            return {
              ...skill_q, questions: skill_q.questions.map((q) => {
                if (question.id == q.id) {
                  return response.data.data;
                }
                else {
                  return q;
                }
              })
            }
          })
          const index = this.skillQuestionsIds.findIndex((q) => {
            return q == question.id;
          })
          this.skillQuestionsIds[index] = response.data.data.id;
        }
        else {
          alert('Not found any question to replace');
        }
      }
      else {
        alert(response.data.error);
      }
    },
    async replaceQuestionMains(question) {
      const response = await QuestionsController.replaceQuestion(question.id, this.assessmentId);
      if (response.data.success) {
        if (response.data.data) {
          this.mainsQuestions = this.mainsQuestions.map((skill_q) => {
            return {
              ...skill_q, questions: skill_q.questions.map((q) => {
                if (question.id == q.id) {
                  return response.data.data;
                }
                else {
                  return q;
                }
              })
            }
          })
          const index = this.mainsQuestionsIds.findIndex((q) => {
            return q == question.id;
          })
          this.mainsQuestionsIds[index] = response.data.data.id;
        }
        else {
          alert('Not found any question to replace');
        }
      }
      else {
        alert(response.data.error);
      }
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
      if (response.data.success) {
        this.mainsQuestions = response.data.data.skill_questions;
        console.log("mains questions", this.mainsQuestions);
        this.storingMainsQuestionIds();
        this.mainItem = this.mainsQuestions.length
        this.scrBtnShow = true
      }
      else {
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
      if (this.assessmentId == null) {
        const response = await AssessmentController.createAssessment({
          name: this.name,
          score_type: "ASSESSMENT",
          instructions: this.instructions,
        });

        this.assessmentId = response.data.data.id;
        return response.data.success;
      }
      else {
        const response = await AssessmentController.updateAssessments({
          name: this.name,
          instructions: this.instructions,
        }, this.assessmentId)

        return response.data.success;
      }
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
      if (this.assessment_type == 'SCREENING') {
        response = await AssessmentController.createScreening(payload, this.assessmentId);
        this.getScreeningQuestions();
      }
      else if (this.assessment_type == 'MAINS') {
        response = await AssessmentController.createMains(payload, this.assessmentId);
        this.getMainsQuestions();
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
    fetchAssessmentUsers(assessment) {
      let type = assessment.assessment_configurations[0].assessment_type;
      if (type == 'SCREENING') {
        this.fetchScreeningUsers(assessment.id);
      } else {
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

      if (response.data.success) {
        this.skillsList = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
    },
    cancelClicked() {
      // this.fetchAssessment();
      // this.name = "";
      // this.instructions = "";
      // this.screeningConfiguration.skillsFields = [{ skill_id: null, no_of_questions: 10 }];
      // this.screeningConfiguration.difficultyLevel = null;
      // this.screeningConfiguration.totalNumberQuestions = 40
      // this.screeningConfiguration.teachingLevel = null
      // this.screeningConfiguration.correctAnswerScore = 1
      // this.screeningConfiguration.negativeMarking = 'NO'
      // this.screeningConfiguration.assessmentDuration =  0
      // this.screeningConfiguration.randomizeQuestions = 'NO'
      // this.screeningConfiguration.shuffleOptions = 'NO'
      // this.screeningConfiguration.displayCorrectAnswer = 'NO'
      // this.screeningConfiguration.displayResult = 'NO'
      // this.screeningConfiguration.passingCriteria = 40
      // this.screeningConfiguration.timeUpFirstReminder = null
      // this.screeningConfiguration.timeUpLastReminder = null
      // this.assessment_type = 'SCREENING'
      // this.assessmentId = null
      // this.dialog = false;
      window.location.reload();
    },
    async deleteAssessment(id) {
      const response = await AssessmentController.deleteAssessment(id);
      console.log(response.data);
      if (response.data.success) {
        this.deleteDialog = false;
        this.selected = [];
        this.fetchAssessment();
      }
      else {
        alert(response.data.error)
      }
    },

    async fetchAssessment() {
      const response = await AssessmentController.getAssessments();
      // console.log("response from ", response);   
      if (response.data.success) {
        this.assessments = response.data.data.rows;
        this.assessments.reverse();
      }
      else {
        alert(response.data.error)
      }
      console.log(this.assessments);
    },
    async fetchMainsUsers(id) {
      console.log("mains user clicked");
      this.showUsers = true;
      this.selectedId = id;
      const response = await AssessmentController.getMainsUser(id);

      if (response.data.success) {
        this.assessmentUsers = [];
        this.assessmentUsers = response.data.data.user_assessments;
        if (this.assessmentUsers != undefined) {
          this.filterData();
        }
        console.log("filter data", this.assessmentUsers);
      }
      else {
        alert(response.data.error)
      }
    },
    async fetchScreeningUsers(id) {
      console.log("screening clicked");
      this.showUsers = true;
      this.selectedId = id;
      const response = await AssessmentController.getScreeningUser(id);

      if (response.data.success) {
        this.assessmentUsers = response.data.data.user_assessments;
        this.filterData();

        // console.log(this.assessmentUsers);
      }
      else {
        alert(response.data.error)
      }
    },

    async getLevels() {
      const response = await LevelController.getLevel();

      if (response.data.success) {
        this.levels = response.data.data.rows;
        // console.log(this.assessmentUsers);
      }
      else {
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

    async ApproveAssessment(assessment_id) {
      const response = await AssessmentController.updateAssessments(
        {
          status: 'PUBLISHED',
        },
        assessment_id
      );

      if (response.data.success) {
        this.approveDialog = false;
        this.fetchAssessment();
      }
      else {
        alert(response.data.error)
        return false;
      }
    },

    async Assessmentsupdate() {
      const response = await AssessmentController.updateAssessments(
        {
          name: this.name,
          screening_question_ids: this.skillQuestionsIds,
          mains_question_ids: this.mainsQuestionsIds,
          status: 'DRAFT',
        },
        this.assessmentId
      );
      console.log(response);
      window.location.reload();
      if (response.data.success) {
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
  