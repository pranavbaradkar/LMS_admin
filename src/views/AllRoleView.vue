<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Roles</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="d-flex align-center">
        <v-btn to="/role/create" class="primary white--text" large rounded-lg
          ><v-icon>mdi-plus</v-icon>Create Role</v-btn
        >
      </v-col>
      <v-col class="d-flex" style="align-items: center">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          v-model="search"
        ></v-text-field>
        <v-btn
          class="primary white--text mx-2"
          :disabled="selected.length == 0"
          rounded-lg
          @click="deleteDialog = true"
          ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
        ><v-btn class="primary white--text mx-2" rounded-lg
          ><v-icon>mdi-export</v-icon>Export</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tableData"
      show-select
      :single-select="singleSelect"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20, 50, 100],
      }"
      :server-items-length="count"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{ getDate(item.created_at) }}
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
            @click="
              () => {
                deleteDialog = true;
                selected = item;
              }
            "
            width="36px"
            height="36"
            class="cursor"
            src="../assets/userdelete.svg"
          />
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-container></v-container>
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-6 pb-0">Delete Roles</p>
            <p
              class="text-disabled grey--text text-subtitle-1 pt-3"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
              This action will permanently delete the item. This cannot be
              undone, please check the association with users.
            </p>

            <div class="d-flex justify-space-between pt-4 pb-2" fluid>
              <v-btn
                depressed
                class="secondary black--text"
                large
                width="157px"
                rounded
                @click="deleteDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="black white--text"
                depressed
                large
                width="157px"
                :loading="dLoading"
                rounded
                @click="deleteRole()"
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="error" size="96">mdi-close-circle-outline</v-icon>
            <p class="text-h5 pt-2 font-weight-medium">Error</p>
            <p class="text-h6 py-3 font-weight-regular">{{ errorMessage }}</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="errorDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import AdminController from "@/controllers/AdminController";

export default {
  name: "AllRoleView",
  data() {
    return {
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      errorDialog: false,
      successDialog: false,
      errorMessage: "",
      dialog: false,
      dialogTitle: "Dialog Title",
      name: "",
      description: "",
      editId: null,
      singleSelect: false,
      deleteDialog: false,
      dLoading: false,
      roleData: null,
      formbtnBool: false,
      selected: [],
      search: "",
      searchBool: false,
      headers: [
        { text: "Role Name", value: "name" },
        { text: "Note", value: "note" },
        { text: "Created  On", value: "created_at" },
        { text: "Actions", value: "actions", cellClass: "w-10" },
      ],
      tableData: [],
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  watch: {},
  methods: {
    async searchData(search) {
      console.log(search);
    },
    getDate(timeStamp) {
      return new Date(timeStamp).toString().substring(0, 16);
    },
    updateData(item) {
      this.editId = item.id; // selected id for edit
      this.formbtnBool = true; // change update/create btn value
      this.dialog = true;
      this.name = item.name;
      this.description = item.description;
    },

    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    formbtnValue() {
      return this.formbtnBool === false ? "Created" : "Updated";
    },
    redirectToEdit(item) {
      window.location.href = `/#/role/edit/${item.id}`;
    },
    async fetchAllRoles() {
      const response = await AdminController.getRoles();
      if (response.data.success) {
        this.roleData = response.data.data;
        this.tableData = this.roleData;
        this.count = this.tableData.length;
      } else {
        // alert(response.data.error)
      }
    },
    async deleteRole() {
      var response;
      response = await AdminController.deleteRole(this.selected.id);
      if (response.data.success) {
        this.selected = {};
      }
      this.fetchAllRoles();
      this.deleteDialog = false;
    },
  },
  created() {
    this.fetchAllRoles();
  },
};
</script>
<style></style>
