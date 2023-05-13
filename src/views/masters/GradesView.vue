<template>
  <v-container fluid class="pa-8">
    <v-row>
      <v-col>
        <v-btn @click="
          () => {
            dialog = true;
            formbtnBool = false;
            newCreateGradeValue();
          }
        " class="primary" large rounded><v-icon>mdi-plus</v-icon>Create Grade</v-btn>
        <v-dialog max-width="887px" v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="secondary mb-8">{{ formbtn() }} Grade</v-card-title>
              <v-card-text class="px-6 pb-0">
                <v-text-field outlined class=" rounded-xl" v-model="gradeName" label="Enter Grade Name*"
                :rules="[v => !!v || 'Grade name is required']" required></v-text-field>
                <v-row class="pb-0 pt-0">
                  <v-col class="pb-0 mb-0" cols="6">
                    <v-select label="Select Board*" :items="boardData" outlined v-model="boardName" item-text="name"
                      item-value="id" class="rounded-xl" :rules="[v => !!v || 'Board name is required']" required>
                    </v-select>
                  </v-col>
                  <v-col class="pb-0 mb-0" cols="6">
                    <v-autocomplete v-model="selectedSubject" clearable deletable-chips label="Select or Search Subjects"
                      outlined class="rounded-xl" small-chips :search-input.sync="searchSubject" :items="subjectData" multiple
                      item-text="name" item-value="id">
                    </v-autocomplete>
                  </v-col>
                </v-row>
              </v-card-text>
             
              <v-card-actions class="px-6 pb-6">
                <small>*All fields are mandatory</small>
                <v-spacer></v-spacer>
                <v-btn  width="102px" height="48px" rounded outlined class="pa-4" @click="dialog = false">Cancel</v-btn>
                <v-btn  width="102px" height="48px" rounded @click="saveInputs" class="primary pa-4" :loading="loading">{{
                  formbtn()
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="filterDialog" max-width="400px">
          <v-card width="400px" height="100%">
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
                  <div class="pl-1 text-body1 font-weight-bold">FILTER</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <div @click="clearFilter" class="text-body1 font-weight-bold black--text cursor">
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
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Boards
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedBoardFlter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(boardType, index) in boardData"
                    :key="index"
                    :value="boardType"
                    elevated
                  >
                    {{ boardType.name }}
                  </v-chip>
                </v-chip-group>
  
                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Subjects
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
                    v-for="(subjectType, index) in subjectData"
                    :key="index"
                    :value="subjectType"
                    elevated
                  >
                    {{ subjectType.name }}
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
                    <v-btn rounded class="primary pa-4" @click="filterGrade(selectedBoardFlter,selectedSubjectFilter)">Apply</v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Search" prepend-inner-icon="mdi-magnify" v-model="search" clearable></v-text-field></v-col>
    </v-row>
    <v-row justify="space-between" class="my-4">
      <v-col>
        <div class="text-h5">Grades</div>
      </v-col>

      <v-col>
        <v-row justify="end">
          <v-btn class="primary mx-2" rounded @click="filterDialog = true"
          ><v-icon>mdi-tune</v-icon>Filter</v-btn
        ><v-btn class="primary mx-2" rounded @click="deleteDialog = true"
            :disabled="selected.length == 0"><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn><v-btn
            class="primary mx-2" rounded><v-icon>mdi-export</v-icon>Export</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table v-model="selected" :headers="headers" :items="tableData" show-select :single-select="singleSelect"  :options.sync="options"
    :footer-props="{
    itemsPerPageOptions: [5, 10, 20, 50,100]
    }"  
    :server-items-length="count" >
      <template v-slot:[`item.created_at`]="{item}">
        {{getDate(item.created_at)}}
       </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon class="mr-2 pa-4" @click="updateData(item)">
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.Subject`]="{ item }">
        <span v-for="data in item.subjectIds" :key="data.id">{{ data.name }},
        </span>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-container></v-container>
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>

            <p class="text-h5 pt-6 pb-0">Delete Grade</p>
            <p class="text-disabled grey--text text-subtitle-1 pt-3" color="rgba(0, 0, 0, 0.6)" disabled>
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between pt-4 pb-2" fluid>
              <v-btn depressed class="secondary black--text" large width="157px" @click="deleteDialog = false"
                rounded>CANCEL</v-btn>
              <v-btn class="black white--text" depressed large width="157px" rounded :loading="dLoading"
                @click="deleteData(selected)">DELETE</v-btn>
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
            <v-btn class="primary" large width="157px" rounded @click="errorDialog = false">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">New Grade {{ formbtnBool == false ? 'Created': 'Updated'}}</p>
            <v-btn class="primary" large width="157px" rounded @click="successDialog = false">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import GradeController from "@/controllers/GradeController";
import BoardController from "@/controllers/BoardController";
import SubjectController from "@/controllers/SubjectController";
export default {
  name: "GradesView",
  data() {
    return {
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      errorDialog: false,
      successDialog: false,
      errorMessage:"",
      dialog: false,
      dialogTitle: "Dialog Title",
      input1: "",
      input2: "",
      editId: null,
      gradeName: null,
      boardName: "",
      boardData: [],
      subjects: [],
      singleSelect: false,
      dLoading: false,

      gradeData: null,
      formbtnBool: false,
      deleteDialog: false,
      selectedSubject: [],
      searchSubject: [],
      subjectData: [],
      selectedSubjectFilter:[],
      selectedBoardFlter:[],
      filterDialog: false,
      filterData:false,
      loading: false,
      selected: [],
      search:'',
      searchBool:false,
      headers: [
        { text: "Grade Name", value: "name" },
        { text: "Board Name", value: "board.name" },
        { text: "Subjects", value: "Subject" },
        // { text: "Created On", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
      tableData: [],
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  watch: {
    options: {
      handler() {
        console.log(this.options);
        this.pageSize = this.options.itemsPerPage;
        this.page = this.options.page;
        if(this.filterData){
          this.filterGrade(this.selectedBoardFlter,this.optionsselectedSubjectFilter)  
          }else if(this.searchBool){
          this.searchData(this.search);
        }else{
          this.getGrades();
        }
      },
      deep: true,
    },
    search(newValue){
      console.log(newValue);
        this.searchBool=true
        this.pageSize = this.options.itemsPerPage;
        this.page = this.options.page;
        this.options.page=1;
        this.searchData(newValue);
        if(newValue=="" || newValue==null){
          this.getGrades();
          this.searchBool=false;
        }
    }
  },
  methods: {
    async searchData(search){
      const response = await GradeController.searchGrade(
        this.pageSize,
        this.page,
        search,
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
      this.gradeName=item.name;
      this.boardName=item.board_id;
      this.selectedSubject=item.subjectIds;

    },
    async newCreateGradeValue() {
      this.gradeName = null;
      this.boardName=null;
      this.selectedSubject=[];
    },

    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },

    async saveInputs() {
      if (this.$refs.form.validate()) {
      var res;
      this.loading = true;
      // checking case for update/create
      if (this.formbtnBool == false) {
        const response = await GradeController.createGrade({
          name: this.gradeName,
          level_id: -1,
          board_id: this.boardName,
          subjectIds: this.selectedSubject,
        });
        res = response;
        this.loading = false;
        console.log(response);
      } else {
        const response = await GradeController.updateGrade(
          {
            name: this.gradeName,
            level_id: -1,
            board_id: this.boardName,
            subjectIds: this.selectedSubject,
          },
          this.editId
        );
        res = response
        console.log(response);
        this.loading = false;
      }
      // Close the dialog
      if (res.data.success) {
        this.successDialog = true;
      } else {
        this.errorDialog = true;
        this.errorMessage=res.data.error;
      }
      this.formbtnBool == false;
      this.dialog = false;
      this.getGrades();
    }
    },

    async deleteData(data) {
      if(data.length==1){
        // if block for delete single data
      this.dLoading = true;
      this.deleteDialog = true;
      const response = await GradeController.deleteGrade(data[0].id);
        // checking condition for response status
              if (response.data.success) {
                this.getGrades();
              this.deleteDialog = false;
              console.log(response);
              this.dLoading = false;
              this.selected = []
              }
              else {
                alert(response.data.error)
              } 
      }
      // else bloak for bulk delete data
      else{
        var ids="";
        for(var i=0;i<data.length;i++){
          ids = ids + data[i].id;
            if( i != data.length - 1 ) {
                ids = ids + ","
            }
        }
      this.dLoading = true;
      this.deleteDialog = true;
      const response = await GradeController.deleteBulkGrade(ids);
        // checking condition for update response status      
            if (response.data.success) {
                this.getGrades();
              this.deleteDialog = false;
              console.log(response);
              this.dLoading = false;
              this.selected = []
              }
              else {
                alert(response.data.error)
              } 
      }
    },

    async getGrades() {
      const response = await GradeController.getAllGradesByPagination(
         this.pageSize,
        this.page);
        if (response.data.success) {
          console.log("",response);
          this.gradeData = response.data.data;
          this.tableData = this.gradeData.rows;
          this.count = response.data.data.count;
      }
      else {
        alert(response.data.error)
      }
     

    },
    async getBoards() {
      const response = await BoardController.getBoards();
      if (response.data.success) {
        this.boardData = response.data.data.rows;

      }
      else {
        alert(response.data.error)
      }
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      if (response.data.success) {
        this.subjectData = response.data.data.rows;
      }
      else {
        alert(response.data.error)
      }
    },
    clearFilter(){
      this.selectedBoardFlter=[];
      this.selectedSubjectFilter=[];
      this.filterDialog=false;
      this.getGrades();
      this.filterData=false;

    },
    async filterGrade(selectBoards,selectSubject){
      console.log("filter function call");
      var boardsIds="";
      var subjectIds="";
      selectBoards.forEach((item)=>{
        boardsIds=boardsIds+item.id+",";
      })
      selectSubject.forEach((item)=>{
        subjectIds=subjectIds+item.id+",";
      })
      boardsIds=boardsIds.slice(0,-1);
      subjectIds=subjectIds.slice(0,-1);
      const response = await GradeController.filterGrade(boardsIds,subjectIds, this.pageSize,
        this.page);
      
      if (response.data.success) {
        console.log(response);
     
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      this.count = response.data.data.count;
      this.filterData=true;
      console.log("SubjectIds",subjectIds);
      console.log("BOardsIds",boardsIds);
      }
      else {
        alert(response.data.error)
      }
      this.filterDialog=false;
    }
  },
  created() {
    this.getGrades();
    this.getBoards();
    this.getSubjects();
  },
};
</script>
<style></style>