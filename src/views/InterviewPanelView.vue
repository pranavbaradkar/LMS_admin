<template>
    <div class="container ">
      <v-container>
        <!-- VGOS -->
        <v-row justify="space-between" class="my-8 mt-0 mb-2">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5 ml-0"></div>
      </v-col>
      </v-row>

      <!-- Assessment row and fiter and export btn -->

      <v-row justify="space-between" class="my-0 mt-2">
      <v-col cols="6" sm="6" md="" class="ma-0 pa-0 f-flex align-center">
        <div class="m-tab panel">
          <span
            background-color="black"
            class="ml-2 d-flex space-evenly"
            height="38"
            hide-slider
          >
           Interview Panel
        </span>
        </div>
      </v-col>
      <v-col cols="8" sm="8" class="d-flex justify-end">
        <div class="text-feild">
          <v-text-field
            label="Search"
            class="pt-0"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            clearable
          ></v-text-field>
        </div>
        <div>
          <v-btn class="primary mx-2" rounded @click="filterDialog = true"
            ><v-icon>mdi-tune</v-icon>Filter</v-btn
          >
        </div>
       </v-col>
     </v-row>    
        <v-row class="section1">

          <v-col v-for="(item,index) in this.interviewData" :key="index" cols="4">
            <v-card class="rounded-xl card" cols="3"  outlined>
                <v-row>
                    <V-col cols="2">
                    <v-avatar class="mt-3 ms-3">
                            <img
                                src="../assets/Ellipse 95.svg"
                                alt="John"
                            >
                        </v-avatar>   
                    </V-col>
                    
                    <v-col cols="10" class="mt-2 avtar-left">
                        <span  class=" ms-1  ">{{ item.user.first_name + ' ' + item.user.last_name}}</span>
                    <div class="">
                        <v-chip
                            v-for="level in item.levels.slice(0,3)"
                            :key="level"
                            class="ma-1 fs"
                            small
                            >
                            {{level}}
                        </v-chip>
                        <v-chip
                           v-if="item.levels.length > 3"
                            class="ma-1 circle-chip"
                            small
                            >
                            +{{ item.levels.length - 3}}
                        </v-chip>
                    </div>
                    </v-col>
                  
                
                </v-row> 
              <div class="information">
                <v-row> 
                    <v-col cols="2" class="ms-5 pb-0 mb-0 mt-1">
                     <img src="../assets/user-tag.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag pb-0"> <span class="color" cols="10">Assessed to  </span><strong>{{ item.interviewer }}</strong></v-col>
                  
                </v-row>
                <v-row >
                    <v-col cols="2" class="ms-5 pb-0 mb-0 mt-1 ">
                     <img src="../assets/Vector.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag pb-0"> <span class="color" cols="10" v-for="(subject, index) in item.subjects" :key="subject">{{ subject }}{{ index != item.subjects.length - 1 ? ' , ' : ''}}</span></v-col>
                  
                </v-row>
                <v-row >
                    <v-col cols="2" class="ms-5 pb-0 mb-0 mt-1">
                     <img src="../assets/Vector (8).svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag1 pl-0 pb-0"> <span class="color" cols="">{{ new Date(item.interview_slot).toLocaleDateString() }} {{ '(' }} {{ new Date(item.interview_slot).toLocaleTimeString('en',{hour12:false,hour:'numeric',minute:'numeric'})}} - {{ new Date(new Date(item.interview_slot).setHours(new Date(item.interview_slot).getHours() + 1)).getHours() + ':' + new Date(new Date(item.interview_slot).setHours(new Date(item.interview_slot).getHours() + 1)).getMinutes()}} {{ ')' }}</span></v-col>
                  
                </v-row>
                <v-row >
                    <v-col cols="2" class="ms-5 pb-0 mb-0 mt-1 "> 
                     <img src="../assets/Vector (9).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="" class="user-tag pb-0">
                        <span>{{ item.exam_location}}</span>
                        <!-- <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p> -->
                    </v-col>
                  
                </v-row>
                <v-row v-if="item.recommended_level">
                    <v-col cols="2" class="ms-5 pb-0 mb-0  mt-1">
                     <img src="../assets/Vector (10).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="8" class="user-tag pb-0">
                 <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>{{ item.recommended_level}}</strong></p>
                </v-col>
                  
                </v-row>
                <v-row class="mb-4">
                    <v-col cols="2" class="ms-5 mt-2 ">
                      <v-btn  variant="tonal" @click="startInterview(item.user_id, item.recommended_level, item.levels, item.user.first_name + ' ' + item.user.last_name)" class=" end-btn ">{{item.status === 'PENDING' ? 'Start Interview' : 'Response Submitted'}} <span v-if="item.status === 'PENDING'" class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                    </v-col>
                </v-row>
            </div>    
                
            </v-card>
          </v-col>
          </v-row>  
      </v-container>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import "../styles.css";
  import InterviewController from '@/controllers/InterviewController'
  export default {
    name: "CandidatesFormview",
    data() {
        return {
        search: "",
        filterDialog: false,
        interviewData: [],
        }
    },
    methods: {
        async getInterviewDetail () {
            const response = await InterviewController.getInterviewDetails();
            if (response.data.success) {
               this.interviewData = response.data.data;
            }
            else {
              alert('No data found')
            }
        },
        startInterview (user_id, recommended_level, levels, name) {
          this.$router.push({path: '/candidates/form',query:{
            user_id: user_id,
            recommended_level: recommended_level,
            levels: levels,
            name: name,
          }})
        }
    },
    created() {
        this.getInterviewDetail();
    },
  };
  </script>

  