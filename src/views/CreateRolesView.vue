<template>
  <v-container fluid class="pa-8">
    <div>
      <v-card class="secondary"  elevation="0">
        <v-card-title class="pt-0">
          <v-toolbar elevation="0" class="secondary">
            <v-toolbar-title class="text-h5"
              > Create Role</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-row align="center" justify="end">
              <v-btn text @click="createRoleDialog = false">Cancel</v-btn>
              <v-progress-circular
                v-if="isCreatingRole"
                indeterminate
                color="primary"
              ></v-progress-circular>

              <v-btn
                v-else
                rounded
                x-large
                class="primary"
                @click="!formbtnBool ? createRole() : updateInput(editId)"
              >
                <v-icon>mdi-book-open-variant</v-icon>{{ formbtn() }}
              </v-btn>
            </v-row>
          </v-toolbar>
        </v-card-title>
        <v-card class="card">
          <v-form ref="form">
            <v-col class="">
              <div class="text-body-1 my-2">Role Name*</div>
              <div outlined class="rounded-xl outlined tag-compo">
                <input
                  class="ma-4 tag-input"
                  placeholder="Enter Role Name"
                  v-model="name"
                />
              </div>
            </v-col>
          </v-form>
        </v-card>
        <v-row>
          <v-col cols="">
            <v-card
              class="role-card mb-3 mt-5"
              max-width="1800"
              max-height=""
              outlined
            >
              <div class="mt-3">
                <v-row class="black">
                  <v-col cols="12" class="d-flex">
                    <v-col class="d-flex" cols="6">
                      <span>Module Name</span>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                      <span>Actions</span>
                    </v-col>
                  </v-col>
                </v-row>


                <v-col   v-for="(item, index) in permissionData"
                          :key="index">
                  <v-row class="mt-1">
                    <v-col cols="2" class="ms-3 mt-2 user-management">
                      <span class="text-capit">{{index}}</span>
                    </v-col>
                  </v-row>
                  <v-row class="ms-2 teacher-onboarding" v-for="(ele, eleIndex) in item"
                          :key="eleIndex">
                    <v-col cols="4">
                      <span class="text-capit">{{ eleIndex }}</span>
                    </v-col>
                    <v-col cols="8" class="d-flex permissions-item">
                      
                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="ele.create"
                          label="Create"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="ele.view"
                          label="View"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="ele.update"
                          label="Update"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="ele.delete"
                          label="Delete"
                        ></v-checkbox>
                      </v-col>

                    </v-col>
                  </v-row>
                </v-col>


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
  name: "CreateRolesView",
  data() {
    return {
      checkbox: null,
      name: null,
      isCreatingRole: false,
      windowHeight: window.innerHeight,
      permissionData: {
        "master": {
          "clusters": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "brands": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "schools": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "boards": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "levels": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "grades": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "subject_category": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "subject": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "skills": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
          "los bank": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          },
        },
        "interview": {
          "panel": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          }
        },
        "recommended": {
          "panel": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          }
        },
        "question-bank": {
          "panel": {
            "create": false,
            "view": false,
            "update": false,
            "delete": false
          }
        },
        
        
      }
    };
  },
  computed: {
    getHeight() {
        return this.windowHeight;
      },
  },
  methods: {
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Create";
    },
    
  },
  created() {
  
  },
};
</script>
<style >
  .permissions-item .v-messages {
    min-height: 0px;
  }
  .permissions-item .v-input__slot {
    margin-bottom: 0px;
  }
  .text-capit {
    text-transform: capitalize;
  }
</style>
