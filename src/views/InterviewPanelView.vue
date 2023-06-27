<template>
    <div class="container ">
      <v-container>
        <!-- VGOS -->
        <v-row justify="space-between" class="my-8 mt-0 mb-2" v-if="showUsers">
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

          <v-col cols="3">
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
                        <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                    <div class="">
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Primary
                        </v-chip>
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Secondary
                        </v-chip>
                        <v-chip
                            class="ma-1 circle-chip"
                            small
                            >
                            1+
                        </v-chip>
                    </div>
                    </v-col>
                  
                
                </v-row> 
              <div class="information">
                <v-row class="mb"> 
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/user-tag.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/Vector (8).svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector (9).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="" class="user-tag">
                        <span>Vibgyor High- Borivali </span>
                        <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                    </v-col>
                  
                </v-row>
                <v-row class="mb">
                    <v-col cols="2" class="ms-5  mt-1">
                     <img src="../assets/Vector (10).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="8" class="user-tag">
                 <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
                </v-col>
                  
                </v-row>
                <v-row class="">
                    <v-col cols="2" class="ms-5 mb-4 ">
                        <v-btn class="end-btn" to="/candidates/form">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                    </v-col>
                </v-row>
            </div>    
                
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="rounded-xl card " cols="3"  outlined>
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
                        <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                    <div class="">
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Primary
                        </v-chip>
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Secondary
                        </v-chip>
                        <v-chip
                            class="ma-1 circle-chip"
                            small
                            >
                            1+
                        </v-chip>
                    </div>
                    </v-col>
                  
                
                </v-row> 
              <div class="information">
                <v-row class="mb"> 
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/user-tag.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/Vector (8).svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector (9).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="" class="user-tag">
                        <span>Vibgyor High- Borivali </span>
                        <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                    </v-col>
                  
                </v-row>
                <v-row class="mb">
                    <v-col cols="2" class="ms-5  mt-1">
                     <img src="../assets/Vector (10).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="8" class="user-tag">
                 <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
                </v-col>
                  
                </v-row>
                <v-row class="">
                    <v-col cols="2" class="ms-5 mb-4 ">
                        <v-btn class="end-btn "    >start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                    </v-col>
                </v-row>
            </div>    
                
            </v-card>
          </v-col>
          <v-col cols="3">
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
                        <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                    <div class="">
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Primary
                        </v-chip>
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Secondary
                        </v-chip>
                        <v-chip
                            class="ma-1 circle-chip"
                            small
                            >
                            1+
                        </v-chip>
                    </div>
                    </v-col>
                  
                
                </v-row> 
              <div class="information">
                <v-row class="mb"> 
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/user-tag.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/Vector (8).svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector (9).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="" class="user-tag">
                        <span>Vibgyor High- Borivali </span>
                        <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                    </v-col>
                  
                </v-row>
                <v-row class="mb">
                    <v-col cols="2" class="ms-5  mt-1">
                     <img src="../assets/Vector (10).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="8" class="user-tag">
                 <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
                </v-col>
                  
                </v-row>
                <v-row class="">
                    <v-col cols="2" class="ms-5  ">
                        <v-btn class=" end-btn ms-5 ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                    </v-col>
                </v-row>
            </div>    
                
            </v-card>
          </v-col>
          <v-col cols="3">
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
                        <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                    <div class="">
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Primary
                        </v-chip>
                        <v-chip
                            class="ma-1 fs"
                            small
                            >
                            Secondary
                        </v-chip>
                        <v-chip
                            class="ma-1 circle-chip"
                            small
                            >
                            1+
                        </v-chip>
                    </div>
                    </v-col>
                  
                
                </v-row> 
              <div class="information">
                <v-row class="mb"> 
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/user-tag.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector.svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1">
                     <img src="../assets/Vector (8).svg" cols="" alt="">  
                    </v-col>
                    <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                  
                </v-row>
                <v-row  class="mb">
                    <v-col cols="2" class="ms-5 mt-1 ">
                     <img src="../assets/Vector (9).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="" class="user-tag">
                        <span>Vibgyor High- Borivali </span>
                        <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                    </v-col>
                  
                </v-row>
                <v-row class="mb">
                    <v-col cols="2" class="ms-5  mt-1">
                     <img src="../assets/Vector (10).svg" cols="" alt="">  
                    </v-col>
                    <v-col cols="8" class="user-tag">
                 <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
                </v-col>
                  
                </v-row>
                <v-row class="">
                    <v-col cols="2" class="ms-5  ">
                        <v-btn class=" end-btn ms-5 ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                    </v-col>
                </v-row>
            </div>    
                
            </v-card>
          </v-col>
        </v-row>
        <v-row class="section1 mt-2">

        <v-col cols="3">
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
                      <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                  <div class="">
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Primary
                      </v-chip>
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Secondary
                      </v-chip>
                      <v-chip
                          class="ma-1 circle-chip"
                          small
                          >
                          1+
                      </v-chip>
                  </div>
                  </v-col>
                
              
              </v-row> 
            <div class="information">
              <v-row class="mb"> 
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/user-tag.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/Vector (8).svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector (9).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="" class="user-tag">
                      <span>Vibgyor High- Borivali </span>
                      <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                  </v-col>
                
              </v-row>
              <v-row class="mb">
                  <v-col cols="2" class="ms-5  mt-1">
                  <img src="../assets/Vector (10).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="8" class="user-tag">
              <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
              </v-col>
                
              </v-row>
              <v-row class="">
                  <v-col cols="2" class="ms-5 mb-4 ">
                      <v-btn class=" end-btn ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                  </v-col>
              </v-row>
          </div>    
              
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="rounded-xl card " cols="3"  outlined>
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
                      <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                  <div class="">
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Primary
                      </v-chip>
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Secondary
                      </v-chip>
                      <v-chip
                          class="ma-1 circle-chip"
                          small
                          >
                          1+
                      </v-chip>
                  </div>
                  </v-col>
                
              
              </v-row> 
            <div class="information">
              <v-row class="mb"> 
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/user-tag.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/Vector (8).svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector (9).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="" class="user-tag">
                      <span>Vibgyor High- Borivali </span>
                      <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                  </v-col>
                
              </v-row>
              <v-row class="mb">
                  <v-col cols="2" class="ms-5  mt-1">
                  <img src="../assets/Vector (10).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="8" class="user-tag">
              <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
              </v-col>
                
              </v-row>
              <v-row class="">
                  <v-col cols="2" class="ms-5 mb-4 ">
                      <v-btn class="end-btn ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                  </v-col>
              </v-row>
          </div>    
              
          </v-card>
        </v-col>
        <v-col cols="3">
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
                      <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                  <div class="">
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Primary
                      </v-chip>
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Secondary
                      </v-chip>
                      <v-chip
                          class="ma-1 circle-chip"
                          small
                          >
                          1+
                      </v-chip>
                  </div>
                  </v-col>
                
              
              </v-row> 
            <div class="information">
              <v-row class="mb"> 
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/user-tag.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/Vector (8).svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector (9).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="" class="user-tag">
                      <span>Vibgyor High- Borivali </span>
                      <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                  </v-col>
                
              </v-row>
              <v-row class="mb">
                  <v-col cols="2" class="ms-5  mt-1">
                  <img src="../assets/Vector (10).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="8" class="user-tag">
              <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
              </v-col>
                
              </v-row>
              <v-row class="">
                  <v-col cols="2" class="ms-5  ">
                      <v-btn class=" end-btn ms-5 ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                  </v-col>
              </v-row>
          </div>    
              
          </v-card>
        </v-col>
        <v-col cols="3">
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
                      <span  class=" ms-1  ">Dhrumil Mankodiya</span>
                  <div class="">
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Primary
                      </v-chip>
                      <v-chip
                          class="ma-1 fs"
                          small
                          >
                          Secondary
                      </v-chip>
                      <v-chip
                          class="ma-1 circle-chip"
                          small
                          >
                          1+
                      </v-chip>
                  </div>
                  </v-col>
                
              
              </v-row> 
            <div class="information">
              <v-row class="mb"> 
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/user-tag.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Assessed to  </span><strong>Kristin Watson</strong></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector.svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag"> <span class="color" cols="10">Mathematics, Science, English  </span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1">
                  <img src="../assets/Vector (8).svg" cols="" alt="">  
                  </v-col>
                  <v-col class="user-tag1 "> <span class="color" cols="">16/04/2023 (14:00-15:00)</span></v-col>
                
              </v-row>
              <v-row  class="mb">
                  <v-col cols="2" class="ms-5 mt-1 ">
                  <img src="../assets/Vector (9).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="" class="user-tag">
                      <span>Vibgyor High- Borivali </span>
                      <p class="para ">Motilal Nagar - 1, Srirang Sabde Marg,Off Li...</p>
                  </v-col>
                
              </v-row>
              <v-row class="mb">
                  <v-col cols="2" class="ms-5  mt-1">
                  <img src="../assets/Vector (10).svg" cols="" alt="">  
                  </v-col>
                  <v-col cols="8" class="user-tag">
              <p> <span class="recommend1 ">Recommended</span> <span>For</span> <strong>Grade 7</strong></p>
              </v-col>
                
              </v-row>
              <v-row class="">
                  <v-col cols="2" class="ms-5  ">
                      <v-btn class=" end-btn ms-5 ">start interview <span class="ms-2 me-2"> <img src="../assets/Vector (11).svg" cols="" alt="">  </span></v-btn>
                  </v-col>
      </v-row>
  </div>    
      
  </v-card>
</v-col>
        </v-row>
        

                
          
       
        <!-- Job Seekers -->
        
      </v-container>
    </div>
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
  