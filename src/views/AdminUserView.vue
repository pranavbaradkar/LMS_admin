<template>
  <v-container fluid class="pa-8">
    <v-row>
      <v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="primary"
              large
              rounded
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              to="/create-admin"
            >
              <v-icon>mdi-account-plus</v-icon>
              <div class="pl-1">Create User</div>
            </v-btn>
          </template>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          clearable
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row justify="space-between" class="my-4">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">All Users</div>
      </v-col>

      <v-col cols="8" sm="8" md="8">
        <v-row justify="end">
          <!-- <v-btn class="primary mx-2" rounded @click="filterDialog = true"><v-icon>mdi-tune</v-icon>Filter</v-btn> -->
          <v-btn
            class="primary mx-2"
            rounded
            @click="deleteDialog = true"
            :disabled="selected.length == 0"
            ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
          ><v-btn
            class="primary mx-2"
            rounded
            @click="resendInvite"
            :disabled="selected.length == 0"
            ><v-icon>mdi-email-sync-outline</v-icon>Resend Invite</v-btn
          ><v-btn class="primary mx-2" rounded
            ><v-icon>mdi-export</v-icon>Export</v-btn
          >
        </v-row>
      </v-col>

      <v-dialog v-model="deleteDialog" max-width="366px" persistent>
        <v-card fluid>
          <v-container fluid class="pa-0">
            <v-card-text class="text-center">
              <v-container></v-container>
              <v-avatar color="secondary" size="90"
                ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
              >
              <p class="text-h5 pt-6 pb-0">Delete User</p>
              <p
                class="text-disabled grey--text text-subtitle-1 pt-3"
                color="rgba(0, 0, 0, 0.6)"
                disabled
              >
                This action will permanently delete the item . This cannot be
                undone
              </p>

              <div class="d-flex justify-space-between pt-4 pb-2" fluid>
                <v-btn
                  depressed
                  class="secondary black--text"
                  large
                  width="157px"
                  rounded
                  @click="
                    () => {
                      deleteDialog = false;
                      formbtnBool = false;
                    }
                  "
                  >CANCEL</v-btn
                >
                <v-btn
                  class="black white--text"
                  depressed
                  large
                  width="157px"
                  rounded
                  :disabled="selected.length == 0"
                  @click="deleteUser(selected)"
                  >DELETE</v-btn
                >
              </div>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      show-select
      :single-select="singleSelect"
      item-key="id"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [10, 25, 50, 100],
      }"
      :server-items-length="count"
      class="usertable"
    >
      <template v-slot:[`item.first_name`]="{ item }">
        {{ item.first_name + " " + item.last_name }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex flex-row">
          <img
            width="36px"
            height="36"
            @click="updateData(item)"
            class="cursor"
            src="../assets/edit.svg"
          />
          <img
            width="36px"
            height="36"
            class="cursor"
            src="../assets/userdelete.svg"
          />
        </div>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" fullscreen hide-overlay>
      <v-card class="secondary">
        <v-card-title>
          <v-toolbar elevation="0" class="secondary">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-toolbar-title class="text-h5">
                  {{ formbtn() }} Admin</v-toolbar-title
                >
              </v-col>
              <v-col cols="12" sm="12" md="12"> </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-btn class="float-right" icon @click="dialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-stepper v-model="e1">
              <v-stepper-header class="text-subtitle-2 secondaryAccent">
                <v-stepper-step :complete="e1 > 1" step="1">
                  PERSONAL INFORMATION
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  ACADEMICS
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> PROFESSIONAL INFO </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!------------------------------------------ STEP 1 ------------------------------------------>
                <v-stepper-content step="1">
                  <v-form lazy-validation ref="step1">
                    <v-card elevation="0">
                      <v-row>
                        <v-col cols="12">
                          <v-card class="pa-4" elevation="0">
                            <v-row class="py-0">
                              <v-col cols="2" class="py-0"
                                ><v-select
                                  v-model="personalInfo.title"
                                  label="Title *"
                                  :items="['Ms', 'Mrs', 'Mr']"
                                  outlined
                                  class="rounded-xl"
                                  :rules="[(v) => !!v || 'Title is required']"
                                  required
                                  attach
                                  density="comfortable"
                                >
                                </v-select
                              ></v-col>
                              <v-col cols="4" class="py-0"
                                ><v-text-field
                                  v-model="personalInfo.first_name"
                                  :rules="[
                                    (v) => !!v || 'First Name is required',
                                  ]"
                                  required
                                  outlined
                                  label="First Name *"
                                  rounded
                                  class="rounded-xl"
                                ></v-text-field></v-col
                              ><v-col cols="3" class="py-0"
                                ><v-text-field
                                  v-model="personalInfo.middle_name"
                                  outlined
                                  label="Middle Name"
                                  rounded
                                  class="rounded-xl"
                                ></v-text-field></v-col
                              ><v-col cols="3" class="py-0"
                                ><v-text-field
                                  v-model="personalInfo.last_name"
                                  outlined
                                  label="Last Name"
                                  rounded
                                  class="rounded-xl"
                                  :rules="[
                                    (v) => !!v || 'Last Name is required',
                                  ]"
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col class="py-0"
                                ><v-text-field
                                  v-model="personalInfo.email"
                                  outlined
                                  label="Email Address *"
                                  rounded
                                  class="rounded-xl"
                                  required
                                  :rules="[
                                    (v) => !!v || 'Email Address is required',
                                  ]"
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col class="py-0"
                                ><v-text-field
                                  label="Your 10-digit mobile no. *"
                                  outlined
                                  rounded
                                  class="rounded-xl"
                                  counter="10"
                                  prefix="+91"
                                  :rules="[
                                    (v) => !!v || 'Mobile Number is required',
                                  ]"
                                  required
                                  maxLength="10"
                                  v-model="personalInfo.phone_no"
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col cols="4" class="py-0">
                                <v-text-field
                                  outlined
                                  label="Date of Birth (DDMMYY) *"
                                  rounded
                                  class="rounded-xl"
                                  type="date"
                                  :rules="[
                                    (v) => !!v || 'Date of Birth is required',
                                  ]"
                                  v-model="personalInfo.dob"
                                ></v-text-field
                              ></v-col>
                              <v-col cols="2" class="py-0">
                                <v-select
                                  label="Gender *"
                                  :items="['MALE', 'FEMALE', 'OTHERS']"
                                  outlined
                                  class="rounded-xl"
                                  v-model="personalInfo.gender"
                                  :rules="[(v) => !!v || 'Gender is required']"
                                  required
                                >
                                </v-select>
                              </v-col>
                            </v-row>

                            <v-row class="py-0">
                              <v-col cols="6" class="py-0">
                                <v-select
                                  v-model="personalInfo.country_id"
                                  label="Country"
                                  :items="countries"
                                  item-value="id"
                                  item-text="country_name"
                                  outlined
                                  class="rounded-xl"
                                  :rules="[(v) => !!v || 'Country is required']"
                                  required
                                  @change="fetchStates"
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="6" class="py-0">
                                <v-select
                                  v-model="personalInfo.state_id"
                                  label="State"
                                  :items="states"
                                  outlined
                                  class="rounded-xl"
                                  item-value="id"
                                  item-text="state_name"
                                  @change="fetchDistricts"
                                  :rules="[(v) => !!v || 'State is required']"
                                  required
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col cols="6" class="py-0">
                                <v-select
                                  v-model="personalInfo.districtId"
                                  label="District"
                                  :items="districts"
                                  outlined
                                  class="rounded-xl"
                                  item-value="id"
                                  item-text="district_name"
                                  @change="fetchTalukas"
                                  :rules="[
                                    (v) => !!v || 'District is required',
                                  ]"
                                  required
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="6" class="py-0">
                                <v-select
                                  v-model="personalInfo.talukTehsil"
                                  label="Taluk / Tehsil"
                                  :items="talukas"
                                  outlined
                                  class="rounded-xl"
                                  item-value="id"
                                  item-text="taluka_name"
                                  @change="fetchCities"
                                  :rules="[(v) => !!v || 'Tehsil is required']"
                                  required
                                >
                                </v-select>
                              </v-col> </v-row
                            ><v-row class="py-0">
                              <v-col cols="6" class="py-0">
                                <v-select
                                  v-model="personalInfo.city_id"
                                  label="City / Village"
                                  :items="cities"
                                  outlined
                                  class="rounded-xl"
                                  item-value="id"
                                  item-text="city_name"
                                  :rules="[(v) => !!v || 'City is required']"
                                  required
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="6" class="py-0">
                                <v-text-field
                                  v-model="personalInfo.pincode"
                                  outlined
                                  label="Pin Code"
                                  rounded
                                  maxLength="6"
                                  counter="6"
                                  class="rounded-xl"
                                  :rules="[(v) => !!v || 'Pincode is required']"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="py-0">
                                <v-text-field
                                  v-model="personalInfo.address"
                                  outlined
                                  label="Address"
                                  rounded
                                  class="rounded-xl"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>

                  <v-btn
                    rounded
                    color="primary"
                    class="mx-4 my-4"
                    @click="goToStep2"
                  >
                    NEXT
                  </v-btn>
                </v-stepper-content>
                <!------------------------------------------ STEP 2 ------------------------------------------>
                <v-stepper-content step="2">
                  <v-form lazy-validation ref="step2">
                    <v-card elevation="0">
                      <v-card class="pa-4" elevation="0">
                        <v-expansion-panels v-model="expandedPanelIndex">
                          <v-expansion-panel
                            v-for="(
                              qualification, index
                            ) in academicQualifications"
                            :key="index"
                            elevation="0"
                          >
                            <v-expansion-panel-header>
                              <div
                                class="d-flex flex-column"
                                v-if="expandedPanelIndex != index"
                              >
                                <div class="font-weight-regular">
                                  {{
                                    index + 1 + ". " + qualification.programme
                                  }}
                                </div>
                                <div class="text-body-2 grey--text pt-2 pb-2">
                                  {{ qualification.institution }}
                                </div>
                                <div class="text-body-2 grey--text">
                                  {{
                                    new Date(
                                      qualification.start_date
                                    ).getFullYear() +
                                    " - " +
                                    new Date(
                                      qualification.end_date
                                    ).getFullYear()
                                  }}
                                </div>
                              </div>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>
                              <v-row class="py-0">
                                <v-col class="py-0"
                                  ><v-text-field
                                    v-model="qualification.institution"
                                    outlined
                                    label="School/ College/ University *"
                                    rounded
                                    class="rounded-xl"
                                    :rules="[
                                      (v) =>
                                        !!v ||
                                        'School/ College/ University is required',
                                    ]"
                                    required
                                  ></v-text-field
                                ></v-col>
                              </v-row>
                              <v-row class="py-0">
                                <v-col class="py-0"
                                  ><v-text-field
                                    v-model="qualification.programme"
                                    outlined
                                    label="Degree/ Diploma/ Certification *"
                                    rounded
                                    class="rounded-xl"
                                    :rules="[
                                      (v) =>
                                        !!v ||
                                        'Degree/ Diploma/ Certification is required',
                                    ]"
                                    required
                                  ></v-text-field
                                ></v-col> </v-row
                              ><v-row class="py-0">
                                <v-col class="py-0"
                                  ><v-text-field
                                    v-model="qualification.field_of_study"
                                    outlined
                                    label="Field of Study"
                                    rounded
                                    class="rounded-xl"
                                  ></v-text-field
                                ></v-col>
                              </v-row>

                              <v-row class="py-0">
                                <v-col cols="6" class="py-0"
                                  ><v-text-field
                                    v-model="qualification.start_date"
                                    outlined
                                    label="Start Date*"
                                    rounded
                                    class="rounded-xl"
                                    type="date"
                                    :rules="[
                                      (v) => !!v || 'Start Date is required',
                                    ]"
                                  ></v-text-field
                                ></v-col>
                                <v-col cols="6" class="py-0"
                                  ><v-text-field
                                    v-model="qualification.end_date"
                                    outlined
                                    label="End Date*"
                                    rounded
                                    class="rounded-xl"
                                    type="date"
                                    :rules="[
                                      (v) => !!v || 'End Date is required',
                                    ]"
                                  ></v-text-field
                                ></v-col>
                              </v-row>

                              <v-row class="py-0">
                                <v-col cols="12" class="py-0">
                                  <v-text-field
                                    v-model="extra_carricular_activities"
                                    outlined
                                    label="Extra Curricular Activities"
                                    rounded
                                    class="rounded-xl"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row class="py-0">
                                <v-col cols="12" class="py-0">
                                  <v-text-field
                                    outlined
                                    label="Achievements"
                                    rounded
                                    class="rounded-xl"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col
                                  cols="12"
                                  class="d-flex justify-space-between"
                                >
                                  <v-btn
                                    text
                                    rounded
                                    outlined
                                    v-if="formbtnBool"
                                    @click="
                                      updateAcademics(qualification, editId)
                                    "
                                    >Update</v-btn
                                  >

                                  <v-btn
                                    v-if="academicQualifications.length != 1"
                                    @click="openDeleteDiolog(index)"
                                    text
                                    class="d-flex justify-end red--text"
                                    >Remove</v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>

                        <v-row>
                          <v-col class="mt-4">
                            <v-btn text @click="addAcademicQualification"
                              >Add More Qualification</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card>
                  </v-form>
                  <v-btn
                    rounded
                    outlined
                    class="mx-4 my-4"
                    color="primary"
                    @click="e1 = 1"
                  >
                    BACK
                  </v-btn>
                  <v-btn rounded color="primary" @click="goToStep3">
                    NEXT
                  </v-btn>
                </v-stepper-content>
                <!------------------------------------------ STEP 3 ------------------------------------------>
                <v-stepper-content step="3">
                  <v-form lazy-validation ref="step3">
                    <v-card elevation="0">
                      <v-card class="pa-4" elevation="0">
                        <v-expansion-panels v-model="expandedPanelIndex">
                          <v-expansion-panel
                            v-for="(professional, index) in professionalInfos"
                            :key="index"
                            elevation="0"
                          >
                            <v-expansion-panel-header>
                              <div
                                class="d-flex flex-column"
                                v-if="expandedPanelIndex != index"
                              >
                                <div class="font-weight-regular">
                                  {{ index + 1 + ". " + professional.position }}
                                </div>
                                <div class="text-body-2 grey--text">
                                  {{
                                    new Date(
                                      professional.start_date
                                    ).getFullYear() +
                                    " - " +
                                    new Date(
                                      professional.end_date
                                    ).getFullYear()
                                  }}
                                </div>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-card
                                    width="100%"
                                    elevation="0"
                                    class="mb-10 rounded-xl"
                                    outlined
                                    ><v-radio-group
                                      mandatory
                                      row
                                      v-model="experience"
                                      :rules="[
                                        (v) => !!v || 'Please select one',
                                      ]"
                                      required
                                    >
                                      <v-col class="py-0">
                                        <v-row class="py-0 px-0 ml-2">
                                          <v-radio
                                            class="mb-8 py-0"
                                            label="I have"
                                            value="Experienced"
                                          >
                                          </v-radio>

                                          <v-col
                                            cols="1 center"
                                            class="py-0 px-0"
                                          >
                                            <v-text-field
                                              type="number"
                                              outlined
                                              @keypress="isNumber($event)"
                                              class="rounded-xl"
                                              v-model="
                                                professional.experience_year
                                              "
                                            >
                                            </v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="1 center"
                                            class="py-0 px-0"
                                          >
                                            <div class="pt-4 ml-4">Years</div>
                                          </v-col>
                                          <v-col cols="1" class="py-0 px-0">
                                            <v-text-field
                                              type="number"
                                              @keypress="isNumber($event)"
                                              outlined
                                              class="rounded-xl"
                                              v-model="
                                                professional.experience_month
                                              "
                                            >
                                            </v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="4 center"
                                            class="py-0 px-0"
                                          >
                                            <div class="pt-4 ml-4">
                                              Months of experiences
                                            </div>
                                          </v-col>
                                        </v-row>
                                        <v-row class="pb-4 ml-2">
                                          <v-radio
                                            label="Fresher"
                                            value="Fresher"
                                          >
                                          </v-radio
                                        ></v-row>
                                      </v-col> </v-radio-group
                                  ></v-card>
                                </v-col>
                              </v-row>
                              <div v-if="experience == 'Experienced'">
                                <v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-text-field
                                      outlined
                                      label="Role/ Position *"
                                      rounded
                                      class="rounded-xl"
                                      counter="100"
                                      maxLength="100"
                                      :rules="[
                                        (v) =>
                                          !!v || 'Role/ Position is required',
                                      ]"
                                      required
                                      v-model="professional.position"
                                    ></v-text-field
                                  ></v-col> </v-row
                                ><v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-select
                                      label="Employment Type"
                                      :items="employeeType"
                                      outlined
                                      item-value="id"
                                      item-text="name"
                                      class="rounded-xl"
                                      v-model="professional.employee_type_id"
                                    >
                                    </v-select
                                  ></v-col>
                                </v-row>

                                <v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-select
                                      label="School / Institute"
                                      :items="schoolData"
                                      item-value="id"
                                      item-text="name"
                                      outlined
                                      class="rounded-xl"
                                    >
                                    </v-select
                                  ></v-col>
                                </v-row>
                                <v-row class="py-0">
                                  <v-col class="py-0">
                                    <v-checkbox
                                      class="py-0"
                                      v-model="isCurrentlyWorking"
                                      label="I am currently working on this role / position."
                                    ></v-checkbox>
                                  </v-col>
                                </v-row>
                                <v-row class="py-0">
                                  <v-col cols="6" class="py-0"
                                    ><v-text-field
                                      outlined
                                      label="Start Date*"
                                      rounded
                                      class="rounded-xl"
                                      v-model="professional.start_date"
                                      type="date"
                                      :rules="[
                                        (v) => !!v || 'Start Date is required',
                                      ]"
                                    ></v-text-field
                                  ></v-col>
                                  <v-col cols="6" class="py-0"
                                    ><v-text-field
                                      :disabled="isCurrentlyWorking"
                                      outlined
                                      label="End Date"
                                      rounded
                                      class="rounded-xl"
                                      v-model="professional.end_date"
                                      type="date"
                                      :rules="[
                                        (v) => !!v || 'End Date is required',
                                      ]"
                                    ></v-text-field
                                  ></v-col>
                                </v-row>
                                <v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-select
                                      label="Board"
                                      :items="boardsData"
                                      item-text="name"
                                      item-value="id"
                                      outlined
                                      class="rounded-xl"
                                      v-model="professional.board_id"
                                    >
                                    </v-select
                                  ></v-col> </v-row
                                ><v-row class="py-0">
                                  <v-col class="py-0">
                                    <v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Levels"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="tableLevels"
                                      multiple
                                      item-text="name"
                                      item-value="id"
                                    >
                                    </v-autocomplete
                                  ></v-col> </v-row
                                ><v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Grades"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="gradesData"
                                      multiple
                                      item-text="name"
                                      item-value="id"
                                    >
                                    </v-autocomplete
                                  ></v-col> </v-row
                                ><v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Subjects"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="subjectsData"
                                      multiple
                                      item-text="name"
                                      item-value="id"
                                    >
                                    </v-autocomplete
                                  ></v-col>
                                </v-row>
                              </div>
                              <div v-if="experience != 'Experienced'">
                                <v-row class="py-0">
                                  <v-col class="py-0">
                                    <v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Which board do you want to teach?"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="boardsData"
                                      item-text="name"
                                      item-value="id"
                                      multiple
                                    >
                                    </v-autocomplete>
                                  </v-col> </v-row
                                ><v-row class="py-0">
                                  <v-col class="py-0">
                                    <v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Which level do you want to teach?"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="tableLevels"
                                      multiple
                                      item-text="name"
                                      item-value="id"
                                    >
                                    </v-autocomplete>
                                  </v-col>
                                </v-row>

                                <v-row class="py-0">
                                  <v-col class="py-0">
                                    <v-autocomplete
                                      clearable
                                      deletable-chips
                                      label="Which subject do you want to teach?"
                                      outlined
                                      class="rounded-xl"
                                      small-chips
                                      :items="subjectsData"
                                      multiple
                                      item-text="name"
                                      item-value="id"
                                    >
                                    </v-autocomplete>
                                  </v-col>
                                </v-row>
                              </div>
                              <v-row>
                                <v-col
                                  cols="12"
                                  class="d-flex justify-space-between"
                                >
                                  <v-btn
                                    text
                                    rounded
                                    outlined
                                    v-if="formbtnBool"
                                    @click="
                                      updateProfessionalInfo(
                                        professional,
                                        editId
                                      )
                                    "
                                    >Update</v-btn
                                  >

                                  <v-btn
                                    v-if="
                                      experience == 'Experienced' &&
                                      professionalInfos.length != 1
                                    "
                                    @click="openDeleteDiolog(index)"
                                    text
                                    class="d-flex justify-end red--text"
                                    >Remove</v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-row>
                          <v-col
                            class="mt-4"
                            v-if="experience == 'Experienced'"
                          >
                            <v-btn text @click="addProfessionalInfo"
                              >Add More Qualification</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card>
                  </v-form>
                  <v-container>
                    <v-row>
                      <v-btn
                        rounded
                        outlined
                        class="ma-4"
                        color="primary"
                        @click="e1 = 2"
                      >
                        BACK
                      </v-btn>

                      <v-btn
                        :loading="isCreatingUser"
                        rounded
                        depressed
                        color="primary"
                        class="my-4"
                        @click="createUser"
                      >
                        {{ formbtn() }} DETAILS
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">
              New User {{ formbtnBool == false ? "Created" : "Updated" }}
            </p>
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
    <!-- dialog for resend invite success-->
    <v-dialog v-model="resendInviteSuccessDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Invite Sent Successfully</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="resendInviteSuccessDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!--diolog for delete academic and professional array-->
    <v-dialog v-model="deleteUserDetails" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="#db44371f" size="90"
              ><v-icon size="65" color="#DB4437"
                >mdi-trash-can-outline</v-icon
              ></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">
              Are Sure you want to delete this Info ?
            </p>
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
                class="black--text"
                color="#0000001a"
                large
                width="157px"
                rounded
                @click="deleteUserDetails = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="primary"
                large
                width="157px"
                rounded
                @click="removeDataFromSteps()"
                >DELETE</v-btn
              >
            </div>
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
            <p class="text-h5 pt-2 font-weight-medium">Error</p>
            <p class="text-h6 py-3 font-weight-regular">{{ errorMessage }}</p>
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
  </v-container>
</template>
<script>
import "../styles.css";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import UsersController from "@/controllers/UsersController";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  name: "AdminUserView",
  data() {
    return {
      dobRules: [(v) => !!v || "Date of Birth is required"],
      rules: {
        required: (value) => !!value || "Field is required",
      },
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      e1: 1,
      editId: null,
      formbtnBool: false,
      experience: "Experienced",
      levels: [],
      levelId: -1,
      subjects: [],
      subjectId: [],
      isCurrentlyWorking: false,
      errorMessage: "Failed",
      talukTehsil: "",
      dialog: false,
      deleteDialog: false,
      singleSelect: false,
      selected: [],
      experienceYear: -1,
      deleteUserDetails: false,
      experienceMonth: -1,
      filterDialog: false,
      rolePosition: "",
      employeeTypeId: -1,
   

      headers: [
        { text: "Full Name", value: "fullName", cellClass: "w-10" },
        { text: "Email ID", value: "email", cellClass: "w-15" },
        { text: "Created On", value: "created_at", cellClass: "w-15" },
        { text: "Status", value: "status", cellClass: "w-15" },
        { text: "Role", value: "user_type", cellClass: "w-15" },
        { text: "Actions", value: "actions", cellClass: "w-10" },
      ],
      personalInfo: {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        dob: "",
        gender: "",
        phone_no: "",
        country_id: 0,
        state_id: 0,
        city_id: 0,
        districtId: 0,
        talukTehsil: 0,
        address: "",
        pincode: 0,
        is_email_verified: false,
        is_phone_verified: false,
      },
    };
  },
 
  methods: {
    getDate(timeStamp) {
      return new Date(timeStamp).toString().substring(0, 16);
    },
  

    async getProfessionalInfo(id) {
      const response = await UsersController.getprofessionalInfo(id);
      this.professionalInfos = response.data.data;
      // console.log("professional data comming", this.professionalInfos)
    },
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },

   
  },

  created() {},
};
</script>
<style scoped></style>
