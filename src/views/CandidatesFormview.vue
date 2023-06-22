<template>
    <form class="form">
      <v-container>
        <!-- VGOS -->
        <v-row>
          <v-col cols="12">
            <v-card class="rounded-xl d-flex" outlined>
                <V-col cols="1">
                   <v-avatar class="mt-2 ms-2">
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                        >
                    </v-avatar>   
                </V-col>
                <v-col cols="3" class="name">
                    <span  class="d-flex  fs ">Dhrumil Mankodiya</span>
                   <div class="badge">
                    <v-chip
                        class="ma-1"
                        small
                        >
                        Primary
                    </v-chip>
                    <v-chip
                        class="ma-1"
                        small
                        >
                        Secondary
                    </v-chip>
                    <v-chip
                        class="ma-1"
                        small
                        >
                        Sr.Secondary
                    </v-chip>
                   </div>
                </v-col>
                <v-col cols="8" class="endsec mt-4 me-3">
                 <p> <span class="recommend">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
                </v-col>
              
              <v-card-text style="text-align: center">
                
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
                    <v-col cols="3" class="card-heading">
                        <strong  class="d-flex   ">About Candidate in his/her words *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="first"
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
                    <v-col cols="3" class="card-heading">
                        <strong  class="d-flex   ">Candidate's Past Experiance *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="first"
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
                    <v-col cols="3" class="card-heading">
                        <strong  class="d-flex   ">Current CTC And Expected CTC of Candidate *</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="6">
                <span class="ms-5 gray">Current CTC- <strong class="ms-3 me-3">12</strong>LPA</span>
                <v-divider class="mx-5 mt-1"></v-divider>
              </v-col>
              <v-col cols="6">
                <span class="ms-5 gray">Expected CTC- <strong class="ms-3 me-3">15</strong>LPA</span>
                <v-divider class="mx-5 mt-1"></v-divider>
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
                        v-model="value"
                        :items="items"
                        attach
                        chips
                        label="Type Subjects"
                        multiple
                     ></v-select>
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
                  <v-col cols="1" class="checkbox1 me-2">
                    <v-checkbox value></v-checkbox>
                    <span>State</span>
                  </v-col> 
                  <v-col cols="1" class="checkbox1 me-3">
                    <v-checkbox value></v-checkbox>
                    <span>CISCE</span>
                  </v-col> 
                  <v-col cols="1" class="checkbox1 me-2">
                    <v-checkbox value></v-checkbox>
                    <span>CBSE</span>
                  </v-col> 
                  <v-col cols="1" class="checkbox1">
                    <v-checkbox value></v-checkbox>
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
                    v-model="value"
                    step="10"
                    thumb-label
                    ticks
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
                        7
                    </v-btn> 
                    <strong  class="d-flex  ms-3 ">Appearance Score</strong>
                    </V-col>
             </v-row>
             <v-row>
              <v-col cols="11" class="ms-3">
                  <v-slider
                    v-model="value"
                    step="10"
                    thumb-label
                    ticks
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
                    <v-col cols="3" class="card-heading  ">
                        <strong  class="  ">Interview Notes</strong>
                    </v-col>
              </div> 
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="first"
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
                    <strong  class="d-flex  ms-3 "> Overall Rating</strong>
                    </V-col>
             </v-row>
                
              
             <v-row>
              <v-col cols="11" class="ms-3">
                  <v-slider
                    v-model="value"
                    step="10"
                    thumb-label
                    ticks
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
                    v-model="row"
                    row
                  >
                    <v-radio
                      label="Yes"
                      value="radio-1"
                    ></v-radio>
                    <v-radio
                      label="No"
                      value="radio-2"
                    ></v-radio>
                    <v-radio
                      label="Maybe"
                      value="radio-3"
                    ></v-radio>
                  </v-radio-group>
                </v-row>
             
          
              
             
            </v-card>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-btn class="submit-btn ">Submit </v-btn>
          </v-col>
        </v-row>
        
      </v-container>
    </form>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import "../styles.css";
  export default {
    name: "CandidatesFormview",
    components: {
    
    },
    
  
    created() {
      this.getDashboardData();
    },
  };
  </script>
  <script>
  export default {
    data () {
      return {
        chip1: true,
        chip2: true,
        chip3: true,
        chip4: true,
      }
    },
  }
</script>
<script>
  export default {
    data: () => ({
      includeFiles: true,
      enabled: false,
    }),
  }
</script>
<script>
  export default {
    data () {
      return {
        radioGroup: 1,
      }
    },
  }
</script>
<script>
  export default {
    data: () => ({
      items: ['Grade 1', 'Grade 2'],
      value: ['Grade 1', 'Grade 2'],
    }),
  }
</script>
<script>
  export default {
    data () {
      return {
        value: 0,
      }
    },
  }
</script>
  