<template>
  <!-- author: suraj -->
  <div class="background">
    <v-app-bar color="transparent" class="rounded-xl" elevation="0" absolute height="120">
      <v-list-item class="ml-8">
        <v-list-item-icon>
          <v-img src="../assets/logo.svg" height="48px" width="178px"></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col
        cols="12"
        lg="12"
        md="12"
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <v-card width="426" height="auto">
          <div class="text-center pt-3 pl-8 pr-8">
            <img
              src="../assets/icon.svg"
              class="pt-3"
              width="70px"
              height="70px"
            />
            <v-card-title class="justify-center">
              <h3>Log In</h3>
            </v-card-title>

            <v-form v-model="valid">
              <v-text-field
                label="Enter Email Id"
                placeholder=" Enter Email Id"
                outlined
                v-model="email"
                :rules="emailRules"
                class="rounded-xl"
              ></v-text-field>

              <v-text-field
                label="Password"
                placeholder=" Password"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                :rules="[rules.required, rules.min]"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                v-model="password"
                class="rounded-xl"
                @keydown.enter="login"
              ></v-text-field>
              <v-btn
                @click.prevent="login"
                color="#000000DE"
                class="white--text mb-2"
                rounded
                large
                width="100%"
                height="36px"
              >
                LOG IN
              </v-btn>

              <!-- -------------------------------Confirm Password block start --------------------------------  -->
              <!-- <div v-if="cnfpasswd">
                <div class="text--disabled text-start font-weight-regular">
                  Password
                </div>
                <v-text-field
                  label="Password"
                  placeholder=" Password"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[rules.required, rules.min]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  elevation-0
                  solo
                  outlined
                  v-model="password"
                  class="rounded-xl"
                ></v-text-field>

                <div class="text--disabled text-start font-weight-regular">
                  Password
                </div>
                <v-text-field
                  label="Password"
                  placeholder=" Password"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[rules.required, rules.min]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  elevation-0
                  solo
                  outlined
                  v-model="password"
                  class="rounded-xl"
                ></v-text-field>
              </div> -->
              <!-- -------------------------------Conform Password block end --------------------------------  -->
            </v-form>

            <v-card-title class="justify-center secondary--text cursor mb-4">
              <h5
                class="light-blue--text darken-3 cursor"
                @click="forgetBool = true"
              >
                Forgot Password?
              </h5>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import AuthService from "@/services/AuthService";
import "../styles.css";
export default {
  components: {},
  name: "LoginView",
  data() {
    return {
      cnfpasswd: false,
      forgetBool: false,
      phoneNumber: "",
      ctList: false,
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      show2: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async login() {
      const response = await AuthService.login(this.email, this.password);
      console.log(response);
      if (response) {
        this.$router.push("/");
      } else {
        alert("Invalid Login");
      }
    },
  },
  created() {
    if (AuthService.isAuthenticated()) {
      if (this.$route.path !== "/") this.$router.replace("/");
    }
  },
};
</script>