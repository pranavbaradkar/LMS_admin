<template>
    <v-container fluid class="pa-8">
      <v-row>
        <v-col>
          <v-btn @click="dialog = true ,newCreateBrands()" class="primary" large rounded><v-icon>mdi-plus</v-icon>Create Role</v-btn>
          <v-dialog max-width="887px" v-model="dialog" center>
            <v-form ref="form" lazy-validation>
              <v-card>
                <v-card-title class="secondary mb-8"> {{ formbtn() }} Role</v-card-title>
                <v-card-text class="px-6 pb-0">
                  <v-text-field outlined class="rounded-xl" v-model="name" label="Enter Role*" :rules="[v => !!v || 'Brand name is required']"
                    required></v-text-field>
                  <v-text-field outlined class="rounded-xl" v-model="description" label="Description*"
                  :rules="[v => !!v || 'Brand description is required']" required></v-text-field>
                </v-card-text>
                <v-card-actions class="px-6 pb-6">
                  <small>*All fields are mandatory</small>
                  <v-spacer></v-spacer>
                  <v-btn width="102px" height="48px" rounded outlined class="pa-4" @click="dialog = false">Cancel</v-btn>
                  <v-btn width="102px" height="48px" rounded @click="saveInputs" class="primary pa-4">{{ formbtn() }} </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
  
          </v-dialog>
        </v-col>
        <v-col cols="4">
          <v-text-field label="Search" prepend-inner-icon="mdi-magnify" clearable v-model="search"></v-text-field></v-col>
      </v-row>
      <v-row justify="space-between" class="my-4">
        <v-col>
          <div class="text-h5">Roles</div>
        </v-col>
  
        <v-col>
          <v-row justify="end">
            <v-btn class="primary mx-2" 
            :disabled="selected.length == 0"
            rounded
              @click="deleteDialog = true"><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn><v-btn class="primary mx-2"
              rounded><v-icon>mdi-export</v-icon>Export</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-data-table v-model="selected" :headers="headers" :items="tableData" show-select :single-select="singleSelect" :options.sync="options"
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
      </v-data-table>
      <v-dialog v-model="deleteDialog" max-width="366px" persistent>
        <v-card fluid>
          <v-container fluid class="pa-0">
            <v-container></v-container>
            <v-card-text class="text-center">
              <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>
  
              <p class="text-h5 pt-6 pb-0">Delete Brands</p>
              <p class="text-disabled grey--text text-subtitle-1 pt-3" color="rgba(0, 0, 0, 0.6)" disabled>This action will
                permanently delete the item . This cannot be undone</p>
  
              <div class="d-flex justify-space-between pt-4 pb-2" fluid> <v-btn depressed class="secondary black--text" large
                  width="157px" rounded @click="deleteDialog = false">CANCEL</v-btn> <v-btn class="black white--text"
                  depressed large width="157px" :loading="dLoading" rounded
                  @click="deleteData(selected)">DELETE</v-btn></div>
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
              <v-icon color="#228B22" size="96">mdi-check-circle-outline</v-icon>
              <p class="text-h5 py-4">Brand {{ formbtnValue() }}</p>
              <v-btn class="primary" large width="157px" rounded @click="successDialog = false">OK</v-btn>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  <script>
  import BrandController from '@/controllers/BrandController';
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
        errorMessage:"",
        dialog: false,
        dialogTitle: "Dialog Title",
        name: "",
        description: "",
        editId: null,
        singleSelect: false,
        deleteDialog: false,
        dLoading: false,
        formbtnBool: false,
        brandData: [],
        selected: [],
        search:'',
        searchBool:false,
        headers: [
          { text: "All Role Name", value: "name" },
          { text: "Description", value: "description" },
          { text: "Created  On", value: "created_at" },
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
          if(this.searchBool){
            this.searchData(this.search);
          }else{
          this.getBrand();
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
            this.getBrand();
            this.searchBool=false;
          }
      }
    },
    methods: {
      async searchData(search){
        const response = await BrandController.searchBrand(
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
        this.name=item.name;
        this.description=item.description;
        
  
      },
  
      formbtn() {
        return this.formbtnBool === false ? 'Create' : 'Update'
      },
      formbtnValue() {
        return this.formbtnBool === false ? 'Created' : 'Updated'
      },
  
      async saveInputs() {
        if (this.$refs.form.validate()) {
        this.formbtnBool == false
        var res;
        this.loading = true;
        // checking case for update/create
        if (this.formbtnBool == false) {
          const response = await BrandController.createBrand(this.name, this.description);
          res = response;
          
          this.loading = false
          console.log('create cate', response)
        }
        else {
          const response = await BrandController.updateBrand(this.name, this.description, this.editId);
          console.log(response);
          res = response;
          this.loading = false
          this.getBrand();
        }
        // Close the dialog
  
        this.dialog = false;
        if (res.data.success) {
          this.successDialog = true;
        } else {
          this.errorDialog = true;
          this.errorMessage= res.data.error
        }
        this.getBrand();
      }
    },
  
      async deleteData(data) {
        if(data.length==1){
        this.dLoading = true;
        this.deleteDialog = true
        const response = await BrandController.deleteBrand(data[0].id);
        this.getBrand();
        this.deleteDialog = false
        console.log("single select reponse",response)
        this.dLoading = false
        this.selected = []
        }else{
          var ids="";
          for(var i=0;i<data.length;i++){
            ids = ids + data[i].id;
              if( i != data.length - 1 ) {
                  ids = ids + ",";
              }
          }
        this.dLoading = true;
        this.deleteDialog = true
        const response = await BrandController.deleteBulkBrand(ids);
        this.getBrand();
        this.deleteDialog = false
        console.log(response)
        this.dLoading = false
        this.selected = []
        }
      },
      async newCreateBrands() {
        this.name = null
        this.description = null
        this.formbtnBool=false
      },
  
  
      async getBrand() {
        const response = await BrandController.getBrandsByPagination(
          this.pageSize,
          this.page
        );
        this.brandData = response.data.data;
        this.tableData = this.brandData.rows
        this.count = response.data.data.count;
  
      },
  
    },
    created() {
      this.getBrand();
    },
  };
  </script>
  <style></style>