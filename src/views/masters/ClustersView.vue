
<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Clusters</div>
      </v-col>
     
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-1">
        <v-btn 
        v-if="(user_permission.master && user_permission.master.child.clusters && user_permission.master.child.clusters.create) || user.role_type == 'SUPER_ADMIN'"
        @click="dialog = true, newCreateClusterValue()"   large rounded-lg  class="background_btn white--text"
          ><v-icon>mdi-plus</v-icon>Create Cluster</v-btn>

        <v-dialog max-width="887px "  v-model="dialog" center>
          <v-form ref="form" lazy-validation>
            <v-card>
              <v-card-title class="secondary mb-8">{{ formbtn() }} Cluster</v-card-title>
              <v-card-text class="px-6 pb-0">
                <v-text-field outlined class="rounded-xl" v-model="clusterName" label="Enter Cluster*"
                :rules="[
                 v => !!v || 'Cluster name is required'
                 ]" required></v-text-field>
                <v-text-field outlined class="rounded-xl" v-model="description" label="Description*"
                :rules="[
                  v => !!v || 'Cluster description is required'
                ]" required></v-text-field>
              </v-card-text>
              <v-card-actions class="px-6 pb-6">
                <small>*All fields are mandatory</small>
                <v-spacer></v-spacer>
                <v-btn rounded outlined width="102px" height="48px" class="pa-4" @click="
                  () => {
                    dialog = false;
                    formbtnBool = false;
                  }
                ">Cancel</v-btn>
                <v-btn width="102px" height="48px" rounded @click="saveInputs " class="primary pa-4" :loading="loading">{{ formbtn() }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>

        </v-dialog>
      </v-col>
      <v-col class="d-flex" style="align-items: center;">
        
          <v-text-field label="Search" prepend-inner-icon="mdi-magnify" v-model="search" clearable></v-text-field>
          <v-btn class="background_btn white--text mx-2" 
          v-if="(user_permission.master && user_permission.master.child.clusters && user_permission.master.child.clusters.delete) || user.role_type == 'SUPER_ADMIN'"
          rounded-lg @click="deleteDialog = true"
            :disabled="selected.length == 0"><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn>
            
            <v-btn
            class="background_btn white--text mx-2" rounded-lg><v-icon>mdi-export</v-icon>Export</v-btn>
           
      
      </v-col>
     
    </v-row>
    
    <v-data-table v-model="selected" :headers="headers" :items="tableData" show-select :single-select="singleSelect"
      :options.sync="options" :footer-props="{
        itemsPerPageOptions: [5, 10, 20, 50, 100]
      }" :server-items-length="count">
      <template v-slot:[`item.created_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn v-if="(user_permission.master && user_permission.master.child.clusters && user_permission.master.child.clusters.update) || user.role_type == 'SUPER_ADMIN'" icon class="mr-2 pa-4" @click="updateData(item)">
          <v-icon color="black">mdi-square-edit-outline</v-icon>
        </v-btn>
      </template></v-data-table>
    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-container></v-container>
            <v-avatar color="secondary" size="90"><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar>
            <p class="text-h5 pt-6 pb-0">Delete Cluster</p>
            <p class="text-disabled grey--text text-subtitle-1 pt-3" color="rgba(0, 0, 0, 0.6)" disabled>This action will
              permanently delete the item . This cannot be undone</p>

            <div class="d-flex justify-space-between pt-4 pb-2" fluid> <v-btn depressed class="secondary black--text" large
                width="157px" rounded @click="deleteDialog = false">CANCEL</v-btn> <v-btn class="black white--text"
                depressed large :loading="dLoading" width="157px" rounded @click="deleteData(selected)">DELETE</v-btn>
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
            <v-icon color="#228B22" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Cluster {{ formbtnValue() }}</p>
            <v-btn class="primary" large width="157px" rounded @click="successDialog = false">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
<style>

</style>

<script>
import AuthService from "@/services/AuthService";
import ClusterController from "@/controllers/ClusterController";
export default {
  name: "ClustersView",
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
      singleSelect: false,
      formbtnBool: false,
      clusterName: null,
      deleteDialog: false,
      description: null,
      dLoading: false,
      clusterData: null,
      editId: null,
      loading: false,
      selected: [],
      search:'',
      searchBool:false,
      headers: [
        { text: "Cluster Name", value: "name" },
        { text: "Description", value: "description" },
        // { text: "Created On", value: "created_at" },
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
    }
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
        this.fetchAllClusters();
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
          this.fetchAllClusters();
          this.searchBool=false;
        }
    }
  },
  methods: {
    async searchData(search){
      const response = await ClusterController.searchCluster(
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
      console.log("data id", item.id);
      this.dialog = true;
      this.clusterName = item.name;
      this.description = item.description;
    },
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    formbtnValue() {
      return this.formbtnBool === false ? "Created" : "Updated";
    },
    async deleteData(data) { 
   
      if (data.length == 1) {
        this.dLoading = true;
        const response = await ClusterController.deleteCluster(data[0].id);
        if (response.data.success) {
          console.log("Delete Responce", response);
            this.fetchAllClusters();
            this.deleteDialog = false;
            this.dLoading = false;
            this.selected = [];
      }
      else {
        alert(response.data.error)
      }




      } else {
        var ids = "";
        for (var i = 0; i < data.length; i++) {
          ids = ids + data[i].id;
          if (i != data.length - 1) {
            ids = ids + ","
          }
        }
        console.log("ids are", ids)
        this.dLoading = true;
        const response = await ClusterController.deleteBulkCluster(ids);
        if (response.data.success) {
          console.log("Delete Responce", response);
          this.fetchAllClusters();
          this.deleteDialog = false;
          this.dLoading = false;
          this.selected = []
      }
      else {
        alert(response.data.error)
      }
       
      }

    },
    async newCreateClusterValue() {
      this.clusterName = null
      this.description = null
      this.formbtnBool=false
    },

    async saveInputs() {
      var res;
      if (this.$refs.form.validate()) {
        this.loading = true;
        // checking case for update/create
        if (this.formbtnBool == false) {
          const response = await ClusterController.createCluster(
            this.clusterName,
            this.description
          );

          res = response;
          console.log(response);
        } else {
          const response = await ClusterController.updateCluster(
            this.clusterName,
            this.description,
            this.editId
          );
          res = response;
          console.log(response);
        }


        if (res.data.success) {
          this.successDialog = true;
          this.fetchAllClusters();
        }
        else {

          this.errorDialog = true;
          this.errorMessage = res.data.error;
        }


        this.formbtnBool == false;
        this.loading = false;
        this.clusterName = '',
          this.description = '',
          this.dialog = false;



      }
    },

    async fetchAllClusters() {
      const response = await ClusterController.getAllClustersByPagination(this.pageSize,
        this.page);
      
      if (response.data.success) {
        this.clusterData = response.data.data;
      this.tableData = this.clusterData.rows;
      this.count = response.data.data.count;
      }
      else {
        alert(response.data.error)
      }
    },
  },
  created() {
    this.fetchAllClusters();
  },
};
</script>