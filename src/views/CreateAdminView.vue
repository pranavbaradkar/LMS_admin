<template>
  <v-container fluid class="pa-8">
    <div>
      <v-card class="secondary" elevation="0">
        <v-card class="card"> </v-card>
        <v-row>
          <v-col cols="">
            <v-card
              class="role-card mb-3 mt-5"
              max-width="1000"
              max-height=""
              outlined
            >
              <div class="mt-3">
                <v-row class="gray">
                  <v-col cols="12" class="d-flex">
                    <v-col class="d-flex" cols="">
                      <span>Create Admin</span>
                    </v-col>
                  </v-col>
                </v-row>

               <form>
                <v-row class="ms-5 first-line-inputs">
                  <v-col cols="2">
                    <v-select
                      :items="sss"
                      label="Select*"
                      outlined
                      class="rounded-xl"
                      item-text="name"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <div outlined class="rounded-xl outlined tag-compo">
                      <input class="ma-4 tag-input" placeholder="First Name*" />
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <div outlined class="rounded-xl outlined tag-compo">
                      <input class="ma-4 tag-input" placeholder="Middle Name" />
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <div outlined class="rounded-xl outlined tag-compo">
                      <input class="ma-4 tag-input" placeholder="Last Name" />
                    </div>
                  </v-col>
                </v-row>
                <v-row class="ms-5 ">
                    <v-col cols="11" class="email-input">
                        <div outlined class="rounded-xl outlined tag-compo">
                            <input class="ma-4 tag-input" placeholder="Enter E-mail Address*" />
                        </div>
                    </v-col>
                </v-row>
                <v-row class="ms-5 ">
                    <v-col cols="6">
                    <v-select
                      :items="sss"
                      label="Select Role*"
                      outlined
                      class="rounded-xl"
                      item-text="name"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="ms-5 end-row mb-5">
                    <v-col cols="7">
                        <span>*All filled are mandatory</span>
                    </v-col>
                    <v-col cols="4" class="d-flex " >
                        <v-col cols="" class=" ">
                            <v-btn
                            rounded
                            color=""
                            class="transparent-btn"
                            >
                          Cancel
                            </v-btn>
                        </v-col>
                        <v-col cols="" class="">
                            <div class="text-center">
                            <v-btn
                            rounded
                            color="primary"
                            class="black-btn"
                            dark
                            >
                        Send Invitation                       
                          </v-btn>
                        </div>
                        </v-col>
                    </v-col>
                </v-row>
            </form>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CreateAdminView",
  data() {
    return {
   
    };
  },
  
 
  created() {},
};
</script>
<style>

</style>
