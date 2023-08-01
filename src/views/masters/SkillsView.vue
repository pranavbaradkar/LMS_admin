<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Skills</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-1">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.skills &&
              user_permission.master.child.skills.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="(dialog = true), newCreateSkills()"
          class="background_btn white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon>Create Skill</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="lightPurple mb-8"
                >{{ formbtn() }} Skill</v-card-title
              >
              <v-card-text class="py-0 px-6">
                <v-row class="py-0">
                  <v-col class="py-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="name"
                      label="Skill Name*"
                      :rules="[(v) => !!v || 'Skill Name is required']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="">
                    <v-autocomplete
                      v-model="selectedSubjects"
                      clearable
                      deletable-chips
                      label="Select or Search Subject"
                      outlined
                      class="rounded-xl"
                      small-chips
                      :items="subjects"
                      multiple
                      item-text="name"
                      item-value="id"
                    >
                      <v-list-item
                        slot="prepend-item"
                        ripple
                        @click="selectAll"
                      >
                        <v-checkbox
                          @click="selectAll"
                          :value="selectedSubjects.length == subjects.length"
                        >
                        </v-checkbox>
                        <v-btn text @click="selectAll">Select all</v-btn>
                      </v-list-item>
                      <v-divider slot="prepend-item" class="mt-2" />
                    </v-autocomplete>
                  </v-col> </v-row
              ></v-card-text>
              <v-card-text class="pb-5 px-6">
                <div style="size: 18px; color: black">
                  Select range for Competency Level
                </div>
              </v-card-text>
              <v-card-text class="py-0 my-0 px-6">
                <v-row class="py-0">
                  <v-col cols="3" class="py-0">
                    <div class="mt-4">Novice</div>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      v-model="novicMin"
                      class="rounded-xl py-0"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                  <v-col fluid cols="3" class="py-0">
                    <v-text-field
                      outlined
                      v-model="novicMax"
                      class="rounded-xl py-0"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="py-0">
                  <v-col cols="3" class="py-0">
                    <div class="mt-4">Advance beginner</div>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="advBegMin"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="advBegMax"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="py-0">
                  <v-col cols="3" class="py-0">
                    <div class="mt-4">Competent</div>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="competentMin"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="competentMax"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="py-0">
                  <v-col cols="3" class="py-0">
                    <div class="mt-4">Proficient</div>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="proficientMin"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="proficientMax"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="py-0">
                  <v-col cols="3" class="py-0">
                    <div class="mt-4">Expert</div>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="expertMin"
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="expertMax"
                      suffix="%"
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
                  class="purple-button-light lightPurple purple-button-light-height-large pa-4"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  width="102px"
                  height="48px"
                  rounded-lg
                  @click="saveInputs"
                  class="primary pa-4"
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
          v-model="search"
          clearable
        ></v-text-field>
        <v-btn
          class="purple-button-light lightPurple purple-button-light-height-large mx-2"
          rounded
          @click="filterDialog = true"
          ><v-icon>mdi-tune</v-icon>Filter</v-btn
        ><v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.skills &&
              user_permission.master.child.skills.delete) ||
            user.role_type == 'SUPER_ADMIN'
          "
          class="purple-button-light lightPurple purple-button-light-height-large mx-2"
          rounded
          :disabled="selected.length == 0"
          @click="deleteDialog = true"
        >
          <!-- <v-icon>mdi-trash-can-outline</v-icon> -->
          <img src="./../../assets/Delete.svg" alt="" />
          Delete</v-btn
        ><v-btn
          class="purple-button-light lightPurple purple-button-light-height-large mx-2"
          rounded
          ><v-icon>mdi-export</v-icon>Export</v-btn
        >
        <v-dialog v-model="deleteDialog" max-width="366px" persistent>
          <v-card fluid>
            <v-container fluid class="pa-0">
              <v-container></v-container>
              <v-card-text class="text-center">
                <v-icon size="70" class="pt-4">mdi-trash-can-outline</v-icon>
                <p class="text-h5 pt-6 pb-0">Delete Skill</p>
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
                    :disabled="selected.length == 0"
                    @click="deleteData(selected)"
                    >DELETE</v-btn
                  >
                </div>
              </v-card-text>
            </v-container>
          </v-card>
        </v-dialog>
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
              user_permission.master.child.skills &&
              user_permission.master.child.skills.update) ||
            user.role_type == 'SUPER_ADMIN'
          "
          icon
          class="mr-2 pa-4"
          @click="updateData(item)"
        >
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.subject`]="{ item }">
        <span v-for="data in item.subject_skills" :key="data.id"
          >{{ data.name }},
        </span>
      </template>
    </v-data-table>
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
            <p v-if="formbtnBool" class="text-h5 py-4">Skill Updated</p>

            <p v-else class="text-h5 py-4">New Skill Created</p>
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
                    Subject
                  </div>
                </v-col>
              </v-row>
              <v-chip-group
                v-model="selectedSubjectFilter"
                active-class="primary"
                column
                :multiple="true"
              >
                <v-chip
                  v-for="(SubjectType, index) in subjects"
                  :key="index"
                  :value="SubjectType"
                  elevated
                >
                  {{ SubjectType.name }}
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
                  @click="filterSkills(selectedSubjectFilter)"
                  >Apply</v-btn
                >
              </v-card-actions>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import SkillsController from "@/controllers/SkillsController";
import AuthService from "@/services/AuthService";
import SubjectController from "@/controllers/SubjectController";
export default {
  name: "SkillsView",
  data() {
    return {
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      errorDialog: false,
      successDialog: false,
      deleteDialog: false,
      dialog: false,
      dialogTitle: "Dialog Title",
      name: "",
      errorMessage: "",
      novicMin: null,
      novicMax: null,
      advBegMin: null,
      advBegMax: null,
      competentMin: null,
      competentMax: null,
      proficientMin: null,
      proficientMax: null,
      roficientMax: null,
      expertMin: null,
      expertMax: null,
      selectedSubjects: [],
      filterData: false,
      boards: [],
      board: null,
      formbtnBool: false,
      skillsData: null,
      singleSelect: false,
      selected: [],
      filterDialog: false,
      selectedSubjectFilter: [],
      subjects: [],
      search: "",
      searchBool: false,
      headers: [
        { text: "Skill Name", value: "name" },
        { text: "Subjects", value: "subject" },
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
        if (this.filterData) {
          this.filterSkills(this.selectedSubjectFilter);
        } else if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.getSkills();
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
        this.getSkills();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await SkillsController.searchSkills(
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
      this.name = item.name;
      this.selectedSubjects = item.subject_skills.map((obj) => obj.id);
      console.log(item);
      this.formbtnBool = true; // change update/create btn value
      this.dialog = true;
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      this.subjects = response.data.data.rows;
    },
    async newCreateSkills() {
      this.name = null;
      this.selectedSubjects = [];
      this.formbtnBool = false;
    },

    async saveInputs() {
      if (this.$refs.form.validate()) {
        var res;
        // checking case for update/create
        if (this.formbtnBool == false) {
          const response = await SkillsController.createSkills({
            name: this.name,
            description: "NA",
            novice_min: this.novicMin,
            novice_max: this.novicMax,
            advance_begineer_min: this.advBegMin,
            advance_begineer_max: this.advBegMax,
            competent_min: this.competentMin,
            competent_max: this.competentMax,
            proficient_min: this.proficientMin,
            proficient_max: this.proficientMax,
            expert_min: this.expertMin,
            expert_max: this.expertMax,
            subject_ids: this.selectedSubjects,
          });
          console.log("create cate", response);
          res = response;
        } else {
          const response = await SkillsController.updateSkills(
            {
              name: this.name,
              description: "NA",
              grade_id: -1,
              level_id: -1,
              novice_min: this.novicMin,
              novice_max: this.novicMax,
              advance_begineer_min: this.advBegMin,
              advance_begineer_max: this.advBegMax,
              competent_min: this.competentMin,
              competent_max: this.competentMax,
              proficient_min: this.proficientMin,
              proficient_max: this.proficientMax,
              expert_min: this.expertMin,
              expert_max: this.expertMax,
              subject_ids: this.selectedSubjects,
            },
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
        this.getSkills();
      }
    },
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    selectAll() {
      // Copy all v-select's items in your selectedItem array
      this.selectedSubjects = this.subjects.map((obj) => obj.id);
    },
    async getSkills() {
      const response = await SkillsController.getSkillsByPagination(
        this.pageSize,
        this.page
      );
      console.log(response);
      this.skillsData = response.data.data;
      this.tableData = this.skillsData.rows;
      this.count = response.data.data.count;
    },
    async deleteData(data) {
      if (data.length == 1) {
        const response = await SkillsController.deleteSkills(data[0].id);
        this.getSkills();
        console.log(response);
        this.deleteDialog = false;
        this.selected.length = 0;
      } else {
        var ids = "";
        for (var i = 0; i < data.length; i++) {
          ids = ids + data[i].id;
          if (i != data.length - 1) {
            ids = ids + ",";
          }
        }
        const response = await SkillsController.deleteBulkSkills(ids);
        this.getSkills();
        console.log(response);
        this.deleteDialog = false;
        this.selected.length = 0;
      }
    },
    clearFilter() {
      this.selectedSubjectFilter = [];
      this.filterDialog = false;
      this.getSkills();
      this.filterData = false;
    },
    async filterSkills(selectSubject) {
      console.log("filter function call");
      var subjectIds = "";
      selectSubject.forEach((item) => {
        subjectIds = subjectIds + item.id + ",";
      });
      subjectIds = subjectIds.slice(0, -1);
      const response = await SkillsController.filterSkills(
        subjectIds,
        this.pageSize,
        this.page
      );
      console.log(response);
      this.filterDialog = false;
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      console.log("GradeIds", subjectIds);
      this.count = response.data.data.count;
      this.filterData = true;
    },
  },
  created() {
    this.getSkills();
    this.getSubjects();
  },
};
</script>
<style></style>
