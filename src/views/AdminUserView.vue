<template>
  <v-container fluid class="pa-8">
    <v-row>
      <v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="primary"
              large
              rounded
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              to="/admin/create"
            >
              <v-icon>mdi-account-plus</v-icon>
              <div class="pl-1">Create User</div>
            </v-btn>
          </template>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          clearable
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row justify="space-between" class="my-4">
      <v-col cols="4" sm="4" md="4">
        <div class="text-h5">All Users</div>
      </v-col>

      <v-col cols="8" sm="8" md="8">
        <v-row justify="end">
          <!-- <v-btn class="primary mx-2" rounded @click="filterDialog = true"><v-icon>mdi-tune</v-icon>Filter</v-btn> -->
          <v-btn
            class="primary mx-2"
            rounded
            :disabled="selected.length == 0"
            ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
          >
          <!-- <v-btn
            class="primary mx-2"
            rounded
            @click="resendInvite"
            :disabled="selected.length == 0"
            ><v-icon>mdi-email-sync-outline</v-icon>Resend Invite</v-btn
          > -->
          
          <v-btn class="primary mx-2" rounded
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
        itemsPerPageOptions: [10, 25, 50, 100],
      }"
      :server-items-length="count"
      class="usertable"
    >
      <template v-slot:[`item.first`]="{ item }">
        {{ item.first + " " + item.last }}
      </template>
      <template v-slot:[`item.role`]="{ item }">
        {{ item.role.name }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex flex-row">
          <img
            width="36px"
            height="36"
            @click="redirectToEdit(item)"
            class="cursor"
            src="../assets/edit.svg"
          />
          <img
            @click="() => {
              deleteDialog = true
              selected = item
            }"
            width="36px"
            height="36"
            class="cursor"
            src="../assets/userdelete.svg"
          />
        </div>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
    </v-data-table>

    <!-- Success Dialog -->


    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-container></v-container>
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>
            <p class="text-h5 pt-6 pb-0">Delete Admin User</p>
            <p
              class="text-disabled grey--text text-subtitle-1 pt-3"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between pt-4 pb-2" fluid>
              <v-btn
                depressed
                class="secondary black--text"
                large
                width="157px"
                rounded
                @click="
                  () => {
                    deleteDialog = false;
                    formbtnBool = false;
                  }
                "
                >CANCEL</v-btn
              >
              <v-btn
                class="black white--text"
                depressed
                large
                width="157px"
                rounded
                @click="deleteUser()"
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    
  </v-container>

  

</template>
<script>
import "../styles.css";
import AdminController from "@/controllers/AdminController";

export default {
  name: "AdminUserView",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
      },
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      singleSelect: false,
      deleteDialog: false,
      users: [],
      selected: {},
      search:"",
      headers: [
        { text: "Full Name", value: "first", cellClass: "w-10" },
        { text: "Email ID", value: "email", cellClass: "w-15" },
        { text: "Created On", value: "created_at", cellClass: "w-15" },
        { text: "Status", value: "status", cellClass: "w-15" },
        { text: "Role", value: "role", cellClass: "w-15" },
        { text: "Actions", value: "actions", cellClass: "w-10" },
      ]
    };
  },
 
  methods: {
    getDate(timeStamp) {
      return new Date(timeStamp).toString().substring(0, 16);
    },
  

    async getUsers() {
      const response = await AdminController.getUsers();
      this.users = response.data.data;
      this.count = this.users.length;
      console.log(this.users);
    },
    redirectToEdit(item) {
      window.location.href=`/#/admin/edit/${item.id}`
    },  
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },

    async deleteUser() {
      var response;
      // if (items.length == 1) {
        response = await AdminController.deleteUser(this.selected.id);
      // } else {
      //   var ids = "";

      //   for (var i = 0; i < items.length; i++) {
      //     ids = ids + items[i].id;
      //     if (i != items.length - 1) {
      //       ids = ids + ",";
      //     }
      //   }
      //   // console.log("id in string", ids)
      //   response = await UsersController.bulkDeleteUser(ids);
      // }
      if (response.data.success) {
        this.selected = {};
      }
      this.getUsers();
      this.deleteDialog = false;
    },


  },

  created() {
    this.getUsers();
  },
};
</script>
<style scoped></style>
