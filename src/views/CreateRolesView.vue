<template>
  <v-container fluid class="pa-8">
    <div>
      <v-card class="secondary "  elevation="0">
        <v-card-title class="pt-0">
          <v-toolbar elevation="0" class="secondary">
            <v-toolbar-title class="text-h5"
              > Create Role</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-row align="center" justify="end">
              <v-btn text @click="cancel">Cancel</v-btn>
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
                @click="!formbtnBool ? createRole() : updateRole()"
              >
                <v-icon>mdi-book-open-variant</v-icon>{{ formbtn() }}
              </v-btn>
            </v-row>
          </v-toolbar>
        </v-card-title>
        <v-card class="card role-card mb-3 mt-0 pa-4">
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="6" class="pt-8">
                <v-text-field outlined class="rounded-xl" v-model="name" label="Role Name*"
                          :rules="[v => !!v || 'Role name is required']" required></v-text-field>
              </v-col>

              <v-col cols="6" class="pt-8">
                <v-text-field outlined class="rounded-xl" v-model="note" label="Note*" ></v-text-field>
              </v-col>
            </v-row>

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
                 
                  <v-row class="ms-2 teacher-onboarding"  v-if="index == 'master'">
                    <v-col cols="4">
                      <span class="text-capit">{{ "Panel" }}</span>
                    </v-col>
                    <v-col cols="8" class="d-flex permissions-item">
                      
                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="item.panel.create"
                          label="Create"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="item.panel.view"
                          label="View"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="item.panel.update"
                          label="Update"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="2">
                        <v-checkbox
                        class="mt-0"
                          v-model="item.panel.delete"
                          label="Delete"
                        ></v-checkbox>
                      </v-col>

                    </v-col>
                  </v-row>

                  <v-row class="ms-2 teacher-onboarding" v-for="(ele, eleIndex) in (index == 'master' ? item.child : item)"
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
import AdminController from "@/controllers/AdminController";
export default {
  name: "CreateRolesView",
  data() {
    return {
      checkbox: null,
      name: null,
      note: null,
      isCreatingRole: false,
      windowHeight: window.innerHeight,
      permissionData: {
        "master": {
          "panel": {
            "create": false,
            "view": true,
            "update": false,
            "delete": false,
          },
          "child": {
            "clusters": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "brands": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "schools": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "boards": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "levels": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "grades": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "subject_category": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "subject": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "skills": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
            "los_bank": {
              "create": false,
              "view": true,
              "update": false,
              "delete": false
            },
          }
        },
        "interview": {
          "panel": {
            "create": false,
            "view": true,
            "update": false,
            "delete": false
          }
        },
        "recommended": {
          "panel": {
            "create": false,
            "view": true,
            "update": false,
            "delete": false
          }
        },
        "question_bank": {
          "panel": {
            "create": false,
            "view": true,
            "update": false,
            "delete": false
          }
        },
        "assessments": {
          "panel": {
            "create": false,
            "view": true,
            "update": false,
            "delete": false
          }
        }

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
    async createRole() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let payload = {
          name: this.name,
          note: this.note,
          permission: this.permissionData
        };
        const response = await AdminController.createRole(payload);
        if(response.status == 200 || response.status == 201) {
          window.location.href = '/#/roles'
        }
        this.loading = false;
      }
    },
    cancel() {
      window.location.href = '/#/roles'
    },
    async updateRole() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let payload = {
          name: this.name,
          note: this.note,
          permission: this.permissionData
        };
        const response = await AdminController.updateRole(payload, this.isEditId);
        console.log(response);
        if(response.status == 200 || response.status == 201) {
          window.location.href = '/#/roles'
        }
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    async getSingleRole(id) {
      let response = await AdminController.getSingleRole({ id: id });
      let result = response.data && response.data.data ? response.data.data : {};
      this.name = result.name;
      this.note = result.note;
      this.permissionData = result.permission;
      this.isEditId = id;
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getSingleRole(this.$route.params.id);
    }
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