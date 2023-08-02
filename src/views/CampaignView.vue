<template>
  <v-container fluid class="pa-8 secondary">
    <!-- sucess dialog -->
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">New Campaign {{ campaignButtonValues() }}</p>
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
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-icon size="70" class="pt-4">mdi-trash-can-outline</v-icon>
            <p class="text-h5 pt-4 pb-0">Delete Campaign</p>
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
                @click="deleteCampaign(selectedId)"
                depressed
                large
                width="157px"
                rounded
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" fullscreen hide-overlay>
      <v-card class="secondary pa-6" elevation="0" depressed>
        <div class="d-flex justify-space-between">
          <v-toolbar-title class="text-h5 ml-6 d-flex align-center"
            >{{ campaignButtonValue() }} Campaign - Internal Staff</v-toolbar-title
          >
          <div class="mr-6">
            <v-btn text rounded @click="dialog = false">Cancel</v-btn>
            <v-btn outlined rounded @click="e1 = e1 - 1">back</v-btn>

            <v-btn rounded color="primary" class="my-4 ml-4" @click="goto(e1)">
              {{ e1 == 3 ?  campaignButtonValue()  : "next" }}
            </v-btn>
          </div>
        </div>

        <v-stepper v-model="e1" class="secondary" depressed elevation="0">
          <v-stepper-header class="mx-6 white rounded-xl">
            <v-stepper-step :complete="e1 > 1" step="1">
              Campaign Details
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Add assessment
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Review </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="secondary pt-1" elevation="0" depressed>
            <!------------------------------------------ STEP 1 ------------------------------------------>
            <v-stepper-content step="1">
              <v-form ref="step1" lazy-validation>
                <v-card elevation="0" depressed color="transparent">
                  <v-card-text class="pa-0">
                    <v-card
                      class="my-4 pa-4 rounded-xl"
                      elevation="0"
                      depressed
                    >
                      <v-row class="py-0">
                        <v-col class="py-0">
                          <div class="text-body-1 my-2">Campaign Name*</div>
                          <v-text-field
                            outlined
                            class="rounded-xl"
                            solo
                            flat
                            label="Enter Campaign Name*"
                            :rules="[(v) => !!v || 'Campaign Name is required']"
                            required
                            v-model="campaignData.name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col class="py-0">
                          <v-row>
                            <v-col cols="6">
                              <div class="text-body-1 my-4">
                                Availability (Start Date)*
                              </div>
                              <v-text-field
                                outlined
                                label="Start Date"
                                rounded
                                class="rounded-xl"
                                type="date"
                                v-model="campaignData.start_date"
                                :rules="[
                                  (v) => !!v || 'Start Date is required',
                                ]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <div class="text-body-1 my-4">
                                Availability (Start Time)*
                              </div>
                              <v-row>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    v-model="startHH"
                                    outlined
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    :rules="[(v) => !!v || 'Hrs is required']"
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Hrs</span>
                                </v-col>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    v-model="startMM"
                                    outlined
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    :rules="[(v) => !!v || 'Min is required']"
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Min</span>
                                </v-col>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    outlined
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Sec</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col class="py-0">
                          <v-row>
                            <v-col cols="6">
                              <div class="text-body-1 my-4">
                                Availability Until (Date)*
                              </div>
                              <v-text-field
                                outlined
                                label="Start Date"
                                v-model="campaignData.end_date"
                                rounded
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'Until Date is required',
                                ]"
                                type="date"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <div class="text-body-1 my-4">
                                Availability Until (Time)*
                              </div>
                              <v-row>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    outlined
                                    v-model="endHH"
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    :rules="[(v) => !!v || 'Hrs is required']"
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Hrs</span>
                                </v-col>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    v-model="endMM"
                                    outlined
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    :rules="[(v) => !!v || 'Min is required']"
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Min</span>
                                </v-col>
                                <v-col
                                  cols="4"
                                  md="4"
                                  sm=""
                                  class="d-flex flex-row align-end"
                                >
                                  <v-text-field
                                    hide-details
                                    type="number"
                                    outlined
                                    class="rounded-xl green"
                                    solo
                                    flat
                                    required
                                  ></v-text-field
                                  ><span class="ml-2">Sec</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-card class="my-4 pa-4 rounded-xl" depressed elevaty>
                      <v-row class="py-0 px-0">
                        <v-col cols="6">
                          <div class="text-body-1">Skills*</div>
                          <v-autocomplete
                            clearable
                            deletable-chips
                            label="select Skills"
                            outlined
                            :rules="[(v) => !!v || 'Skills is required']"
                            required
                            v-model="campaignData.skill_ids"
                            class="rounded-xl"
                            small-chips
                            :items="skills"
                            multiple
                            item-text="name"
                            item-value="id"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <div class="text-body-1">Subjects*</div>
                          <v-autocomplete
                            clearable
                            deletable-chips
                            label="Choose Subjects"
                            outlined
                            v-model="campaignData.subject_ids"
                            :rules="[(v) => !!v || 'Subject is required']"
                            class="rounded-xl"
                            small-chips
                            :items="subjects"
                            multiple
                            item-text="name"
                            item-value="id"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row class="py-0 px-0">
                        <v-col cols="6">
                          <div class="text-body-1">Levels*</div>
                          <v-autocomplete
                            clearable
                            deletable-chips
                            label="Choose Levels"
                            outlined
                            v-model="campaignData.level_ids"
                            required
                            :rules="[(v) => !!v || 'Level is required']"
                            class="rounded-xl"
                            small-chips
                            :items="levels"
                            multiple
                            item-text="name"
                            item-value="id"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <div class="text-body-1">Clusters*</div>
                          <v-autocomplete
                            clearable
                            deletable-chips
                            label="Choose Clusters"
                            outlined
                            v-model="campaignData.cluster_ids"
                            required
                            :rules="[(v) => !!v || 'Cluster is required']"
                            class="rounded-xl"
                            small-chips
                            :items="clusters"
                            multiple
                            item-text="name"
                            item-value="id"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row class="py-0 px-0">
                        <v-col cols="6">
                          <div class="text-body-1">Schools*</div>
                          <v-autocomplete
                            clearable
                            deletable-chips
                            label="Choose Schools"
                            outlined
                            v-model="campaignData.school_ids"
                            required:rules="[v => !!v || 'School is required']"
                            class="rounded-xl"
                            small-chips
                            :items="schools"
                            multiple
                            item-text="name"
                            item-value="id"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="6"> </v-col>
                      </v-row>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-stepper-content>
            <!------------------------------------------ STEP 2 ------------------------------------------>
            <v-stepper-content step="2">
              <v-form ref="step2" lazy-validation>
                <v-row class="py-0">
                  <v-col class="py-0">
                    <v-row>
                      <v-col cols="12" md="12">
                        <div class="text-body-1 my-4">
                          Add Existing Assessment*
                        </div>
                        <v-autocomplete
                        v-model="campaignData.assessment_ids"
                          required
                          :rules="[v => !!v || 'assessment is required']"
                          clearable
                          deletable-chips
                          label="Select or Search Assessments"
                          outlined
                          attach=""
                          class="rounded-xl"
                          small-chips
                          :items="assessments"
                          multiple
                          item-text="name"
                          item-value="id"
                        >
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                    class="d-flex justify-center align-center"
                  >
                    OR
                  </v-col>
                </v-row>
  
                <v-card
                  elevation="0"
                  depressed
                  width="100%"
                  class="rounded-xl pa-4"
                >
                  <v-row>
                    <v-col
                      cols="6"
                      md="6"
                      class="d-flex justify-space-between align-center"
                      v-if="((user_permission.assessments && user_permission.assessments.panel && user_permission.assessments.panel.create) || user.role_type == 'SUPER_ADMIN')"
                    >
                      <span>Create new assessment*</span>
                      <v-btn
                        rounded
                        class="mx-4 my-4"
                        color="primary"
                        @click="goToAssessment()"
                      >
                        Create New Assessment
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>
              
            </v-stepper-content>
            <!------------------------------------------ STEP 3 ------------------------------------------>
            <v-stepper-content step="3">
              <v-form>
                <v-row>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title> Mobile App </v-card-title>
                      <v-card-title>
                        <v-img
                          src="../assets/phone.png"
                          height="60vh"
                          contain
                        ></v-img>
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title> Web App </v-card-title>
                      <v-card-title>
                        <v-img
                          src="../assets/web.png"
                          height="60vh"
                          contain
                        ></v-img>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
    <!-- first row -->
    <!-- <div class="d-flex w-100 flex-row justify-space-between">
      <div class="ma-0 pa-0">
        <span class="cursor">Campaign</span>
        <v-icon>mdi-chevron-right</v-icon>

        <select @change="() => {}">
          <option>Internal Staff Campaign</option>
          <option>Job Seeker Campaign</option>
        </select>
      </div>
      <div width="600px">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
    </div> -->

    <!-- second row -->
    <!-- <v-row justify="space-between" class="my-0">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">All Campaigns</div>
      </v-col>
      <v-col cols="8" sm="8" class="d-flex justify-end">
        <div>
          <v-btn class="primary white--text mx-2" rounded-lg
            ><v-icon>mdi-tune</v-icon>Filter</v-btn
          >
          <v-btn class="primary white--text mx-2" rounded-lg
            ><v-icon>mdi-export</v-icon>Export</v-btn
          >
        </div>
      </v-col>
    </v-row> -->

    <v-row cols="12" sm="12" md="" class="ma-0 pa-0 f-flex align-center" >
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
              v-on:click="campaignFilter('TEACHER')"
            >
              All
            </v-tab>

            <v-tab
              active-class=" white ma-1 black--text text-transform-cap"
              class="rounded  text-transform-cap"
              v-on:click="campaignFilter('TEACHER')"
            >
              Internal Teacher
            </v-tab>

            <v-tab
              active-class=" white ma-1 black--text "
              class="rounded text-transform-cap"
              v-on:click="campaignFilter('JOB_SEEKER')"
            >
              Job Seeker
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <!-- <v-col cols="6" sm="6" class="d-flex justify-end">
        <div>
          <v-btn class="purple-button-light lightPurple purple-button-light-height-large mx-2"  elevation="0" rounded @click="filterDialog = true"><v-icon>mdi-tune</v-icon>Filter</v-btn>
          <v-btn class="purple-button-light lightPurple purple-button-light-height-large mx-2" elevation="0" rounded><v-icon>mdi-export</v-icon>Export</v-btn>
        </div>
      </v-col> -->
    </v-row>


    <v-row cols="12" sm="12" md="" class="ma-0 pa-0 f-flex align-center">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">Live Campaign's ({{ this.liveCampaigns.length }})</div>
      </v-col>

      <v-col cols="8" sm="8" class="d-flex justify-end align-center">
        <v-icon color="#06C270CC" class="mr-2 ml-4">mdi-circle</v-icon> Assessed
        <v-icon class="mr-2 ml-4" color="#1B72E8B2">mdi-circle</v-icon> In
        progress
        <v-icon class="mr-2 ml-4" color="#0000001F">mdi-circle</v-icon>
        Yet to attempt
      </v-col>
    </v-row>
    <div
      class="d-flex flex-row pb-4"
      id="myScroll-x"
      v-if="this.liveCampaigns.length > 0"
    >
      <!-- campaign card  -->
      <v-card
        width="315px"
        min-width="312px"
        height="auto"
        class="pa-5 ml-4 overflow-hidden"
        v-for="(data, i) in this.liveCampaigns"
        :key="i"
      >
        <!-- <div
          class="d-flex align-center justify-center"
          :class="
            data.audience_type == 'TEACHER'
              ? 'tiled-title-teacher'
              : 'tiled-title-job-seeker'
          "
        >
          {{ data.audience_type == 'TEACHER' ? 'VGOS' :data.audience_type }}
        </div> -->
        <v-chip class="live pa-3">
          <img src="../assets/radar.svg" class="mr-1" alt="question Icon" />
          Live
        </v-chip>

        <div class="d-flex flex-column">
          <v-card-title class="pa-0 font-size-16">
            {{ data.name }}
          </v-card-title>
          <div class="my-1 ">
            <!-- Assessment title --> 
            <div class="d-flex" v-if="data.levels.length > 0">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16.5 12.5543V3.50179C16.5 2.60179 15.765 1.93429 14.8725 2.00929H14.8275C13.2525 2.14429 10.86 2.94679 9.525 3.78679L9.3975 3.86929C9.18 4.00429 8.82 4.00429 8.6025 3.86929L8.415 3.75679C7.08 2.92429 4.695 2.12929 3.12 2.00179C2.2275 1.92679 1.5 2.60179 1.5 3.49429V12.5543C1.5 13.2743 2.085 13.9493 2.805 14.0393L3.0225 14.0693C4.65 14.2868 7.1625 15.1118 8.6025 15.8993L8.6325 15.9143C8.835 16.0268 9.1575 16.0268 9.3525 15.9143C10.7925 15.1193 13.3125 14.2868 14.9475 14.0693L15.195 14.0393C15.915 13.9493 16.5 13.2743 16.5 12.5543Z" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 4.11719V15.3672" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.8125 6.36719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.375 8.61719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="font-size-14">

                {{ data.levels.join(', ') }}

              </span>
            </div>
            <div class="d-flex">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14.25 3H12.75V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V3H6.75V2.25C6.75 2.05109 6.67098 1.86032 6.53033 1.71967C6.38968 1.57902 6.19891 1.5 6 1.5C5.80109 1.5 5.61032 1.57902 5.46967 1.71967C5.32902 1.86032 5.25 2.05109 5.25 2.25V3H3.75C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H14.25C14.8467 16.5 15.419 16.2629 15.841 15.841C16.2629 15.419 16.5 14.8467 16.5 14.25V5.25C16.5 4.65326 16.2629 4.08097 15.841 3.65901C15.419 3.23705 14.8467 3 14.25 3ZM15 14.25C15 14.4489 14.921 14.6397 14.7803 14.7803C14.6397 14.921 14.4489 15 14.25 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V9H15V14.25ZM15 7.5H3V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H5.25V5.25C5.25 5.44891 5.32902 5.63968 5.46967 5.78033C5.61032 5.92098 5.80109 6 6 6C6.19891 6 6.38968 5.92098 6.53033 5.78033C6.67098 5.63968 6.75 5.44891 6.75 5.25V4.5H11.25V5.25C11.25 5.44891 11.329 5.63968 11.4697 5.78033C11.6103 5.92098 11.8011 6 12 6C12.1989 6 12.3897 5.92098 12.5303 5.78033C12.671 5.63968 12.75 5.44891 12.75 5.25V4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25V7.5Z" fill="#7B7A7B"/>
                </svg>
              </span>
              <span class="font-size-14">{{ data.start_date }} <strong>To</strong> {{ data.end_date }}</span>
            </div>

            <div class="d-flex">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16.5 12.5543V3.50179C16.5 2.60179 15.765 1.93429 14.8725 2.00929H14.8275C13.2525 2.14429 10.86 2.94679 9.525 3.78679L9.3975 3.86929C9.18 4.00429 8.82 4.00429 8.6025 3.86929L8.415 3.75679C7.08 2.92429 4.695 2.12929 3.12 2.00179C2.2275 1.92679 1.5 2.60179 1.5 3.49429V12.5543C1.5 13.2743 2.085 13.9493 2.805 14.0393L3.0225 14.0693C4.65 14.2868 7.1625 15.1118 8.6025 15.8993L8.6325 15.9143C8.835 16.0268 9.1575 16.0268 9.3525 15.9143C10.7925 15.1193 13.3125 14.2868 14.9475 14.0693L15.195 14.0393C15.915 13.9493 16.5 13.2743 16.5 12.5543Z" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 4.11719V15.3672" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.8125 6.36719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.375 8.61719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="font-size-14"> {{ data.campaign_assessments.length }} Assessments</span>
            </div>

            <div class="mb-1">
              <div class="d-flex justify-space-between">
                <v-chip class="my-clear font-size-10 v-chip-custom"
                  >{{ data.assessed }} Assessed</v-chip
                >
                <v-chip class="my-progress font-size-10 v-chip-custom"
                  >0 In progress</v-chip
                >
                <v-chip class="my-notcleared font-size-10 v-chip-custom"
                  >{{ data.yet_to_attempt }} Yet to Attempt</v-chip
                >
              </div>
            </div>


            <div class="d-flex mt-2 justify-space-between card-image align-center" v-if="((user_permission.campaigns && user_permission.campaigns.panel && user_permission.campaigns.panel.update) || user.role_type == 'SUPER_ADMIN')">
              <v-card-title
                class="pa-0 cursor roletype publish purple-button-light"
                @click="roleUpdate(data)" 
                >
                <span class="mt-2 me-3 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.3335 12.0006H6.16016C6.2479 12.0011 6.33488 11.9843 6.4161 11.9511C6.49733 11.9179 6.5712 11.8691 6.6335 11.8073L11.2468 7.18728L13.1402 5.33394C13.2026 5.27197 13.2522 5.19823 13.2861 5.11699C13.3199 5.03576 13.3374 4.94862 13.3374 4.86061C13.3374 4.7726 13.3199 4.68547 13.2861 4.60423C13.2522 4.52299 13.2026 4.44925 13.1402 4.38728L10.3135 1.52728C10.2515 1.46479 10.1778 1.4152 10.0965 1.38135C10.0153 1.3475 9.92817 1.33008 9.84016 1.33008C9.75216 1.33008 9.66502 1.3475 9.58378 1.38135C9.50254 1.4152 9.42881 1.46479 9.36683 1.52728L7.48683 3.41394L2.86016 8.03394C2.79838 8.09624 2.74949 8.17011 2.71632 8.25134C2.68314 8.33256 2.66632 8.41954 2.66683 8.50728V11.3339C2.66683 11.5108 2.73707 11.6803 2.86209 11.8053C2.98712 11.9304 3.15669 12.0006 3.3335 12.0006ZM9.84016 2.94061L11.7268 4.82728L10.7802 5.77394L8.8935 3.88728L9.84016 2.94061ZM4.00016 8.78061L7.9535 4.82728L9.84016 6.71394L5.88683 10.6673H4.00016V8.78061ZM14.0002 13.3339H2.00016C1.82335 13.3339 1.65378 13.4042 1.52876 13.5292C1.40373 13.6542 1.3335 13.8238 1.3335 14.0006C1.3335 14.1774 1.40373 14.347 1.52876 14.472C1.65378 14.597 1.82335 14.6673 2.00016 14.6673H14.0002C14.177 14.6673 14.3465 14.597 14.4716 14.472C14.5966 14.347 14.6668 14.1774 14.6668 14.0006C14.6668 13.8238 14.5966 13.6542 14.4716 13.5292C14.3465 13.4042 14.177 13.3339 14.0002 13.3339Z" fill="#6E56CF"/>
                  </svg>
                </span>Edit
              </v-card-title>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6.87988 18.1501V16.0801" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12 18.1498V14.0098" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M17.1201 18.1497V11.9297" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M17.1199 5.84961L16.6599 6.38961C14.1099 9.36961 10.6899 11.4796 6.87988 12.4296" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M14.1899 5.84961H17.1199V8.76961" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
            </div>


          </div>
        </div>
      </v-card>
      <!-- campaign card ending here           -->
    </div>
    <!-- campaign scroll view ending here -->

    <v-row cols="12" sm="12" md="" class="ma-0 pa-0 f-flex align-center">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">Scheduled Campaign's ({{ this.scheduledCampaigns.length }})</div>
      </v-col>
    </v-row>


    <div
      class="d-flex flex-row pb-4"
      id="myScroll-x"
      v-if="this.scheduledCampaigns.length > 0"
    >
      <!-- campaign card  -->
      <v-card
        width="315px"
        min-width="312px"
        height="auto"
        class="pa-5 ml-4 overflow-hidden"
        v-for="(data, i) in this.scheduledCampaigns"
        :key="i"
      >
        <!-- <div
          class="d-flex align-center justify-center"
          :class="
            data.audience_type == 'TEACHER'
              ? 'tiled-title-teacher'
              : 'tiled-title-job-seeker'
          "
        >
          {{ data.audience_type == 'TEACHER' ? 'VGOS' :data.audience_type }}
        </div> -->
        <v-chip class="pa-3">
          <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.00016 15.1673C4.04683 15.1673 0.833496 11.954 0.833496 8.00065C0.833496 4.04732 4.04683 0.833984 8.00016 0.833984C11.9535 0.833984 15.1668 4.04732 15.1668 8.00065C15.1668 11.954 11.9535 15.1673 8.00016 15.1673ZM8.00016 1.83398C4.60016 1.83398 1.8335 4.60065 1.8335 8.00065C1.8335 11.4007 4.60016 14.1673 8.00016 14.1673C11.4002 14.1673 14.1668 11.4007 14.1668 8.00065C14.1668 4.60065 11.4002 1.83398 8.00016 1.83398Z" fill="#292D32"/>
            <path d="M10.4736 10.6192C10.3869 10.6192 10.3003 10.5992 10.2203 10.5459L8.15359 9.31253C7.64025 9.00586 7.26025 8.33253 7.26025 7.73919V5.00586C7.26025 4.73253 7.48692 4.50586 7.76025 4.50586C8.03359 4.50586 8.26025 4.73253 8.26025 5.00586V7.73919C8.26025 7.97919 8.46025 8.33253 8.66692 8.45253L10.7336 9.68586C10.9736 9.82586 11.0469 10.1325 10.9069 10.3725C10.8069 10.5325 10.6403 10.6192 10.4736 10.6192Z" fill="#292D32"/>
          </svg>
          Scheduled
        </v-chip>

        <div class="d-flex flex-column">
          <v-card-title class="pa-0 font-size-16">
            {{ data.name }}
          </v-card-title>
          <div class="my-1 ">
            <!-- Assessment title --> 
            <div class="d-flex" v-if="data.levels.length > 0">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16.5 12.5543V3.50179C16.5 2.60179 15.765 1.93429 14.8725 2.00929H14.8275C13.2525 2.14429 10.86 2.94679 9.525 3.78679L9.3975 3.86929C9.18 4.00429 8.82 4.00429 8.6025 3.86929L8.415 3.75679C7.08 2.92429 4.695 2.12929 3.12 2.00179C2.2275 1.92679 1.5 2.60179 1.5 3.49429V12.5543C1.5 13.2743 2.085 13.9493 2.805 14.0393L3.0225 14.0693C4.65 14.2868 7.1625 15.1118 8.6025 15.8993L8.6325 15.9143C8.835 16.0268 9.1575 16.0268 9.3525 15.9143C10.7925 15.1193 13.3125 14.2868 14.9475 14.0693L15.195 14.0393C15.915 13.9493 16.5 13.2743 16.5 12.5543Z" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 4.11719V15.3672" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.8125 6.36719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.375 8.61719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="font-size-14">

                {{ data.levels.join(', ') }}

              </span>
            </div>
            <div class="d-flex">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14.25 3H12.75V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V3H6.75V2.25C6.75 2.05109 6.67098 1.86032 6.53033 1.71967C6.38968 1.57902 6.19891 1.5 6 1.5C5.80109 1.5 5.61032 1.57902 5.46967 1.71967C5.32902 1.86032 5.25 2.05109 5.25 2.25V3H3.75C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H14.25C14.8467 16.5 15.419 16.2629 15.841 15.841C16.2629 15.419 16.5 14.8467 16.5 14.25V5.25C16.5 4.65326 16.2629 4.08097 15.841 3.65901C15.419 3.23705 14.8467 3 14.25 3ZM15 14.25C15 14.4489 14.921 14.6397 14.7803 14.7803C14.6397 14.921 14.4489 15 14.25 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V9H15V14.25ZM15 7.5H3V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H5.25V5.25C5.25 5.44891 5.32902 5.63968 5.46967 5.78033C5.61032 5.92098 5.80109 6 6 6C6.19891 6 6.38968 5.92098 6.53033 5.78033C6.67098 5.63968 6.75 5.44891 6.75 5.25V4.5H11.25V5.25C11.25 5.44891 11.329 5.63968 11.4697 5.78033C11.6103 5.92098 11.8011 6 12 6C12.1989 6 12.3897 5.92098 12.5303 5.78033C12.671 5.63968 12.75 5.44891 12.75 5.25V4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25V7.5Z" fill="#7B7A7B"/>
                </svg>
              </span>
              <span class="font-size-14">{{ data.start_date }} <strong>To</strong> {{ data.end_date }}</span>
            </div>

            <div class="d-flex">
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16.5 12.5543V3.50179C16.5 2.60179 15.765 1.93429 14.8725 2.00929H14.8275C13.2525 2.14429 10.86 2.94679 9.525 3.78679L9.3975 3.86929C9.18 4.00429 8.82 4.00429 8.6025 3.86929L8.415 3.75679C7.08 2.92429 4.695 2.12929 3.12 2.00179C2.2275 1.92679 1.5 2.60179 1.5 3.49429V12.5543C1.5 13.2743 2.085 13.9493 2.805 14.0393L3.0225 14.0693C4.65 14.2868 7.1625 15.1118 8.6025 15.8993L8.6325 15.9143C8.835 16.0268 9.1575 16.0268 9.3525 15.9143C10.7925 15.1193 13.3125 14.2868 14.9475 14.0693L15.195 14.0393C15.915 13.9493 16.5 13.2743 16.5 12.5543Z" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 4.11719V15.3672" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.8125 6.36719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.375 8.61719H4.125" stroke="#7B7A7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="font-size-14"> {{ data.campaign_assessments.length }} Assessments</span>
            </div>

            <div class="d-flex mt-2 justify-space-between card-image align-center" v-if="((user_permission.campaigns && user_permission.campaigns.panel && user_permission.campaigns.panel.update) || user.role_type == 'SUPER_ADMIN')">
              <v-card-title
                class="pa-0 cursor roletype publish purple-button-light"
                @click="roleUpdate(data)" 
                >
                <span class="mt-2 me-3 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.3335 12.0006H6.16016C6.2479 12.0011 6.33488 11.9843 6.4161 11.9511C6.49733 11.9179 6.5712 11.8691 6.6335 11.8073L11.2468 7.18728L13.1402 5.33394C13.2026 5.27197 13.2522 5.19823 13.2861 5.11699C13.3199 5.03576 13.3374 4.94862 13.3374 4.86061C13.3374 4.7726 13.3199 4.68547 13.2861 4.60423C13.2522 4.52299 13.2026 4.44925 13.1402 4.38728L10.3135 1.52728C10.2515 1.46479 10.1778 1.4152 10.0965 1.38135C10.0153 1.3475 9.92817 1.33008 9.84016 1.33008C9.75216 1.33008 9.66502 1.3475 9.58378 1.38135C9.50254 1.4152 9.42881 1.46479 9.36683 1.52728L7.48683 3.41394L2.86016 8.03394C2.79838 8.09624 2.74949 8.17011 2.71632 8.25134C2.68314 8.33256 2.66632 8.41954 2.66683 8.50728V11.3339C2.66683 11.5108 2.73707 11.6803 2.86209 11.8053C2.98712 11.9304 3.15669 12.0006 3.3335 12.0006ZM9.84016 2.94061L11.7268 4.82728L10.7802 5.77394L8.8935 3.88728L9.84016 2.94061ZM4.00016 8.78061L7.9535 4.82728L9.84016 6.71394L5.88683 10.6673H4.00016V8.78061ZM14.0002 13.3339H2.00016C1.82335 13.3339 1.65378 13.4042 1.52876 13.5292C1.40373 13.6542 1.3335 13.8238 1.3335 14.0006C1.3335 14.1774 1.40373 14.347 1.52876 14.472C1.65378 14.597 1.82335 14.6673 2.00016 14.6673H14.0002C14.177 14.6673 14.3465 14.597 14.4716 14.472C14.5966 14.347 14.6668 14.1774 14.6668 14.0006C14.6668 13.8238 14.5966 13.6542 14.4716 13.5292C14.3465 13.4042 14.177 13.3339 14.0002 13.3339Z" fill="#6E56CF"/>
                  </svg>
                </span>Edit
              </v-card-title>

              <div cols="2"
                class=""
                  icon
                  @click="
                    deleteDialog = true;
                    selectedId = data.id;
                  ">
                <span> <img src="/img/trash.6e47c54a.svg" alt="" /></span>
              </div>
              
            </div>


          </div>
        </div>
      </v-card>
      <!-- campaign card ending here           -->
    </div>

    <!-- campaign scroll view ending here -->

    <v-row
      justify="space-between"
      class="mb-4 mt-0"
      v-if="this.expiredCampaigns.length > 0"
    >
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">Expired Campaigns ({{ this.expiredCampaigns.length }})</div>
      </v-col>

      <v-col cols="8" sm="8" class="d-flex justify-end align-center">
        <v-icon color="#06C270CC" class="mr-2 ml-4">mdi-circle</v-icon> Passed
        in mains
        <v-icon class="mr-2 ml-4" color="#E16056">mdi-circle</v-icon> Failed in
        mains
        <v-icon class="mr-2 ml-4" color="#0000001F">mdi-circle</v-icon>
        Not attempted mains
      </v-col>
    </v-row>
    <div
      class="d-flex flex-row pb-4"
      id="myScroll-x"
      v-if="this.expiredCampaigns.length > 0"
    >
      <!-- campaign card  -->
      <v-card
        width="373px"
        min-width="427px"
        height="auto"
        class="pa-5 ml-4 overflow-hidden"
        v-for="(data, i) in this.expiredCampaigns"
        :key="i"
      >
        <div
          class="d-flex align-center justify-center"
          :class="
            data.audience_type == 'TEACHER'
              ? 'tiled-title-teacher'
              : 'tiled-title-job-seeker'
          "
        >
          {{ data.audience_type == 'TEACHER'?'VGOS': data.audience_type}}
        </div>
        <v-row>
          <v-spacer></v-spacer>
          <img v-if="((user_permission.campaigns && user_permission.campaigns.panel && user_permission.campaigns.panel.update) || user.role_type == 'SUPER_ADMIN')" width="28px" height="28px"  @click="roleUpdate(data)" class="cursor" src="../assets/edit.svg" />
        </v-row>
        <div class="d-flex flex-column">
          <v-card-title class="pa-0"> {{ data.name }} </v-card-title>
          <div class="my-2 text-subtitle-1">
            <!-- Assessment title -->
            <div
              v-if="data.levels.length > 0"
              class="d-flex flex-row w-100 flex-wrap"
            >
              <div
                v-for="(item, index) in data.levels"
                :key="index"
                class="w-fit"
              >
                <v-chip
                  small
                  class="mr-2"
                  v-if="item != null"
                  color="#9cb9fba1"
                >
                  {{ item }}
                </v-chip>
              </div>
            </div>
            <div class="mt-2">
              <v-icon>mdi-notebook-outline</v-icon>
              {{ data.campaign_assessments.length }} Assessments
            </div>
          </div>
        </div>

        <div>
          <div class="d-flex flex-row my-5 card-sub-text">
            <v-icon class="text-medium-emphasis"
              >mdi-calendar-blank-outline</v-icon
            >
            <div class="d-flex flex-column ml-4">
              <div>From</div>
              <div class="c-date">{{ data.start_date }}</div>
            </div>
            <div class="ml-8 mr-8 d-flex align-center">-</div>
            <div class="d-flex flex-column">
              <div>Till</div>
              <div class="c-date">{{ data.end_date }}</div>
            </div>
          </div>
          <v-card
            class="d-flex flex-row pa-0 ma-0"
            width="100%"
            height="40px"
            color="transparent"
            depressed
            elevation="0"
          >
            <v-card
              class="d-flex flex-row pa-0 ma-0"
              width="100%"
              height="40px"
              color="transparent"
              depressed
              elevation="0"
            >
              <v-card
                class="d-flex flex-row pa-0 ma-0 justify-center rounded-0"
                width="30%"
                height="10px"
                color="#43ff64d9"
                justify-center
                elevation="0"
              >
                <div class="graph-value litegreen">30</div>
              </v-card>
              <v-card
                class="d-flex flex-row pa-0 ma-0 justify-center rounded-0"
                width="20%"
                height="10px"
                color="#E16056"
                elevation="0"
                justify-center
              >
                <div class="graph-value liteblue">20</div>
              </v-card>
              <v-card
              elevation="0"
                class="d-flex flex-row pa-0 ma-0 justify-center rounded-0"
                width="50%"
                height="10px"
                color="#D9D9D9"
                justify-center
              >
                <div class="graph-value">50</div>
              </v-card>
            </v-card>
          </v-card>
        </div>
      </v-card>
      <!-- campaign card ending here           -->
    </div>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="((user_permission.campaigns && user_permission.campaigns.panel && user_permission.campaigns.panel.create) || user.role_type == 'SUPER_ADMIN')"
          class="primary white--text mx-2 m-fab"
          v-bind="attrs"
          v-on="on"
          rounded-lg
          dark
          large
          ><v-icon>mdi-plus</v-icon> Create New CAMPAIGN</v-btn
        >
      </template>
      <v-list>
        <v-list-item @click="role('TEACHER')">
          <v-list-item-title>
            <v-icon>mdi-email-plus-outline</v-icon> FOR INTERNAL STAFF
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="role('JOB_SEEKER')">
          <v-list-item-title >
            <v-icon>mdi-email-plus-outline</v-icon> FOR JOB SEEKERS
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>
  
  
  
<script>
import CampaignController from "@/controllers/CampaignController";
import LevelController from "@/controllers/LevelController";
import AssessmentController from "@/controllers/AssessmentController";

import SchoolController from "@/controllers/SchoolController";
import SkillsController from "@/controllers/SkillsController";

import SubjectController from "@/controllers/SubjectController";
import ClusterController from "@/controllers/ClusterController";
import AuthService from "@/services/AuthService";

export default {
  name: "campaignView",
  data() {
    return {
      dialog: false,
      e1: 1,
      updateFlag:false,
      deleteDialog: false,
      successDialog: false,
      assessments: [],
      selectedId: null,
      skills: [],
      schools: [],
      clusters: [],
      subjects: [],
      campaigns: [],
      levels: [],
      startHH: "",
      startMM: "",
      endHH: "",
      endMM: "",
      liveCampaigns: [],
      scheduledCampaigns: [],
      expiredCampaigns: [],
      campaignId:null,
      campaignData: {
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        audience_type: "",
        cluster_ids: [],
        skill_ids: [],
        subject_ids: [],
        school_ids: [],
        level_ids: [],
        assessment_ids: [],
      },

      rules: {
        required: (value) => !!value || "Field is required",
      },
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
    campaignFilter(type){
      console.log(type);
    },
    getPercentate(value, totalValue) {
      var data = (value / totalValue) * 100;
      data = Math.trunc( data );

      return data;
    },
    campaignButtonValue(){
      return this.updateFlag==true?'Update':'Create'
    },
    campaignButtonValues(){
      return this.updateFlag==true?'Updated':'Created'
    },
    async deleteCampaign(id) {
      const response = await CampaignController.deleteCampaign(id);
     
      if (response.data.success) {
        this.getCampaigns();
        this.deleteDialog = false;
        console.log(response)
      }
      else {
        alert(response.data.error)
      }
      
    },
    convertDateFormat(dateString) {
      console.log(dateString);
      const [year, month, day] = dateString.split("-");

      const formattedDate = `${day}-${month}-${year}`;

      return formattedDate;
    },
    convertDateFormatForUpdate(dateString) {
      console.log(dateString);
      const [day, month, year] = dateString.split("-");

      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    },
    convertStartTimeFormatForUpdate(timeString) {
      console.log(timeString);
      const [hours, min] = timeString.split(":");
      this.startHH =hours;
      this.startMM =min;
    },
    convertEndTimeFormatForUpdate(timeString) {
      console.log(timeString);
      const [hours, min] = timeString.split(":");
      this.endHH =hours;
      this.endMM =min;
    },
    role(data) {
      this.campaignData={}
      this.dialog = true;
      this.campaignData.audience_type = data;
      this.updateFlag=false;
      console.log(data)
    },
    roleUpdate(data) {
      this.e1=1;
      this.campaignId=data.id;
      this.dialog = true;
      this.campaignData.audience_type = data.audience_type;
      this.updateFlag=true;
      this.campaignData=data
      // this.campaignData.start_date = this.convertDateFormatForUpdate(data.start_date)
      // this.campaignData.end_date = this.convertDateFormatForUpdate(data.end_date)
      this.getAssessmentsIds(data);
      this.convertStartTimeFormatForUpdate(data.start_time)
      this.convertEndTimeFormatForUpdate(data.end_time)
    },
    getAssessmentsIds(data){
      var ids =[];
      for(var i=0;i<data.campaign_assessments.length;i++){
        ids.push(data.campaign_assessments[i].assessment_id);
        console.log("idsss",data.campaign_assessments[i].assessment_id);
      }
      this.campaignData.assessment_ids =ids
     console.log("idsss",ids);
    },
    goto(step) {
      switch (step) {
        case 1:
          if (this.$refs.step1.validate()) {
            this.e1 = 2;
          }

          break;
        case 2:
          if (this.$refs.step2.validate()){
             console.log("bhf")
             this.createCampaign();
             this.e1++;
          }
          break;
        case 3:
          // if (this.$refs.step1.validate())
          this.dialog = false;
          this.successDialog = true
          break;

        default:
          this.e1++;
      }
    },
    async createCampaign() {
      this.campaignData.start_time = this.startHH + ":" + this.startMM;
      this.campaignData.end_time = this.endHH + ":" + this.endMM
      const start_date = this.campaignData.start_date;
      const end_date = this.campaignData.end_date;
      this.campaignData.start_date = this.convertDateFormat(this.campaignData.start_date)
      this.campaignData.end_date = this.convertDateFormat(this.campaignData.end_date)
      if(this.updateFlag==false){
        const response = await CampaignController.createCampaign(this.campaignData);
        console.log("create", response)
        if(response.data.success){
      //  this.successDialog = true
    }
    else {
      alert(response.data.error)
    }
      }else{
        const response = await CampaignController.updateCampaign(this.campaignData,this.campaignId);
        console.log("update", response)

        if(response.data.success){
      //  this.successDialog = true
       this.campaignId =null
    }
    else {
      alert(response.data.error)
      this.campaignId =null    }
      }
      this.campaignData.start_date = start_date
      this.campaignData.end_date = end_date
      
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);     
      if(response.data.success){
        this.schools = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
    },
    async getCampaigns() {
      const response = await CampaignController.getCampaigns();

      if (response.data.success) {
       
      this.campaigns = response.data.data;
      this.liveCampaigns = this.campaigns.live_campaign;
      this.scheduledCampaigns = this.campaigns.scheduled_campaign;
      this.expiredCampaigns = this.campaigns.expired_campaign;   
      }
      else {
        alert(response.data.error)
      }

    },
    async getSkills() {
      const response = await SkillsController.getSkills();
      //console.log(response);
      if (response.data.success) {
        this.skills = response.data.data.rows;

      }
      else {
        alert(response.data.error)
      }
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      if (response.data.success) {
        this.subjects = response.data.data.rows;

      }
      else {
        alert(response.data.error)
      }
      //console.log("surbject responser", this.subjectData);
    },
    async fetchAllClusters() {
      const response = await ClusterController.getAllClusters();
    
      if (response.data.success) {
        console.log(response);
      this.clusters = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
    },
    goToAssessment() {
      // this.$router.push({
      //   path: '/assessment',
      //   name: "dataList", //use name for router push
      //   // params: { data }
      // });
      // this.$router.push("/assessment")
      this.$router.push({
        name: "assessment",
        params: { cdialog: true },
      });
    },
    reload() {
      // trigger reload
      location.reload();
    },
    showAlert(event) {
      // show alert message
      if (event) {
        confirm("Press a button!");
      }
      // event.preventDefault()
      event.stopImmediatePropagation();
      // event.returnValue = 'my current value null'
    },

    async getLevels() {
      const response = await LevelController.getLevel();
      
      if (response.data.success) {
        this.levels = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
      
      // console.log("level data", this.levelData.rows);
    },
    async fetchAssessment() {
      const response = await AssessmentController.getAssessments();
      console.log("response from ", response)
   
      if (response.data.success) {
        this.assessments = response.data.data.rows;
        this.assessments = this.assessments.filter((item) => item.status === 'PUBLISHED');
      }
      else {
        alert(response.data.error)
      }

      // console.log(response.data.data);
    },
  },
  mounted() {
    // add event listener for beforeunload event
    window.addEventListener("beforeunload", this.showAlert);
  },
  beforeUnmount() {
    // remove event listener when component is unmounted
    window.removeEventListener("beforeunload", this.showAlert);
  },

  created() {
    this.getCampaigns();
    this.getLevels();
    this.fetchAssessment();
    this.getSkills();
    this.getSubjects();
    this.fetchAllClusters();
    this.getSchool();
  },
};
</script>