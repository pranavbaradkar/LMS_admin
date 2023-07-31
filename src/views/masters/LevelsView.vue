<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Levels</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center;">
      <v-col class="mb-1">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.levels &&
              user_permission.master.child.levels.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="(dialog = true), newLevelValue()"
          class="primary white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon> Create Level</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="secondary mb-8"
                >{{ formbtn() }} Level</v-card-title
              >
              <v-card-text class="px-6 pb-0">
                <v-text-field
                  outlined
                  class="rounded-xl"
                  v-model="name"
                  label="Enter Level*"
                  :rules="[(v) => !!v || 'Level is required']"
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="grades"
                  clearable
                  deletable-chips
                  label="Select or Search Grades"
                  outlined
                  class="rounded-xl"
                  small-chips
                  :items="gradeData"
                  multiple
                  item-text="name"
                  item-value="id"
                >
                </v-autocomplete>
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
        <!-- filter dialog-->
        <v-dialog v-model="filterDialog" max-width="400px">
          <v-card width="400px" height="100%">
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
                  <div class="pl-1 text-body1 font-weight-bold">FILTER</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <div
                    @click="clearFilter"
                    class="text-body1 font-weight-bold black--text cursor"
                  >
                    CLEAR FILTER
                  </div>
                </v-col>
              </v-row>
              <div>
                <v-card
                  height="450px"
                  elevation="0"
                  id="myScroll"
                  class="pt-5 ,pb-5"
                >
                  <v-row class="pl-1">
                    <v-col>
                      <div class="text-body1 font-weight-normal black--text">
                        Grades
                      </div>
                    </v-col>
                  </v-row>
                  <v-chip-group
                    v-model="selectedGradeFilter"
                    active-class="primary"
                    column
                    :multiple="true"
                  >
                    <v-chip
                      v-for="(gradeType, index) in gradeData"
                      :key="index"
                      :value="gradeType"
                      elevated
                    >
                      {{ gradeType.name }}
                    </v-chip>
                  </v-chip-group>
                </v-card>
                <div>
                  <v-card-actions class="px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn
                      rounded
                      outlined
                      class="pa-4"
                      @click="filterDialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      rounded
                      class="primary pa-4"
                      @click="filterLevel(selectedGradeFilter)"
                      >Apply</v-btn
                    >
                  </v-card-actions>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="d-flex" style="align-items: center">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          clearable
        ></v-text-field>
        <v-btn
          class="background_btn white--text mx-2"
          rounded-lg
          @click="filterDialog = true"
          ><v-icon>mdi-tune</v-icon>Filter</v-btn
        >
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.levels &&
              user_permission.master.child.levels.delete) ||
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
              user_permission.master.child.levels &&
              user_permission.master.child.levels.update) ||
            user.role_type == 'SUPER_ADMIN'
          "
          icon
          class="mr-2 pa-4"
          @click="updateData(item)"
        >
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.grade_`]="{ item }">
        <span v-for="data in item.gradeIds" :key="data.id"
          >{{ data.name }},
        </span>
      </template>
      <!-- v-for="data in item.gradeIds" :key="data.id" -->
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-container></v-container>
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-6 pb-0">Delete Level</p>
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
            <p class="text-h5 py-4">Level {{ formbtnValue() }}</p>
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
import AuthService from "@/services/AuthService";
import LevelController from "@/controllers/LevelController";
import GradeController from "@/controllers/GradeController";
export default {
  name: "LevelsView",
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
      name: null,
      grades: [],
      gradeData: [],
      singleSelect: false,
      editId: null,
      formbtnBool: false,
      loading: false,
      dLoading: false,
      deleteDialog: false,
      levelData: [],
      LOData: [],
      selected: [],
      filterDialog: false,
      selectedGradeFilter: [],
      filterData: false,
      search: "",
      searchBool: false,
      headers: [
        { text: "Level Names", value: "name" },
        { text: "Grades", value: "grade_" },
        // { text: "Created  On", value: "created_at" },
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
        if (this.filterData) {
          this.filterLevel(this.selectedGradeFilter);
        } else if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.getLevel();
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
        this.getLevel();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await LevelController.searchLevel(
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
      // selected id for edit
      this.formbtnBool = true; // change update/create btn value
      this.dialog = true;
      this.name = item.name;
      this.description = item.level_description;
      this.grades = item.gradeIds;
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      console.log(response);
      if (response.data.success) {
        this.gradeData = response.data.data.rows;
      } else {
        alert(response.data.error);
      }
    },

    newLevelValue() {
      this.name = "";
      this.description = "";
      this.grades = [];
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
          const response = await LevelController.createLevel({
            name: this.name,
            school_id: "-1",
            level_description: "NA",
            board_id: -1,
            gradeIds: this.grades,
          });
          console.log(response);
          res = response;
        } else {
          const response = await LevelController.updateLevel(
            {
              name: this.name,
              school_id: "-1",
              level_description: "NA",
              board_id: -1,
              gradeIds: this.grades,
            },
            this.editId
          );
          res = response;
          console.log(response);
        }
        // Close the dialog
        this.loading = false;
        this.formbtnBool == false;
        this.dialog = false;
        if (res.data.success) {
          this.successDialog = true;
          this.getLevel();
        } else {
          this.errorDialog = true;
          this.errorMessage = res.data.error;
        }
      }
    },

    async deleteData(data) {
      this.dLoading = true;
      if (data.length == 1) {
        // if block for single delete

        const response = await LevelController.deleteLevel(data[0].id);
        // if block for check resposne  status
        if (response.data.success) {
          this.getLevel();
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

        const response = await LevelController.deleteBulkLevel(ids);

        if (response.data.success) {
          this.getLevel();
        } else {
          alert(response.data.error);
        }
      }
      this.deleteDialog = false;
      this.dLoading = false;
      this.selected = [];
    },

    async getLevel() {
      const response = await LevelController.getLevelByPagination(
        this.pageSize,
        this.page
      );
      // this.levelData = response.data.data;
      if (response.data.success) {
        this.tableData = response.data.data.rows;
        console.log("table data", this.tableData);
        this.count = response.data.data.count;
      } else {
        alert(response.data.error);
      }

      // console.log("level data", this.levelData.rows);
    },
    clearFilter() {
      this.selectedGradeFilter = [];
      this.getLevel();
      this.filterDialog = false;
      this.filterData = false;
    },
    async filterLevel(selectGrades) {
      console.log("filter function call");
      var gradesIds = "";
      selectGrades.forEach((item) => {
        gradesIds = gradesIds + item.id + ",";
      });
      gradesIds = gradesIds.slice(0, -1);
      const response = await LevelController.filterLevel(
        gradesIds,
        this.pageSize,
        this.page
      );
      console.log(response);
      this.filterDialog = false;
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      console.log("GradeIds", gradesIds);
      this.count = response.data.data.count;
      this.filterData = true;
    },
  },
  created() {
    this.getLevel();
    this.getGrades();
  },
};
</script>
<style></style>
