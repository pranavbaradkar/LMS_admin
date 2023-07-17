<template>
  <v-container fluid class="pa-8">
    <v-row>
      <v-col>
        <v-btn to="/create-role" class="primary" large rounded
          ><v-icon>mdi-plus</v-icon>Create Role</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="secondary mb-8">
                {{ formbtn() }} Role</v-card-title
              >
              <v-card-text class="px-6 pb-0">
                <v-text-field
                  outlined
                  class="rounded-xl"
                  v-model="name"
                  label="Enter Role*"
                  :rules="[(v) => !!v || 'Brand name is required']"
                  required
                ></v-text-field>
                <v-text-field
                  outlined
                  class="rounded-xl"
                  v-model="description"
                  label="Description*"
                  :rules="[(v) => !!v || 'Brand description is required']"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="px-6 pb-6">
                <small>*All fields are mandatory</small>
                <v-spacer></v-spacer>
                <v-btn
                  width="102px"
                  height="48px"
                  rounded
                  outlined
                  class="pa-4"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  width="102px"
                  height="48px"
                  rounded
                  class="primary pa-4"
                  >{{ formbtn() }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          v-model="search"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row justify="space-between" class="my-4">
      <v-col>
        <div class="text-h5">Roles</div>
      </v-col>

      <v-col>
        <v-row justify="end">
          <v-btn
            class="primary mx-2"
            :disabled="selected.length == 0"
            rounded
            @click="deleteDialog = true"
            ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
          ><v-btn class="primary mx-2" rounded
            ><v-icon>mdi-export</v-icon>Export</v-btn
          >
        </v-row>
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
        <v-btn icon class="mr-2 pa-4" @click="updateData(item)">
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
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

            <p class="text-h5 pt-6 pb-0">Delete Brands</p>
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
                @click="deleteData(selected)"
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

    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="#228B22" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Brand {{ formbtnValue() }}</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="successDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import RolesController from "@/controllers/RolesController";

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
        { text: "Created  On", value: "created_at" },
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
      const response = await RolesController.searchBrand(
        this.pageSize,
        this.page,
        search
      );
      console.log(response.data);
      console.log(this.searchBool);
      this.count = response.data.data.count;
      this.tableData = response.data.data.rows;
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

    async fetchAllRoles() {
      const response = await RolesController.getAllRolesByPagination(this.pageSize,
        this.page);
      
      if (response.data.success) {
        this.roleData = response.data.data;
      this.tableData = this.roleData.rows;
      this.count = response.data.data.count;
      }
      else {
        alert(response.data.error)
      }
    },
  },
  created() {
    this.fetchAllRoles();
  },
};
</script>
<style></style>
