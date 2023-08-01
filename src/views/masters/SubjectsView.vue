<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">subject</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-1">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.subject &&
              user_permission.master.child.subject.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="(dialog = true), newSubjectCreate()"
          class="background_btn white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon>Create Subject</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="lightPurple mb-8"
                >{{ formbtn() }} Subject</v-card-title
              >
              <!---------------------- subject upload section starts here --------------------------->

              <v-list-item-title class="text-center mb-4">
                Upload subject icon<sup>*</sup>
              </v-list-item-title>

              <div class="d-flex justify-center mb-6 bg-surface-variant">
                <div class="box" @dragover.prevent @drop="onDrop" v-if="!image">
                  <div class="uploadrow">
                    <div class="uploadleft">
                      <v-icon class="uploadicon">mdi-tray-arrow-up</v-icon>
                    </div>
                    <div class="uploadright">
                      <div>
                        <p class="font-weight-light">Drag .png or .svg here</p>
                        <p class="font-weight-light">OR</p>
                        <div class="font-weight-light">
                          <div class="uplaodbtn">
                            Click here
                            <input
                              type="file"
                              name="image"
                              @change="onChange"
                            />
                          </div>
                          to browse(512 Kb max.)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div v-if="image">
                  <div class="imgback">
                    <img
                      :src="image"
                      alt=""
                      width="100"
                      height="auto"
                      class="img"
                    />
                    <div class="pencil">
                      <v-icon class="editpen">mdi-pencil-circle</v-icon>
                      <input
                        class="editlogo"
                        type="file"
                        name="image"
                        @change="onChange"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <v-card-text class="px-6 pb-0">
                <v-row no-gutters>
                  <v-col cols="6" sm="6">
                    <div class="pr-2">
                      <v-text-field
                        outlined
                        class="rounded-xl"
                        v-model="subName"
                        label="Subject Name*"
                        :rules="[(v) => !!v || 'Subject Name is required']"
                        required
                      ></v-text-field>
                    </div>
                  </v-col>

                  <v-col cols="6" sm="6">
                    <div class="pl-2">
                      <v-select
                        :items="subCategory"
                        item-text="category"
                        class="rounded-xl"
                        label="Subject Category*"
                        v-model="subCat"
                        item-value="id"
                        outlined
                        :rules="[(v) => !!v || 'Subject Category is required']"
                        required
                      ></v-select>
                    </div>
                  </v-col>
                </v-row>

                <!---------------------- subject upload section ends here --------------------------->
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
                  :disabled="selectedFile == null"
                  width="102px"
                  height="48px"
                  rounded-lg
                  @click="getPreSignedUrl"
                  class="primary pa-4"
                  :loading="loading"
                  >{{ formbtn() }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="366px" persistent>
          <v-card fluid>
            <v-container fluid class="pa-0">
              <v-card-text class="text-center">
                <v-container></v-container>
                <v-avatar color="secondary" size="90"
                  ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
                >

                <p class="text-h5 pt-6 pb-0">Delete Subject</p>
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
                    :loading="dLoading"
                    large
                    width="157px"
                    rounded
                    @click="deleteData(selected)"
                    >DELETE</v-btn
                  >
                </div>
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
                        Subject Category
                      </div>
                    </v-col>
                  </v-row>
                  <v-chip-group
                    v-model="selectedSubjectCatFilter"
                    active-class="primary"
                    column
                    :multiple="true"
                  >
                    <v-chip
                      v-for="(SubCatType, index) in subCategory"
                      :key="index"
                      :value="SubCatType"
                      elevated
                    >
                      {{ SubCatType.name }}
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
                      @click="filterSubject(selectedSubjectCatFilter)"
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
          v-model="search"
          clearable
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-btn
          class="purple-button-light lightPurple purple-button-light-height-large mx-2"
          rounded
          @click="filterDialog = true"
          ><v-icon>mdi-tune</v-icon>Filter</v-btn
        ><v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.subject &&
              user_permission.master.child.subject.delete) ||
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
              user_permission.master.child.subject &&
              user_permission.master.child.subject.update) ||
            user.role_type == 'SUPER_ADMIN'
          "
          icon
          class="mr-2 pa-4"
          @click="updateData(item)"
        >
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.icon`]="{ item }">
        <v-img
          height="30px"
          width="30px"
          :src="item.icon"
          class="pa-6 bg-secondary rounded-circle d-inline-block"
        ></v-img>
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
            <p class="text-h5 py-4">Subject {{ formbtnValue() }}</p>
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
import UploadController from "@/controllers/UploadController";
import AuthService from "@/services/AuthService";
import SubjectController from "@/controllers/SubjectController";
import SubjectCategoryController from "@/controllers/SubjectCategoryController";
export default {
  name: "SubjectsView",
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
      subName: "",
      preSignedUrl: "",
      selectedFile: null,
      iconURl: "NA",
      dLoading: false,
      subCat: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      image: "",
      formbtnBool: false,
      subCategory: [],
      loading: false,
      singleSelect: false,
      deleteDialog: false,
      selected: [],
      subjectData: null,
      filterDialog: false,
      selectedSubjectCatFilter: [],
      filterData: false,
      search: "",
      searchBool: false,
      headers: [
        { text: "Subject Icon", value: "icon" },
        { text: "Subject Name", value: "name" },
        { text: "Subject Category", value: "subject_category.name" },
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
          this.filterSubject(this.selectedSubjectCatFilter);
        } else if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.getSubjects();
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
      this.searchData(this.search);
      if (newValue == "" || newValue == null) {
        this.getSubjects();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await SubjectController.searchSubject(
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
      this.subName = item.name;
      this.subCat = item.subject_category_id;
      this.image = item.icon;
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
          const response = await SubjectController.createSubject(
            this.subName,
            this.subCat,
            this.iconURl
          );
          console.log(response);
          res = response;
        } else {
          const response = await SubjectController.updateSubject(
            this.subName,
            this.subCat,
            this.iconURl,
            this.editId
          );
          console.log(response);
          res = response;
        }
        // Close the dialog
        this.loading = false;
        this.formbtnBool == false;
        this.dialog = false;
        if (res.data.success) {
          this.successDialog = true;
        } else {
          this.errorDialog = true;
          this.errorMessage = res.data.error;
        }
        this.getSubjects();
      }
    },
    newSubjectCreate() {
      this.subName = "";
      this.subCat = "";
      this.formbtnBool = false;
      this.selectedFile = null;
      this.image = null;
    },

    async deleteData(data) {
      if (data.length == 1) {
        this.dLoading = true;
        const response = await SubjectController.deleteSubject(data[0].id);
        this.getSubjects();
        this.deleteDialog = false;
        console.log(response);
        this.dLoading = false;
        this.selected = [];
      } else {
        var ids = "";
        for (var i = 0; i < data.length; i++) {
          ids = ids + data[i].id;
          if (i != data.length - 1) {
            ids = ids + ",";
          }
        }
        this.dLoading = true;
        const response = await SubjectController.deleteBulkSubject(ids);
        this.getSubjects();
        this.deleteDialog = false;
        console.log(response);
        this.dLoading = false;
        this.selected = [];
      }
    },

    async getSubjects() {
      const response = await SubjectController.getSubjectByPagination(
        this.pageSize,
        this.page
      );
      console.log(response);
      this.subjectData = response.data.data;
      this.tableData = this.subjectData.rows;
      this.count = response.data.data.count;
    },
    async getSubjectCategory() {
      const response = await SubjectCategoryController.getCategory();
      this.subjectCategoryData = response.data.data;
      this.subCategory = this.subjectCategoryData.rows;
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.selectedFile = e.dataTransfer.files[0];
      this.createFile(this.selectedFile);
    },
    onChange(e) {
      this.selectedFile = e.target.files[0];
      this.createFile(this.selectedFile);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      // var img = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async getPreSignedUrl() {
      this.loading = true;

      const response = await UploadController.getPreSignedUrl({
        context: "masters",
        file_name: this.selectedFile.name,
        mime_type: this.selectedFile.type,
        file_type: "images",
        business_type: "b2c",
        uuid: "123-456-7",
      });
      this.preSignedUrl = response.data.data.signed_request;
      this.iconURl = response.data.data.url;
      this.uploadToS3();
    },
    async uploadToS3() {
      console.log("Pre-Signed URL: ", this.preSignedUrl);
      const uploadResponse = await UploadController.uploadFile(
        this.preSignedUrl,
        this.selectedFile
      );
      console.log("Upload Response: ", uploadResponse);
      this.saveInputs();
    },
    removeFile() {
      this.image = "";
    },
    clearFilter() {
      this.selectedSubjectCatFilter = [];
      this.filterDialog = false;
      this.getSubjects();
      this.filterData = false;
    },
    async filterSubject(selectSubjectCategories) {
      console.log("filter function call");
      var subCatIds = "";
      selectSubjectCategories.forEach((item) => {
        subCatIds = subCatIds + item.id + ",";
      });
      subCatIds = subCatIds.slice(0, -1);
      const response = await SubjectController.filterSubject(
        subCatIds,
        this.pageSize,
        this.page
      );
      console.log(response);
      this.filterDialog = false;
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      console.log("GradeIds", subCatIds);
      this.count = response.data.data.count;
      this.filterData = true;
    },
  },
  created() {
    this.getSubjects();
    this.getSubjectCategory();
  },
};
</script>
<style></style>
