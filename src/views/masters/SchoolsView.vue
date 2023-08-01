<template>
  <v-container fluid class="pa-8">
    <v-row justify="space-between">
      <v-col>
        <div class="text-h5">Schools</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col class="mb-1">
        <v-btn
          v-if="
            (user_permission.master &&
              user_permission.master.child.schools &&
              user_permission.master.child.schools.create) ||
            user.role_type == 'SUPER_ADMIN'
          "
          @click="createForm"
          class="background_btn white--text"
          large
          rounded-lg
          ><v-icon>mdi-plus</v-icon>Create School</v-btn
        >
        <v-dialog fullscreen v-model="dialog" center>
          <v-card>
            <v-row class="secondary mb-8"
              ><v-card-title class="pl-12 mt-3 mb-2"
                >{{ formbtn() }} School</v-card-title
              >
              <v-spacer></v-spacer>
              <v-card-actions class="mt-3 mb-2 mr-6">
                <small class="pa-4 mr-1 mt-2">*All fields are mandatory</small>
                <v-btn
                  width="102px"
                  height="48px"
                  rounded
                  text
                  class="pa-4 mr-1 mt-2"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  rounded
                  width="102px"
                  height="48px"
                  @click="saveInputs"
                  class="primary pa-4 mt-2"
                  :loading="loading"
                  >{{ formbtn() }}</v-btn
                >
              </v-card-actions>
            </v-row>

            <v-form ref="form" lazy-validation>
              <v-card-text>
                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="schoolName"
                      label="Enter School Name*"
                      :rules="[(v) => !!v || 'School name is required']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="schoolCode"
                      label="School Code*"
                      :rules="[(v) => !!v || 'School code is required']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  outlined
                  class="py-0 my-0 rounded-xl"
                  v-model="address"
                  label="Address*"
                  :rules="[(v) => !!v || 'School address is required']"
                  required
                ></v-text-field>
                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="Select Country*"
                      :rules="[(v) => !!v || 'Country is required']"
                      required
                      v-model="countryId"
                      :items="countries"
                      item-value="id"
                      item-text="country_name"
                      outlined
                      class="rounded-xl"
                      @change="fetchStates"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="State*"
                      v-model="stateId"
                      :items="states"
                      outlined
                      item-value="id"
                      item-text="state_name"
                      class="rounded-xl"
                      @change="fetchDistricts"
                      :rules="[(v) => !!v || 'State is required']"
                      required
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="Select District*"
                      v-model="districtId"
                      :items="districts"
                      outlined
                      class="rounded-xl"
                      item-value="id"
                      item-text="district_name"
                      @change="fetchTalukas"
                      :rules="[(v) => !!v || 'District is required']"
                      required
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="Select Taluka / Tehsil*"
                      v-model="talukTehsil"
                      :items="talukas"
                      outlined
                      class="rounded-xl"
                      item-value="id"
                      item-text="taluka_name"
                      @change="fetchCities"
                      :rules="[(v) => !!v || 'Talukas is required']"
                      required
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="City/Village*"
                      v-model="cityVillageId"
                      :items="cities"
                      outlined
                      class="rounded-xl"
                      item-value="id"
                      item-text="city_name"
                      :rules="[(v) => !!v || 'City is required']"
                      required
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="pinCode"
                      label="Pin Code*"
                      :rules="[(v) => !!v || 'PinCode is required']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="email"
                      label="E-mail Address*"
                      :rules="[(v) => !!v || 'E-mail Address is required']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      v-model="contactNumber"
                      label="Contact Number*"
                      :rules="[(v) => !!v || 'Contact Number is required']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  outlined
                  class="py-0 my-0 rounded-xl"
                  v-model="website"
                  label="Website*"
                  :rules="[(v) => !!v || 'Website is required']"
                  required
                ></v-text-field>

                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-text-field
                      outlined
                      label="Academic Start Year Month"
                      rounded
                      class="rounded-xl"
                      type="date"
                      v-model="DOJ"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="Select Cluster*"
                      v-model="cluster"
                      :items="clusterData"
                      item-value="id"
                      item-text="name"
                      outlined
                      :rules="[(v) => !!v || 'Cluster is required']"
                      required
                      class="rounded-xl"
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-select
                      label="Select Brand"
                      :items="brandData"
                      outlined
                      item-text="name"
                      item-value="id"
                      class="rounded-xl"
                      v-model="brand"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-autocomplete
                      v-model="selectedBoard"
                      clearable
                      deletable-chips
                      label="Select Boards*"
                      outlined
                      :rules="[(v) => !!v || 'Boards is required']"
                      required
                      class="rounded-xl"
                      small-chips
                      :search-input.sync="searchBoards"
                      :items="boardData"
                      multiple
                      item-text="name"
                      item-value="id"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>

                <v-row class="py-0 my-0">
                  <v-col class="py-0 my-0" cols="6">
                    <v-autocomplete
                      v-model="selectedGrade"
                      clearable
                      deletable-chips
                      label="Select Grade*"
                      :rules="[(v) => !!v || 'Grade is required']"
                      required
                      outlined
                      class="rounded-xl"
                      small-chips
                      :search-input.sync="searchGrade"
                      :items="gradesData"
                      multiple
                      item-text="name"
                      item-value="id"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col class="py-0 my-0" cols="6">
                    <v-autocomplete
                      v-model="selectedSubject"
                      clearable
                      deletable-chips
                      label="Select Subject*"
                      :rules="[(v) => !!v || 'Subject is required']"
                      required
                      outlined
                      class="rounded-xl"
                      small-chips
                      :search-input.sync="searchSubject"
                      :items="subjectData"
                      multiple
                      item-text="name"
                      item-value="id"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-form>
          </v-card>
        </v-dialog>
        <!-- Filter Dialog -->
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
                        Brands
                      </div>
                    </v-col>
                  </v-row>
                  <v-chip-group
                    v-model="selectedBrandsFilter"
                    active-class="primary"
                    column
                    :multiple="true"
                  >
                    <v-chip
                      v-for="(brandType, index) in brandData"
                      :key="index"
                      :value="brandType"
                      elevated
                    >
                      {{ brandType.name }}
                    </v-chip>
                  </v-chip-group>
                  <v-row class="pl-1">
                    <v-col>
                      <div
                        class="text-body1 font-weight-normal black--text pt-3"
                      >
                        Clusters
                      </div>
                    </v-col>
                  </v-row>
                  <v-chip-group
                    v-model="selectedClusterFilters"
                    active-class="primary"
                    column
                    :multiple="true"
                  >
                    <v-chip
                      v-for="(clusterType, index) in clusterData"
                      :key="index"
                      :value="clusterType"
                      elevated
                    >
                      {{ clusterType.name }}
                    </v-chip>
                  </v-chip-group>

                  <v-row class="pl-1">
                    <v-col>
                      <div
                        class="text-body1 font-weight-normal black--text pt-3"
                      >
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
                      <div
                        class="text-body1 font-weight-normal black--text pt-3"
                      >
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
                    <v-btn
                      rounded
                      class="primary pa-4"
                      @click="
                        filterSchool(
                          selectedBrandsFilter,
                          selectedClusterFilters,
                          selectedBoardFlter,
                          selectedSubjectFilter
                        )
                      "
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
              user_permission.master.child.schools &&
              user_permission.master.child.schools.delete) ||
            user.role_type == 'SUPER_ADMIN'
          "
          class="background_btn white--text mx-2"
          :disabled="selected.length == 0"
          rounded-lg
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
              user_permission.master.child.schools &&
              user_permission.master.child.schools.update) ||
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
            <v-avatar color="secondary" size="90"
              ><v-icon size="65">mdi-trash-can-outline</v-icon></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">Delete School</p>
            <p
              class="text-disabled grey--text text-subtitle-1"
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
            <v-icon color="#228B22" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">School {{ formbtnValue() }}</p>
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
import AddressController from "@/controllers/AddressController";
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import BrandController from "@/controllers/BrandController";
import SubjectController from "@/controllers/SubjectController";
import ClusterController from "@/controllers/ClusterController";
import GradeController from "@/controllers/GradeController";

export default {
  name: "SchoolsView",
  data() {
    return {
      options: {},
      pageSize: 10,
      page: 1,
      count: 0,
      errorDialog: false,
      successDialog: false,
      dialog: false,
      errorMessage: "",
      dialogTitle: "Dialog Title",
      input1: "",
      input2: "",
      subjectData: [],
      deleteDialog: false,
      schoolData: "",
      dLoading: false,
      singleSelect: false,
      selected: [],
      clusterData: [],
      filterDialog: false,
      formbtnBool: false,
      loading: false,
      schoolName: "",
      schoolCode: "",
      address: "",
      countryId: "",
      stateId: null,
      districtId: "",
      talukTehsil: "",
      cityVillageId: "",
      boardData: [],
      pinCode: "",
      email: "",
      contactNumber: "",
      website: "",
      brandData: [],
      filterData: false,
      DOJ: "",
      cluster: "",
      brand: "",
      selectedBoard: [],
      selectedBrandsFilter: [],
      selectedClusterFilters: [],
      selectedBoardFlter: [],
      selectedSubjectFilter: [],
      gradesData: [],
      headers: [
        { text: "School Code", value: "school_code" },
        { text: "School Name", value: "name" },
        { text: "Cluster", value: "cluster.name" },
        { text: "State", value: "state.name" },
        { text: "City", value: "city.name" },
        { text: "Area", value: "taluka.name" },
        // { text: "Created On", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
      tableData: [],
      boards: [
        { name: "Boards 1" },
        { name: "Boards 2" },
        { name: "Boards 3" },
        { name: "Boards 4" },
      ],
      selectedBoards: [],
      searchBoards: "",

      grade: [
        { name: "Grade 1" },
        { name: "Grade 2" },
        { name: "Grade 3" },
        { name: "Grade 4" },
      ],
      selectedGrade: [],
      searchGrade: "",
      subject: [
        { name: "Subject 1" },
        { name: "Subject 2" },
        { name: "Subject 3" },
        { name: "Subject 4" },
      ],
      selectedSubject: [],
      searchSubject: "",
      countries: [],
      states: [],
      districts: [],
      cities: [],
      search: "",
      searchBool: false,
      talukas: [],
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
        if (this.filterData) {
          this.filterSchool(
            this.selectedBrandsFilter,
            this.selectedClusterFilters,
            this.selectedBoardFlter,
            this.selectedSubjectFilter
          );
        } else if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.getSchool();
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
        this.getSchool();
        this.searchBool = false;
      }
    },
  },
  methods: {
    async searchData(search) {
      const response = await SchoolController.searchSchool(
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
    async fetchCountries() {
      const response = await AddressController.getCountries();
      this.countries = response.data.data.rows;
    },
    async fetchStates() {
      const response = await AddressController.getStates(this.countryId);
      this.states = response.data.data.rows;
      //console.log(this.states);
    },
    async fetchDistricts() {
      const response = await AddressController.getDistricts(this.stateId);
      this.districts = response.data.data.rows;
      //console.log(this.districts);
      // this.fetchCities();
    },
    async fetchTalukas() {
      const response = await AddressController.getTalukas(this.districtId);
      this.talukas = response.data.data.rows;
      // console.log(this.talukas);
    },
    async fetchCities() {
      const response = await AddressController.getCities(
        this.stateId,
        this.talukTehsil
      );
      this.cities = response.data.data.rows;
      //console.log(this.cities);
    },

    createForm() {
      (this.schoolName = null),
        (this.schoolCode = null),
        (this.brand = null),
        (this.cluster = null),
        (this.address = null),
        (this.contactNumber = null),
        (this.website = null),
        (this.countryId = null),
        (this.cityVillageId = null),
        (this.stateId = null),
        (this.DOJ = null),
        (this.email = null),
        (this.districtId = null),
        (this.talukTehsil = null),
        (this.pinCode = null),
        (this.dialog = true);
      this.formbtnBool = false;
      this.selectedBoard = null;
      this.selectedSubject = null;
      this.selectedGrade = null;
    },

    updateData(item) {
      (this.schoolName = item.name),
        (this.schoolCode = item.school_code),
        (this.brand = item.brand_id),
        (this.cluster = item.cluster_id),
        (this.address = item.address),
        (this.contactNumber = item.contact),
        (this.website = item.website),
        (this.countryId = item.country_id),
        (this.cityVillageId = item.city_id),
        (this.stateId = item.state_id),
        (this.DOJ = item.academic_date),
        (this.email = item.email);
      this.selectedBoard = item.boards;
      this.selectedSubject = item.subjects;
      this.selectedGrade = item.grades;
      this.pinCode = item.pincode;
      this.districtId = item.district_id;
      this.editId = item.id;
      // selected id for edit
      this.formbtnBool = true; // change update/create btn value
      this.dialog = true;
    },

    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    formbtnValue() {
      return this.formbtnBool === false ? "Created" : "Updated";
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      this.boardData = response.data.data.rows;
    },

    async saveInputs() {
      // checking case for update/create
      if (this.$refs.form.validate()) {
        this.loading = true;
        var res;
        if (this.formbtnBool == false) {
          const response = await SchoolController.createSchool({
            name: this.schoolName,
            school_code: this.schoolCode,
            brand_id: this.brand,
            cluster_id: this.cluster,
            address: this.address,
            contact: this.contactNumber,
            website: this.website,
            total_strength: 5,
            country_id: this.countryId,
            city_id: this.cityVillageId,
            state_id: this.stateId,
            academic_date: this.DOJ,
            pincode: this.pinCode,
            email: this.email,
            board_ids: this.selectedBoard,
            subject_ids: this.selectedSubject,
            grade_ids: this.selectedGrade,
            district_id: this.districtId,
          });
          console.log(response);
          res = response;
        } else {
          const response = await SchoolController.updateSchool(
            {
              name: this.schoolName,
              school_code: this.schoolCode,
              brand_id: this.brand,
              cluster_id: this.cluster,
              address: this.address,
              contact: this.contactNumber,
              website: this.website,
              total_strength: 5,
              country_id: this.countryId,
              city_id: this.cityVillageId,
              state_id: this.stateId,
              email: this.email,
              pincode: this.pinCode,
              academic_date: this.DOJ,
              board_ids: this.selectedBoard,
              subject_ids: this.selectedSubject,
              grade_ids: this.selectedGrade,
              district_id: this.districtId,
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
        this.getSchool();
        this.loading = false;
      }
    },

    async deleteData(data) {
      if (data.length == 1) {
        this.dLoading = true;
        const response = await SchoolController.deleteSchool(data[0].id);
        if (response.data.success) {
          this.getSchool();
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
        const response = await SchoolController.deleteBulkSchool(ids);
        if (response.data.success) {
          this.getSchool();
        } else {
          alert(response.data.error);
        }
      }
      this.deleteDialog = false;
      this.dLoading = false;
      this.selected = [];
    },

    async getSchool() {
      const response = await SchoolController.getSchoolByPagiation(
        this.pageSize,
        this.page
      );
      console.log(response);
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      this.count = response.data.data.count;
    },
    async getBrand() {
      const response = await BrandController.getBrands();
      this.brandData = response.data.data.rows;
    },

    async getSubjects() {
      const response = await SubjectController.getSubject();
      this.subjectData = response.data.data.rows;
    },

    async fetchAllClusters() {
      const response = await ClusterController.getAllClusters();
      console.log(response);
      this.clusterData = response.data.data.rows;
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      //console.log(response);
      this.gradesData = response.data.data.rows;
    },
    clearFilter() {
      this.selectedBrandsFilter = [];
      this.selectedClusterFilters = [];
      this.selectedBoardFlter = [];
      this.selectedSubjectFilter = [];
      this.getSchool();
      this.filterDialog = false;
      this.filterData = false;
    },
    async filterSchool(
      selectBrands,
      selectCluster,
      selectBoards,
      selectSubject
    ) {
      console.log("filter function call");
      var brandsIds = "";
      var clustersIds = "";
      var boardsIds = "";
      var subjectIds = "";
      selectBrands.forEach((item) => {
        brandsIds = brandsIds + item.id + ",";
      });
      selectCluster.forEach((item) => {
        clustersIds = clustersIds + item.id + ",";
      });
      selectBoards.forEach((item) => {
        boardsIds = boardsIds + item.id + ",";
      });
      selectSubject.forEach((item) => {
        subjectIds = subjectIds + item.id + ",";
      });
      brandsIds = brandsIds.slice(0, -1);
      clustersIds = clustersIds.slice(0, -1);
      boardsIds = boardsIds.slice(0, -1);
      subjectIds = subjectIds.slice(0, -1);
      const response = await SchoolController.filterSchool(
        brandsIds,
        clustersIds,
        boardsIds,
        subjectIds,
        this.pageSize,
        this.page
      );
      console.log(response);
      this.filterDialog = false;
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
      this.count = response.data.data.count;
      this.filterData = true;
      console.log("boards", boardsIds);
      console.log("brands", brandsIds);
      console.log("cluster", subjectIds);
      console.log("subject", clustersIds);
    },
  },
  computed: {
    filteredBoards() {
      if (this.searchBoards) {
        const regex = new RegExp(this.searchBoards);
        return this.boards.filter((boards) => regex.test(boards.name));
      } else {
        return this.boards;
      }
    },
    user() {
      return AuthService.getLoggedUser();
    },
    user_permission() {
      return AuthService.getPermissions();
    },

    filteredGrade() {
      if (this.searchGrade) {
        const regex = new RegExp(this.searchGrade);
        return this.grade.filter((grade) => regex.test(grade.name));
      } else {
        return this.grade;
      }
    },

    filteredSubject() {
      if (this.searchSubject) {
        const regex = new RegExp(this.searchSubject);
        return this.subject.filter((subject) => regex.test(subject.name));
      } else {
        return this.subject;
      }
    },
  },
  created() {
    this.fetchCountries();
    this.getSchool();
    this.getBoards();
    this.getBrand();
    this.getSubjects();
    this.fetchAllClusters();
    this.getGrades();
  },
};
</script>
<style></style>
