<template>
    <v-container fluid class="pa-8">
      <v-row>
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="primary" large rounded
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
              <v-icon>mdi-plus</v-icon><div class="pl-1">Create</div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item  @click="dialog = true; formbtnBool = false">
                <v-list-item-title> <v-icon>mdi-email-plus-outline</v-icon>  CREATE NEW JOBSEEKER </v-list-item-title>
              </v-list-item>
              <v-list-item >
                <v-list-item-title> <v-icon>mdi-email-plus-outline</v-icon>  INVITE NEW ADMIN </v-list-item-title>
              </v-list-item>
              <v-list-item >
                <v-list-item-title> <v-icon>mdi-account-multiple-plus
                </v-icon>  CREATE JOB SEEKERS IN BULK </v-list-item-title>
              </v-list-item>
            </v-list>
  
          </v-menu></v-col
        >
        <v-col cols="4">
          <v-text-field label="Search" prepend-inner-icon="mdi-magnify" v-model="search" clearable></v-text-field
        ></v-col>
      </v-row>
      <v-row justify="space-between" class="my-4">
        <v-col cols="4" md="4" sm="4"> <div class="text-h5">Job Seekers</div></v-col>
  
        <v-col sm="8" md="8" cols="8">
          <v-row justify="end">
            <!-- <v-btn class="primary mx-2" rounded
              ><v-icon>mdi-tune</v-icon>Filter</v-btn
            > -->
            <v-btn
            class="primary mx-2"
            rounded
            @click="deleteDialog=true"
            :disabled="selected.length == 0"
            ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
          ><v-btn class="primary mx-2" rounded @click="resendInvite" :disabled="selected.length == 0"
          ><v-icon>mdi-email-sync-outline</v-icon>Resend Invite</v-btn
        ><v-btn class="primary mx-2" rounded
              ><v-icon>mdi-export</v-icon>Export</v-btn
            >
          </v-row>
        </v-col>
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
        itemsPerPageOptions: [10, 25, 50, 100]
        }"  
        :server-items-length="count" 
        
      >
      <template v-slot:[`item.actions`]="{ item }">
     <div class="d-flex flex-row">  <img class="cursor" @click="updateData(item)" width="36px" height="36px" src="../assets/edit.svg"><img width="36px" height="36px" src="../assets/userdelete.svg"></div> 
      </template>
      <template v-slot:[`item.created_at`]="{item}">
        {{getDate(item.created_at)}}
       </template>
       <template v-slot:[`item.updated_at`]="{item}">
        {{getDate(item.created_at)}}
       </template>
      <template v-slot:[`item.first_name`]="{ item }">
      {{item.first_name+' '+item.last_name }}
      </template>
      </v-data-table>
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
        <!-- delete dialog-->
        <v-dialog v-model="deleteDialog" max-width="366px" persistent>
          <v-card fluid>
            <v-container fluid class="pa-0">
              <v-card-text class="text-center">
                <v-container></v-container>
                <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>
                <p class="text-h5 pt-6 pb-0">Delete Job Seeker</p>
                 <p class="text-disabled grey--text text-subtitle-1 pt-3" color="rgba(0, 0, 0, 0.6)" disabled>This action will permanently delete the item . This cannot be undone</p>
               
                <div class="d-flex justify-space-between pt-4 pb-2" fluid> 
                  <v-btn 
                  depressed class="secondary black--text" 
                  large width="157px" 
                  rounded 
                  @click="
                  () => {
                    deleteDialog = false;
                    formbtnBool = false;
                  }
                "
                  >CANCEL</v-btn>
                   <v-btn
                    class="black white--text" 
                    depressed large width="157px" 
                    rounded
                    :disabled="selected.length == 0"
                    @click="deleteUser(selected)"
                     >DELETE</v-btn></div>
              </v-card-text>
            </v-container>
          </v-card>
     </v-dialog>
      <!-- Registration Dialog Form -->
      <v-dialog v-model="dialog" fullscreen hide-overlay>
        <v-card class="secondary">
          <v-toolbar elevation="0" class="secondary">
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-h5">{{ formbtn() }} Job Seekers</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
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
                                    :rules="[v => !!v || 'Title is required']"
                                    required
                                  >
                                  </v-select
                                ></v-col>
                                <v-col cols="4" class="py-0"
                                  ><v-text-field
                                    v-model="personalInfo.first_name"
                                    :rules="[v => !!v || 'First Name is required']"
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
                                    :rules="[v => !!v || 'Last Name is required']"
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
                                    :rules="[v => !!v || 'Email Address is required']"
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
                                    :rules="[v => !!v || 'Mobile Number is required']"
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
                                    :rules="[v => !!v || 'Date of Birth is required']"
                                    v-model="personalInfo.dob"
                                  ></v-text-field
                                ></v-col>
                                <v-col cols="2" class="py-0">
                                  <v-select
                                    label="Gender *"
                                    :items="['MALE', 'FEMALE','OTHERS']"
                                    outlined
                                    class="rounded-xl"
                                    v-model="personalInfo.gender"
                                    :rules="[v => !!v || 'Gender is required']"
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
                                  >
                                  </v-select>
                                </v-col>
                                <v-col cols="6" class="py-0">
                                  <v-text-field
                                    v-model="personalInfo.pincode"
                                    outlined
                                    label="Pin Code"
                                    rounded
                                    class="rounded-xl"
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
                              <v-expansion-panel-header> <div
                                class="d-flex flex-column"
                                v-if="expandedPanelIndex != index"
                              >
                                <div class="font-weight-regular">
                                  {{ index + 1 + ". " + qualification.programme }}
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
                                    new Date(qualification.end_date).getFullYear()
                                  }}
                                </div>
                              </div></v-expansion-panel-header>
  
                              <v-expansion-panel-content>
                                <v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-text-field
                                      v-model="qualification.institution"
                                      outlined
                                      label="School/ College/ University *"
                                      rounded
                                      class="rounded-xl"
                                      :rules="[v => !!v || 'School/ College/ University is required']"
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
                                      :rules="[v => !!v || 'Degree/ Diploma/ Certification is required']"
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
                                      :rules="[v => !!v || 'Start Date is required']"
                                      
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
                                      :rules="[v => !!v || 'End Date is required']"
                                      ></v-text-field
                                  ></v-col>
                                </v-row>
  
                                <v-row class="py-0">
                                  <v-col cols="12" class="py-0">
                                    <v-text-field
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
                                <v-row >
                                  <v-col cols="12" class="d-flex justify-space-between">
                                    <v-btn text rounded outlined v-if="formbtnBool"
                                     >Update</v-btn>
  
                                    <v-btn v-if="experience == 'Experienced' && academicQualifications.length != 1" @click="openDeleteDiolog(index)" text
                                      class="d-flex justify-end red--text">Remove</v-btn>
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
                                    new Date(professional.end_date).getFullYear()
                                  }}
                                </div>
                              </div></v-expansion-panel-header>
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
                                        :rules="[v => !!v || 'Please select one']"
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
                                            <v-col cols="1 center" class="py-0 px-0"
                                              ><div class="pt-4 ml-4">
                                                Years
                                              </div></v-col
                                            >
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
                                            <v-col cols="4 center" class="py-0 px-0"
                                              ><div class="pt-4 ml-4">
                                                Months of experiences
                                              </div></v-col
                                            >
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
                                <div v-if="experience == 'Experienced'"> <v-row class="py-0">
                                  <v-col class="py-0"
                                    ><v-text-field
                                      outlined
                                      label="Role/ Position *"
                                      rounded
                                      class="rounded-xl"
                                      counter="100"
                                      maxLength="100"
                                      :rules="[v => !!v || 'Role/ Position is required']"
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
                                    v-model="professional.school_id"
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
                                      :rules="[v => !!v || 'Start Date is required']"
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
                                      :rules="[v => !!v || 'End Date is required']"
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
                                  <v-col class="py-0"
                                    > <v-autocomplete
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
                                  </v-autocomplete></v-col> </v-row
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
                                  </v-autocomplete></v-col> </v-row
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
                                  </v-autocomplete></v-col>
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
                                  <v-col cols="12" class="d-flex justify-space-between">
                                    <v-btn text rounded outlined v-if="formbtnBool"
                                      @click="updateAcademics(qualification, editId)">Update</v-btn>
  
                                    <v-btn v-if="professionalInfos.length != 1" @click="openDeleteDiolog(index)" text
                                      class="d-flex justify-end red--text">Remove</v-btn>
                                  </v-col>
                                </v-row>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                          <v-row>
                            <v-col class="mt-4" v-if="experience == 'Experienced'">
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
                          @click="createJobSeeker"
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
      <v-dialog v-model="successDialog" max-width="366px" persistent>
        <v-card>
          <v-container fluid class="pa-8">
            <v-card-text class="text-center">
              <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
              <p class="text-h5 py-4">New Job Seeker Created</p>
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
  import AddressController from "@/controllers/AddressController";
  import UsersController from "@/controllers/UsersController";
  import ResendInviteController from "@/controllers/ResendInviteController";
  import BoardController from "@/controllers/BoardController";
  import SchoolController from "@/controllers/SchoolController";
  import LevelController from "@/controllers/LevelController";
  import SubjectController from "@/controllers/SubjectController";
  import GradeController from "@/controllers/GradeController";

  export default {
    mixins: [validationMixin],
  
    validations: {
      email: { required, email },
    },
    name: "JobSeekersView",
    data() {
      return {
        dobRules: [
          (v) => !!v || "Date of Birth is required",
          (v) =>
            /^\d{4}-\d{2}-\d{2}$/.test(v) ||
            "Date of Birth must be in YYYY-MM-DD format",
        ],
        options: {},
        pageSize: 10,
        page: 1,
        count: 0,
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        formbtnBool:false,
        phoneNumber: "",
        e1: 1,
        experience: "Experienced",
        isCurrentlyWorking: false,
        countryId: "",
        stateId: "",
        districtId: "",
        cityVillageId: "",
        pinCode: "",
        address: "",
        talukTehsil: "",
        dialog: false,
        successDialog:false,
        errorDialog:false,
        singleSelect: false,
        deleteDialog:false,
        deleteUserDetails:false,
        resendInviteSuccessDialog:false,
        selected: [],
        gradesData:[],
        boardsData: "",
        tableLevels: [],
        isCreatingUser: false,
        subjectsData: [],
        schoolData: "",
        errorMessage: "Failed",
        search:'',
        headers: [
        { text: "Full Name", value: "first_name",cellClass: "w-10" },
        { text: "Email ID", value: "email",  cellClass: "w-15" },
        { text: "Phone No", value: "phone_no",  cellClass: "w-15" },
        { text: "Created On", value: "created_at", cellClass: "w-15" },
        { text: "Status", value: "status", cellClass: "w-15" },
        // { text: "Role", value: "user_type", cellClass: "w-15" },
        { text: "Last active on", value: "updated_at", cellClass: "w-15" }  ,
        // { text: "Screening status", value: "screening_status",cellClass: "w-10" },
        // { text: "Mains status", value: "mains_status" ,cellClass: "w-10"},       
        { text: "Actions", value: "actions" ,cellClass: "w-10"},
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
        talukTehsil:0,
        address: "",
        pincode: 0,
        is_email_verified: false,
        is_phone_verified: false,
      },
      academicQualifications: [
        {
          institution: "",
          programme: "",
          start_date:"",
          end_date:"",
          field_of_study: "",
          grade_score: 0,
          grade_type: "",
          certificate_url: "",
        },
      ],
      professionalInfos: [
        {
          experience_year: 0,
          experience_month: 0,
          position: "",
          employee_type_id: 0,
          board_id: 0,
          school_id:"",
          start_date:Date.now(),
          end_date: Date.now(),
        },
      ],
        expandedPanelIndex: 0, // set the last panel as expanded by default
        countries: [],
        states: [],
        districts: [],
        cities: [],
        talukas: [],
        users:[],
        employeeType: [
        {
          id: 1,
          name: "Permanent",
        },
        {
          id: 2,
          name: "Contract",
        },
        {
          id: 3,
          name: "Prohibition",
        },
      ],
      };
    },
    watch: {
    options: {
      handler() {
        console.log(this.options);
        this.pageSize = this.options.itemsPerPage;
        this.page = this.options.page;
        this.fetchUsers();
      },
      deep: true,
    },
    search(newValue){
      console.log(newValue);
        this.pageSize = this.options.itemsPerPage;
        this.page = this.options.page;
        this.options.page=1;
        this.fetchUsers();
    }
  },
    methods: {
      getDate(timeStamp) {
      return new Date(timeStamp).toString().substring(0, 16);
    },
      goToStep2() {
      if (this.formbtnBool) {
        if (this.$refs.step1.validate()) {
        this.updateUser(this.personalInfo, this.editId);
        this.e1 = 2;
        }
      }
      else {
        if (this.$refs.step1.validate()) {
          this.e1 = 2;
          this.expandedPanelIndex = 0;
          console.log(this.personalInfo)
        }
      }
    },
      goToStep3() {
      if (this.$refs.step2.validate()) {
        this.e1 = 3;
        this.expandedPanelIndex = 0;
      }
    },
      async createJobSeeker() {
        if (this.formbtnBool) {
        this.dialog = false;
        this.formbtnBool=false;
      }else if (this.$refs.step3.validate()) {
        //console.log("userif conditon");
        this.isCreatingUser = true;
        
        const response = await UsersController.createUser({
          personal_info: this.personalInfo,
          academics_info: this.academicQualifications,
          professional_info: this.professionalInfos,
        });
        //console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.dialog = false;
          this.fetchUsers();
        } else {
          this.isCreatingUser = false;
          this.errorMessage = response.data.error;
          this.errorDialog = true;
        }
      }
    },
    async updateUser() {
      // for update personal info
      const response = await UsersController.updatePersonalInfo(this.personalInfo, this.editId)
      console.log(response);

    },
    async updateAcademics(qualification, usrid) {
      console.log("data  id acadmic id", qualification, usrid );
      const response = await UsersController.updateAcademics(qualification, usrid, qualification.id);
      console.log(response);
    },
    async updateProfessionalInfo(data, userId) {
     const response = await UsersController.updateProfessionalInfo(data, userId, data.id);
     console.log(response);
    },
    addAcademicQualification() {
      this.academicQualifications.push({
        institution: "",
        programme: "",
        start_date: "",
        end_date: "",
        field_of_study: "",

        grade_score: 0,
        grade_type: "",

        certificate_url: "",
      });
      this.expandedPanelIndex = this.academicQualifications.length - 1;
    },
    addProfessionalInfo() {
      this.professionalInfos.push({
        experience_year: 0,
        experience_month: 0,
        position: "",
        employee_type_id: 0,
        school_id:"",
        board_id: 0,
        start_date: "",
        end_date: "",
      });
      this.expandedPanelIndex = this.professionalInfos.length - 1;
    },
          async deleteUser(items) {

      var response
      if (items.length == 1) {
        response = await UsersController.deleteUser(items[0].id);
      }
      else {
        var ids = "";

        for (var i = 0; i < items.length; i++) {
          ids = ids + items[i].id;
          if (i != items.length - 1) {
            ids = ids + ","
          }
        }
        console.log("id in string", ids)
        response = await UsersController.bulkDeleteUser(ids);
      }

      if (response.data.success) {
        this.selected = [];
        this.fetchUsers();

        this.selected.length = 0;
      }
      this.fetchUsers();
      this.deleteDialog = false

    },
    async resendInvite(){
      this.selected.forEach(async(item)=>{
      const response = await ResendInviteController.resendInvite(item.id);
      if (response.data.success) {
       console.log(response);
      }
      });
      this.selected = [];
      this.resendInviteSuccessDialog = true;
     // console.log("hit");
    },
    updateData(item) {
      this.editId = item.id; // selected id for edit
      this.formbtnBool = true; // change update/create btn value
      console.log("data id", item.id);
      this.dialog = true;
      this.personalInfo.title=item.title;
      this.personalInfo.first_name=item.first_name;
      this.personalInfo.middle_name=item.personalInfo;
      this.personalInfo.last_name=item.last_name;
      this.personalInfo.email=item.email;
      this.personalInfo.phone_no=item.phone_no;
      this.personalInfo.dob=item.dob;
      this.personalInfo.gender=item.gender;
      this.personalInfo.country_id = item.country_id;
      this.personalInfo.state_id = item.state_id;
      this.personalInfo.city_id = item.city_id;
      this.personalInfo.districtId = item.districtId;
      this.personalInfo.address = item.address;
      this.personalInfo.pincode = item.pincode;
      this.getAcademics(this.editId)
      this.getProfessionalInfo(this.editId);
    },
    async getAcademics(id) {
      const response = await UsersController.getAcademics(id)
     // console.log("res", response)
      this.academicQualifications = response.data.data
     // console.log("academic data comming", this.academicQualifications)
    },
    async getProfessionalInfo(id) {
      const response = await UsersController.getprofessionalInfo(id)
      this.professionalInfos = response.data.data
    //  console.log("professional data comming", this.professionalInfos)
    },
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
      async fetchUsers() {
        const response = await UsersController.getJobSeeker(
          this.pageSize,
          this.page,
          this.search,
        );
        this.users = response.data.data.rows;
        this.count = response.data.data.count;

        console.log(response.data.data);
      },
      async fetchCountries() {
        const response = await AddressController.getCountries();
        this.countries = response.data.data.rows;
        //console.log(this.countries);
      },
      async fetchStates() {
        const response = await AddressController.getStates(this.personalInfo.country_id);
        this.states = response.data.data.rows;
        //console.log(this.states);
      },
      async fetchDistricts() {
        const response = await AddressController.getDistricts(this.personalInfo.state_id);
        this.districts = response.data.data.rows;
        //console.log(this.districts);
        this.fetchCities();
      },
      async fetchTalukas() {
        const response = await AddressController.getTalukas(this.personalInfo.districtId);
        this.talukas = response.data.data.rows;
       // console.log(this.talukas);
      },
      async fetchCities() {
        const response = await AddressController.getCities(this.personalInfo.state_id,this.personalInfo.talukTehsil);
        this.cities = response.data.data.rows;
        //console.log(this.cities);
      },
      removeDataFromSteps() {
      this.deleteUserDetails = true;
      if (this.e1 == 2) {
        this.academicQualifications.splice(this.indexValue, 1);
      } else if (this.e1 == 3) {
        this.professionalInfos.splice(this.indexValue, 1);
      }
      this.deleteUserDetails = false;
      this.indexValue = null;
    },
      openDeleteDiolog(index){
      this.indexValue=index;
      this.deleteUserDetails=true;
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      //console.log(response);
      this.gradesData = response.data.data.rows;
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      // console.log(response);
      this.boardsData = response.data.data.rows;
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);
      this.schoolData = response.data.data.rows;
    },
    async getLevels() {
      const response = await LevelController.getLevel();
      this.tableLevels = response.data.data.rows;
      // console.log("level data", this.levelData.rows);
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      //console.log(response);
      this.subjectsData = response.data.data.rows;
    },
    },
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("E-mail is required");
        return errors;
      },
      filteredLevel() {
      if (this.searchLevels) {
        const regex = new RegExp(this.searchLevels);
        return this.tableLevels.filter((tableLevels) =>
          regex.test(tableLevels.name)
        );
      } else {
        return this.tableLevels;
      }
    },

    filteredBoard() {
      if (this.searchBoards) {
        const regex = new RegExp(this.searchBoards);
        return this.boardsData.filter((boardData) =>
          regex.test(boardData.name)
        );
      } else {
        return this.tableLevels;
      }
    },
    filteredSubject() {
      if (this.searchSubject) {
        const regex = new RegExp(this.searchSubject);
        return this.subject.filter((subject) => regex.test(subject.name));
      } else {
        return this.subject;
      }
    },
    },
    created() {
      this.fetchCountries();
      this.fetchUsers();
      this.getLevels();
      this.getSubjects();
      this.getGrades();
      this.getBoards();
      this.getSchool();
    },
  };
  </script>
  