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
                        :rules="[v => (
                          !!v || isEditId > 0) || 'Password name is required',
                          v => ( v && v.length >= 8 ) || 'This field must have atleast 8 characters']" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="ms-5 ">
                    <v-col cols="6">
                      <v-select :items="rolesList" v-model="role_id" label="Select Role*"  :rules="[v => !!v || 'Role is required']"  outlined class="rounded-xl" item-text="name" item-value="id"></v-select>
                    </v-col>
                    <v-col cols="5">
                      <v-select :items="schoolList" v-model="school_id"   multiple type="checkbox" label="School List"  :rules="[v => !!v || 'School is required']"  outlined class="rounded-xl" item-text="name" item-value="id"></v-select>
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
                          <v-btn  :loading="loading" @click="() => {
                            isEditId > 0 ? updateUser() : createUser()
                          }" rounded color="primary" class="black-btn" dark>
                            {{ isEditId > 0 ? 'Update' : 'Create'}}
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
import SchoolController from "@/controllers/SchoolController";
export default {
  name: "CreateAdminView",
  data() {
    return {
      rolesList: [],
      schoolList:[],
      first: null,
      last: null,
      email: null,
      password: null,
      role_id: null,
      loading: false,
      role_type: 'USER',
      isEditId: 0,
      originEmail: null
    };
  },

  methods: {
    async getRoles() {
      let response = await AdminController.getRoles({ compact: true });
      console.log(response);
      this.rolesList = response.data && response.data.data ? response.data.data : []; 
    },
    async getSchool() {
      let response = await SchoolController.getSchool({ compact: true });
      this.schoolList = response.data && response.data.data ? response.data.data.rows : [];
      console.log(response);
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
          window.location.href = '/#/admins'
        }
        this.loading = false;
      }
    },
    async updateUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let payload = {
          first: this.first,
          last: this.last,
          role_id: this.role_id,
          loading: false,
          role_type: 'USER'
        };
        if(this.originEmail != this.email) {
          payload.email = this.email;
        }
        if(this.password) {
          payload.password = this.password;
        }
        const response = await AdminController.updateUser(payload, this.isEditId);
        console.log(response);
        if(response.status == 200 || response.status == 201) {
          window.location.href = '/#/admins'
        }
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    async getSingleUser(id) {
      let response = await AdminController.getSingleUsers({ id: id });
      let result = response.data && response.data.data ? response.data.data : {};
      this.first = result.first;
      this.last = result.last;
      this.email = result.email;
      this.originEmail = result.email;
      this.role_id = result.role_id; 
      this.isEditId = id;
    },
   
    redirectToHome() {
      window.location.href = '/#/admins'
    }
    
  },
  created() {

    this.getRoles();
    if (this.$route.params.id) {
      this.getSingleUser(this.$route.params.id);
    }
    this.getSchool();
    if (this.$route.params.id) {
      this.getSchool(this.$route.params.id);
    }
  },
};
</script>
<style></style>
