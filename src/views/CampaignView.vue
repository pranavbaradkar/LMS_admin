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
            <p class="text-h5 pt-4 pb-0">Delete User</p>
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
                         :rules="[v => !!v || 'School is required']"
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
    <div class="d-flex w-100 flex-row justify-space-between">
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
    </div>

    <!-- second row -->
    <v-row justify="space-between" class="my-0">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">All Campaigns</div>
      </v-col>
      <v-col cols="8" sm="8" class="d-flex justify-end">
        <div>
          <v-btn class="primary mx-2" rounded
            ><v-icon>mdi-tune</v-icon>Filter</v-btn
          >
          <v-btn class="primary mx-2" rounded
            ><v-icon>mdi-export</v-icon>Export</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mb-4 mt-0">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">Live Campaigns ({{ this.liveCampaigns.length }})</div>
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
        width="373px"
        min-width="427px"
        height="auto"
        class="pa-5 ml-4 overflow-hidden"
        v-for="(data, i) in this.liveCampaigns"
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
          {{ data.audience_type == 'TEACHER' ? 'VGOS' :data.audience_type }}
        </div>
        <v-row>
          <v-spacer></v-spacer>
          <img width="28px" height="28px"  @click="roleUpdate(data)" class="cursor" src="../assets/edit.svg" />
        </v-row>
        
        <v-chip color="#06C2700F" small pill>
          <div class="c-dot mr-2"></div>
          Live
        </v-chip>

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
                :width="
                  getPercentate(
                    data.assessed,
                    data.assessed + data.yet_to_attempt
                  )
                "
                height="10px"
                color="#43ff64d9"
                justify-center
              >
                <div class="graph-value litegreen">
                  {{
                    getPercentate(
                      data.assessed,
                      data.assessed + data.yet_to_attempt
                    )
                  }}
                </div>
              </v-card>
              <v-card
                class="d-flex flex-row pa-0 ma-0 justify-center rounded-0"
                width="0%"
                height="10px"
                color="#1b72e8b3"
                justify-center
                elevation="0"
              >
                <div class="graph-value liteblue">0</div>
              </v-card>
              <v-card
              elevation="0"
                class="d-flex flex-row pa-0 ma-0 justify-center rounded-0"
                :width="
                  getPercentate(
                    data.yet_to_attempt,
                    data.assessed + data.yet_to_attempt
                  ) + '%'
                "
                height="10px"
                color="#D9D9D9"
                justify-center
              >
                <div class="graph-value">
                  {{
                    getPercentate(
                      data.yet_to_attempt,
                      data.assessed + data.yet_to_attempt
                    )
                  }}
                </div>
                
              </v-card>
            </v-card>
          </v-card>
        </div>
      </v-card>
      <!-- campaign card ending here           -->
    </div>
    <!-- campaign scroll view ending here -->

    <v-row
      justify="space-between"
      class="mb-2 mt-2"
      v-if="this.scheduledCampaigns.length > 0"
    >
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">Scheduled Campaigns</div>
      </v-col>

      <v-col cols="8" sm="8" class="d-flex justify-end align-center"> </v-col>
    </v-row>
    <div
      class="d-flex flex-row pb-4"
      id="myScroll-x"
      v-if="this.scheduledCampaigns.length > 0"
    >
      <!-- campaign card  -->
      <v-card
        width="373px"
        min-width="427px"
        height="auto"
        class="pa-5 ml-4 overflow-hidden d-flex flex-column justify-space-between"
        v-for="(data, i) in this.scheduledCampaigns"
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
        {{ data.audience_type == 'TEACHER' ? 'VGOS' :data.audience_type }}
        </div>
        <v-row>
          <v-spacer></v-spacer>
          <img width="28px" height="28px"  @click="roleUpdate(data)" class="cursor" src="../assets/edit.svg" />
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

          <div class="mt-4 w-100 d-flex justify-end">
            <v-btn
              class="mr-4"
              icon
              @click="
                deleteDialog = true;
                selectedId = data.id;
              "
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn rounded outlined
              ><v-icon>mdi-plus</v-icon> Add Assessment</v-btn
            >
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
          <img width="28px" height="28px"  @click="roleUpdate(data)" class="cursor" src="../assets/edit.svg" />
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
          class="primary mx-2 m-fab"
          v-bind="attrs"
          v-on="on"
          rounded
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

  methods: {
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
      this.campaignData.start_date = this.convertDateFormatForUpdate(data.start_date)
      this.campaignData.end_date = this.convertDateFormatForUpdate(data.end_date)
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