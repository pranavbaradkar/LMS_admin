<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">LO Bank</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-2">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.los_bank &&
              user_permission.master.child.los_bank.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="(dialog = true), newLOBankCreate()"
          class="background_btn white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon>Create Learning Objective</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="secondary mb-8"
                >{{ formbtn() }} Learning Objective</v-card-title
              >
              <v-card-text class="px-6 pb-0">
                <v-row class="py-0">
                  <v-col class="py-0" cols="3">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="lOCode"
                      label="LO Code *"
                      @keypress="filter(event)"
                      :rules="[(v) => !!v || 'LO Code is required']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="9">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="title"
                      label="LO Title *"
                      :rules="[(v) => !!v || 'LO Title is required']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="py-0">
                  <v-col class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                  @click="saveInputs"
                  class="primary pa-4"
                  :loading="loading"
                  >{{ formbtn() }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-col>
      <v-col class="d-flex" style="align-items: center">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          v-model="search"
        ></v-text-field>
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.los_bank &&
              user_permission.master.child.los_bank.delete) ||
            user.role_type == 'SUPER_ADMIN'
          "
          class="background_btn white--text mx-2"
          rounded-lg
          :disabled="selected.length == 0"
          @click="deleteDialog = true"
          ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
        ><v-btn class="background_btn white--text mx-2" rounded-lg
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
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.los_bank &&
              user_permission.master.child.los_bank.update) ||
            user.role_type == 'SUPER_ADMIN'
          "
          icon
          class="mr-2 pa-4"
          @click="updateData(item)"
        >
        <img src="./../../assets/edits.svg" alt="Edit Icon" />
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-container></v-container>
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-6 pb-0">Delete LOBank</p>
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
                rounded
                :loading="dLoading"
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
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Skill {{ formbtnValue() }}</p>
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
import LoBankController from "@/controllers/LoBankController";
import AuthService from "@/services/AuthService";
export default {
  name: "LoBankView",
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
      title: null,
      description: null,
      formbtnBool: false,
      singleSelect: false,
      deleteDialog: false,
      dLoading: false,
      lOCode: null,
      loading: false,
      selected: [],
      LOData: null,
      search: "",
      searchBool: false,
      editId: null,
      headers: [
        { text: "LO Code", value: "io_code" },
        { text: "LO Title", value: "name" },
        // { text: "Subject Category", value: "subjectCategory" },
        { text: "Created  On", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
      tableData: [],
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  computed: {
    user() {
      return AuthService.getLoggedUser();
    },
    user_permission() {
      return AuthService.getPermissions();
    },
  },
  watch: {
    options: {
      handler() {
        console.log(this.options);
        this.pageSize = this.options.itemsPerPage;
        this.page = this.options.page;
        if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.getLO();
        }
      },
      deep: true,
    },
    search(newValue) {
      console.log(newValue);
      this.searchBool = true;
      this.pageSize = this.options.itemsPerPage;
      this.page = this.options.page;
      this.options.page = 1;
      this.searchData(newValue);
      if (newValue == "" || newValue == null) {
        this.getLO();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await LoBankController.searchLoBank(
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
      this.editId = item.id;
      this.formbtnBool = true; // change update/create btn value
      console.log("data id", item.id);
      this.dialog = true;
      this.lOCode = item.io_code;
      this.title = item.name;
    },
    filter: function (evt) {
      evt = evt ? evt : window.event;
      let expect = evt.target.value.toString() + evt.key.toString();

      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    newLOBankCreate() {
      this.lOCode = "";
      this.title = "";
      this.description = "";
      this.formbtnBool = false;
    },

    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    formbtnValue() {
      return this.formbtnBool === false ? "Created" : "Updated";
    },

    async saveInputs() {
      if (this.$refs.form.validate()) {
        var res;
        this.loading = true;
        // checking case for update/create
        if (this.formbtnBool == false) {
          const response = await LoBankController.createLO(
            this.lOCode,
            this.title
          );
          console.log(response);
          res = response;
        } else {
          const response = await LoBankController.updateLO(
            this.lOCode,
            this.title,
            this.editId
          );
          console.log(response);
          res = response;
        }
        // Close the dialog
        this.formbtnBool == false;
        this.dialog = false;
        if (res.data.success) {
          this.successDialog = true;
        } else {
          this.errorDialog = true;
          this.errorMessage = res.data.error;
        }
        this.getLO();
        this.loading = false;
      }
    },

    async deleteData(data) {
      if (data.length == 1) {
        this.dLoading = true;
        const response = await LoBankController.deleteLO(data[0].id);
        // if block for check delete status
        if (response.data.success) {
          this.getLO();
        } else {
          alert(response.data.error);
        }
      } else {
        // else block for bulk delete
        var ids = "";
        for (var i = 0; i < data.length; i++) {
          ids = ids + data[i].id;
          if (i != data.length - 1) {
            ids = ids + ",";
          }
        }
        this.dLoading = true;
        const response = await LoBankController.deleteBulkLO(ids);
        if (response.data.success) {
          this.getLO();
        } else {
          alert(response.data.error);
        }
      }
      this.deleteDialog = false;
      this.dLoading = false;
      this.selected = [];
    },

    async getLO() {
      const response = await LoBankController.getLOByPagination(
        this.pageSize,
        this.page
      );
      if (response.data.success) {
        console.log(response);
        this.LOData = response.data.data;
        this.tableData = this.LOData.rows;
        this.count = response.data.data.count;
        console.log(this.LOData.rows);
      } else {
        alert(response.data.error);
      }
    },
  },
  created() {
    this.getLO();
  },
};
</script>
<style></style>
