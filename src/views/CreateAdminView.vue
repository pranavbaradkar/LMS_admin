<template>
  <v-container fluid class="pa-8">
    <div>
      <div class="row my-4 justify-space-between">
        <div class="col">
          <div class="text-h5">Admin User</div>
        </div>
      </div>

      <v-card class="secondary" elevation="0">
        <v-row>
          <v-col cols="">
            <v-card class="role-card mb-3 mt-0" max-width="1000" max-height="" outlined>
              <div class="pt-8">
                <v-form ref="form" lazy-validation>
                  <v-row class="ms-5 me-5 first-line-inputs">
                    <v-col cols="6">
                      <v-text-field outlined class="rounded-xl" v-model="first" label="First name*"
                        :rules="[v => !!v || 'First name is required']" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field outlined class="rounded-xl" v-model="last" label="Last Name*"
                        :rules="[v => !!v || 'Last name is required']" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="ms-5 me-5">
                    <v-col cols="6" class="email-input">
                      <v-text-field outlined class="rounded-xl" v-model="email" label="Email*"
                        :rules="[v => !!v || 'Email name is required']" required></v-text-field>
                    </v-col>
                    <v-col cols="6" class="email-input">
                      <v-text-field outlined class="rounded-xl" v-model="password" label="Password*"
                        :rules="[v => !!v || 'Password name is required']" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="ms-5 ">
                    <v-col cols="6">
                      <v-select :items="rolesList" v-model="role_id" label="Select Role*"  :rules="[v => !!v || 'Role is required']"  outlined class="rounded-xl" item-text="name" item-value="id"></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="ms-5 end-row mb-5">
                    <v-col cols="8">
                      <span>*All filled are mandatory</span>
                    </v-col>
                    <v-col cols="3" class="d-flex ">
                      <v-col cols="" class=" ">
                        <v-btn @click="redirectToHome()" rounded color="" class="transparent-btn">
                          Cancel
                        </v-btn>
                      </v-col>
                      <v-col cols="" class="">
                        <div class="text-center">
                          <v-btn  :loading="loading" @click="createUser()" rounded color="primary" class="black-btn" dark>
                            Create
                          </v-btn>
                        </div>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-form>
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
  name: "CreateAdminView",
  data() {
    return {
      rolesList: [],
      first: null,
      last: null,
      email: null,
      password: null,
      role_id: null,
      loading: false,
      role_type: 'USER'
    };
  },

  methods: {
    async getRoles() {
      let response = await AdminController.getRoles({ compact: true });
      console.log(response);
      this.rolesList = response.data && response.data.data ? response.data.data : []; 
    },
    async createUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let payload = {
          first: this.first,
          last: this.last,
          email: this.email,
          password: this.password,
          role_id: this.role_id,
          loading: false,
          role_type: 'USER'
        };

        const response = await AdminController.createUser(payload);
        if(response.status == 200 || response.status == 201) {
          window.location.href = '/#/admin-user'
        }
        this.loading = false;
      }
    },
    redirectToHome() {
      window.location.href = '/#/admin-user'
    }
  },
  created() {

    this.getRoles();
  },
};
</script>
<style></style>
