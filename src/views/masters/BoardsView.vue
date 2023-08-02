<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Boards</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-1">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.boards &&
              user_permission.master.child.boards.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="(dialog = true), newCreateBoards()"
          class="background_btn white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon>Create Board</v-btn
        >
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="lightPurple mb-8"
                >{{ formbtn() }} Board</v-card-title
              >
              <v-list-item-title class="text-center mb-4">
                Upload board icon<sup>*</sup>
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

              <v-card-text class="px-5 pb-0">
                <v-text-field
                  outlined
                  class="rounded-xl"
                  v-model="name"
                  label="Enter Board*"
                  :rules="[(v) => !!v || 'Boards name is required']"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="px-5 pb-6">
                <small>*All fields are mandatory</small>
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  width="102px"
                  height="48px"
                  outlined
                  class="pa-4 purple-button-light lightPurple purple-button-light-height-large"
                  @click="
                    () => {
                      dialog = false;
                      formbtnBool = false;
                    }
                  "
                  >Cancel</v-btn
                >
                <v-btn
                  rounded-lg
                  width="102px"
                  height="48px"
                  @click="getPreSignedUrl"
                  :loading="loading"
                  class="primary pa-4"
                  :disabled="selectedFile == null"
                  >{{ formbtn() }}</v-btn
                >
              </v-card-actions>
              <!---------------------- subject upload section ends here --------------------------->
            </v-card>
          </v-form>
          <!---------------------- subject upload section starts here --------------------------->
        </v-dialog>
      </v-col>
      <v-col class="d-flex" style="align-items: center">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="searchBoards"
          clearable
        ></v-text-field>
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.boards &&
              user_permission.master.child.boards.delete) ||
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
      :search="search"
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
              user_permission.master.child.boards &&
              user_permission.master.child.boards.update) ||
            user.role_type == 'SUPER_ADMIN'
          "
          icon
          class="mr-2 pa-4"
          @click="updateData(item)"
        >
        <img src="./../../assets/edits.svg" alt="Edit Icon" />
        </v-btn>
      </template>

      <template v-slot:[`item.boardIcon`]="{ item }">
        <v-img
          height="30px"
          width="30px"
          :src="item.logo"
          class="pa-6 bg-secondary rounded-circle d-inline-block"
        ></v-img>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <!-- <v-avatar></v-avatar> -->
            <v-container></v-container>
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-6 pb-0">Delete Boards</p>
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
    <!--error dialog-->
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
            <p class="text-h5 py-4">Board {{ formbtnValue() }}</p>
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
import BoardController from "@/controllers/BoardController";
import UploadController from "@/controllers/UploadController";
export default {
  name: "BoardsView",
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
      input1: "",
      input2: "",
      preSignedUrl: "",
      name: null,
      selectedFile: null,
      loading: false,
      singleSelect: false,
      iconURl: "NA",
      selected: [],
      search: "",
      boardData: null,
      deleteDialog: false,
      dLoading: false,
      image: "",
      editId: null,
      formbtnBool: false,
      searchBoards: "",
      searchBool: false,
      headers: [
        { text: "Board Icon", value: "boardIcon" },
        { text: "Board Name", value: "name" },
        { text: "Created  On", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
      tableData: [],
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
          this.searchData(this.searchBoards);
        } else {
          this.getBoards();
        }
      },
      deep: true,
    },
    searchBoards(newValue) {
      console.log(newValue);
      this.searchBool = true;
      this.pageSize = this.options.itemsPerPage;
      this.page = this.options.page;
      this.options.page = 1;
      this.searchData(newValue);
      if (newValue == "" || newValue == null) {
        this.getBoards();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await BoardController.searchBoard(
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
      this.image = item.logo;
    },

    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    formbtnValue() {
      return this.formbtnBool === false ? "Created" : "Updated";
    },
    async newCreateBoards() {
      this.name = null;
      this.formbtnBool = false;
      this.selectedFile = null;
      this.image = null;
    },

    async saveInputs() {
      if (this.$refs.form.validate()) {
        console.log("valiadhd");

        var res;
        this.loading = true;
        // checking case for update/create
        if (this.formbtnBool == false) {
          const response = await BoardController.createBoard(
            this.name,
            "STATE",
            this.iconURl
          );
          res = response;
          this.loading = false;
        } else {
          const response = await BoardController.updateBoard(
            this.name,
            "STATE",
            this.iconURl,
            this.editId
          );
          res = response;
          console.log(response);
          this.loading = false;
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
        this.getBoards();
        this.name = "";
        this.removeFile();
      }
    },

    async deleteData(data) {
      if (data.length == 0) {
        this.dLoading = true;
        this.deleteDialog = true;
        const response = await BoardController.deleteBoard(data[0].id);
        this.getBoards();
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
        this.deleteDialog = true;
        const response = await BoardController.deleteBulkBoard(ids);
        this.getBoards();
        this.deleteDialog = false;
        console.log(response);
        this.dLoading = false;
        this.selected = [];
      }
    },

    async getBoards() {
      const response = await BoardController.getBoardsByPagination(
        this.pageSize,
        this.page
      );
      console.log(response);
      this.boardData = response.data.data;
      this.tableData = this.boardData.rows;
      this.count = response.data.data.count;
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
    removeFile() {
      this.image = "";
      this.iconURl = "";
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
  },
  created() {
    this.getBoards();
  },
};
</script>
<style scoped></style>
