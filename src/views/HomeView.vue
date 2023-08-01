<template>
  <div>
    <v-container fluid class="pa-4 ml-2">
      <v-row class="pb-0 mb-0">
        <v-col cols="12" class="d-flex justify-space-between">
          <div class="d-flex flex-row align-content-center">
            <div style="font-size: 26px;">
              Dashboard
            </div>
            <div class="ml-6">
              <v-tabs
            v-model="userType"
            background-color="#0000000D"
            class="ml-2 d-flex space-evenly rounded"
            height="38"
            hide-slider
            @change="changeUserType"
          >
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
            >
              All
            </v-tab>
            <v-tab
              active-class=" white ma-1 black--text"
              class="rounded"
            >
              Internal Teacher
            </v-tab>

            <v-tab
              active-class="white ma-1 black--text"
              class="rounded"
            >
              Job Seeker
            </v-tab>
          </v-tabs>
            </div>
            <div class="ml-6">
              <div style="font-size: 10px; font-weight: 500">
                Select Campaigns/Schools
              </div>
              <v-menu :close-on-content-click="false" ref="menuRef" class="dropDown" location="bottom">
      <template v-slot:activator="{}">
        <div @click="() => {$refs.menuRef.isActive = true}" style="cursor: pointer;">
          {{ selectedCampaign != -1 ? selectedCampaign : selectedSchool != -1 ? selectedSchool : 'Default' }} 
          <span> <v-icon>mdi-menu-down</v-icon> </span>
        </div>
      </template>
      <v-list height="100%">
      <v-list-item @click="() => {
        $refs.menuRef.isActive = false;
        changeDataType('Default', null)
        }">
        <v-list-item-content>
          <v-list-item-title v-text="'Default'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-for="item in dataTypeItem"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          style="height: 100%; padding-left: 4px"
          @click="() => {
            $refs.menuRef.isActive = false;
            changeDataType(item.title,child)
          }"
        >
          <v-list-item-avatar>
            <v-icon v-if="item.title == 'Campaigns'">mdi-alpha-c-circle</v-icon>
            <v-icon v-if="item.title == 'Schools'">mdi-alpha-s-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="child.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-menu>
            </div>
          </div>

     <div style="height: 48px; border-radius: 24px;
      border: 1px solid rgba(0, 0, 0, 0.20);" class="pr-1 d-flex justify-center align-center mb-6 pl-2 pr-2">
      <div style="font-size: 12px; font-weight: 500; color: rgba(0, 0, 0, 0.40)" class="mr-2">
          Period
      </div>
      <v-menu :close-on-content-click="false" ref="menuRefp" class="dropDown" location="bottom">
      <template v-slot:activator="{}">
        <div @click="() => {$refs.menuRefp.isActive = true}" style="cursor: pointer;">
          {{ date.end && period == 'Custom' ? `${date.start} - ${date.end}` : period }} 
          <span> <v-icon>mdi-menu-down</v-icon> </span>
        </div>
      </template>
      <v-list height="100%">
      <v-list-item @click="() => {
        $refs.menuRefp.isActive = false;
        changePeriod('Last 7 days')
        }">
        <v-list-item-content>
          <v-list-item-title v-text="'Last 7 days'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {
        $refs.menuRefp.isActive = false;
        changePeriod('Last 15 days')
        }">
        <v-list-item-content>
          <v-list-item-title v-text="'Last 15 days'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {
        $refs.menuRefp.isActive = false;
        changePeriod('Last 1 month')
        }">
        <v-list-item-content>
          <v-list-item-title v-text="'Last 1 month'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {
        $refs.menuRefp.isActive = false;
        changePeriod('Custom')
        }">
        <v-list-item-content>
          <v-list-item-title v-text="'Custom'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-menu>
            <VueDatePicker
                    v-model="date"
                    style="opacity: 0; top: -200px"
                    v-if="calenderVisible"
                    :visible="calenderVisible"
                    range
                    @onChange="onClickOk()"
                    @onClose="onClose()"
                    validate
                    :locale="{lang: 'en'}"
                    :max-date="new Date()"
                    placeholder="Custom"/>
          </div>
        </v-col>
      </v-row>
      <!-- VGOS -->
      <v-row class="pl-4" style="margin-top: -28px;">
        <v-col v-for="(item,index) in NudgeData" :key="index" class="white d-flex justify-start flex-row mr-4 rounded-xl pa-4">
          <div style="height: 48px; width: 48px;" class="mr-4">
            <v-img v-if="index == 0" src="@/assets/signup.svg"></v-img>
            <v-img v-if="index == 1" src="@/assets/screening_c.svg"></v-img>
            <v-img v-if="index == 2" src="@/assets/mains_c.svg"></v-img>
            <v-img v-if="index == 3" src="@/assets/demo_c.svg"></v-img>
            <v-img v-if="index == 4" src="@/assets/demo_c.svg"></v-img>
          </div>
          <div>
            <div style="font-size: 12px; font-weight: 500;">
              {{ item.title }}
            </div>
            <div style="font-style: 16px">
              {{ item.value }} <span v-if="item.percentage" class="ml-1" style="font-size: 12px;color: #39AD37;">({{item.percentage}}%)</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="pt-0">
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Teacher's Conversion</v-card-title>
            <v-card-text style="text-align: center; position: relative;">
              <div style="position: absolute; top: 78px;z-index: 1;left: 107px;">
                <div style="font-size: 22px; font-weight: 700; color: black;">
                  {{ NudgeData[3].value }}
                </div>
                <div style="color: black;">
                  Teachers
                </div>
              </div>
              <GChart
                type="PieChart"
                :data="pieChartDataForConversion"
                :options="pieChartOptions"
                :resizeDebounce="0"
              >
              </GChart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Interview/Demo success rate</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                :height="260"
                type="ColumnChart"
                :data="chartDataForInterview"
                :options="chartOptionsForVgosScreening"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Assessment success rate</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                :height="260"
                type="ColumnChart"
                :data="chartDataForSuccess"
                :options="chartOptionsForVgosScreeningCount"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Job Seekers -->
      <v-row>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Avg. Time To Answer</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                type="SteppedAreaChart"
                :data="chartDataForTimeToAnswer"
                :options="chartOptionsForAvgTime"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Assessment attempted count</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                :height="260"
                type="ColumnChart"
                :data="chartDataForUsers"
                :options="chartOptionsForVgosScreeningCount"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Sign Up by Platform</v-card-title>
            <v-card-text style="text-align: center; position: relative;">
              <div style="position: absolute; top: 78px;z-index: 1;left: 107px;">
                <div style="font-size: 22px; font-weight: 700; color: black;">
                  265
                </div>
                <div style="color: black;">
                  Teachers
                </div>
              </div>
              <GChart
                type="PieChart"
                :data="pieChartDataForPlatform"
                :options="pieChartOptions"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { GChart } from "vue-google-charts/legacy";
import ChartsController from "@/controllers/ChartsController";
export default {
  name: "HomeView",
  components: {
    GChart,
  },
  data() {
    return {
      dataTypeItem: [
        {
          items: this.campaignList,
          title: 'Campaigns',
        },
        {
          items: this.schoolListList,
          title: 'Schools',
        },
      ],
      calenderVisible: false,
      campaignList: [],
      schoolList:[],
      userType: 'ALL',
      userTypeArray: ['ALL','TEACHER','JOB_SEEKER'],
      dataType: 'Default',
      selectedCampaign: -1,
      selectedSchool: -1,
      period: 'Last 1 month',
      date: new Date(),
      NudgeData: [
        {
        title: "Total Sign Up",
        value: 4500,
        percentage: 0,
        },
        {
        title: "Screening Cleared",
        value: 450,
        percentage: 0,
        },
        {
        title: "Mains Cleared",
        value: 4500,
        percentage: 0,
        },
        {
        title: "Demo Cleared",
        value: 450,
        percentage: 0,
        },
        {
        title: "Interview Cleared",
        value: 45,
        percentage: 0,
        },
      ],
      chartDataForConversion: [],
      chartDataForInterview: [],
      chartDataForSuccess: [],
      chartDataForUsers: [],
      chartDataForTimeToAnswer: [],
      pieChartDataForConversion: [],
      pieChartDataForPlatform: [],
      chartData: [
        ["Level","Screening", "Mains"],
        ["Pre Primary", 70, 89],
        ["Foundational",100, 65],
        ["Preperatory", 70, 89],
        ["Middle", 70, 89],
        ["Secondary", 100, 13],
        ["Sr. Secondary", 52, 89],
      ],
      pieChartData: [
          ['Status', 'No of users'],
          ['Selected', 62],
          ['Maybe', 47],
          ['Not Selected', 156],
      ],
      pieChartOptions: {
        legend: { position: "right"},
        colors: ["#06C270", "#FF9F0A", "#FF453A"],
        height: 200,
        width: 385,
        pieHole: 0.75,
        chartArea: {width: '100%', height: '100%'},
        pieSliceTextStyle: {color: 'black', fontSize: 14},
        pieSliceText: 'none',
      },
      chartOptionsForVgosScreening: {
        //title: "VGOS Screening",
        curveType: "function",
        legend: { position: "top", alignment: "end" },
        colors: ["#467BCA", "#FFB200"],
        height: 200,
        width: 385,
        chartArea: {width: '80%', height: '50%', left: 50},
        vAxis: {title: 'Percentage', titleTextStyle: {fontSize: 10, italic: false}},
        hAxis: {title: 'Levels', titleTextStyle: {fontSize: 10, italic: false}}
      },
      chartOptionsForVgosScreeningCount: {
        //title: "VGOS Screening",
        curveType: "function",
        legend: { position: "top", alignment: "end" },
        colors: ["#467BCA", "#FFB200"],
        height: 200,
        width: 385,
        chartArea: {width: '80%', height: '50%', left: 50},
        vAxis: {title: 'No. of users', titleTextStyle: {fontSize: 10, italic: false}},
        hAxis: {title: 'Levels', titleTextStyle: {fontSize: 10, italic: false}}
      },
      chartOptionsForAvgTime: {
        //title: "VGOS Screening",
        curveType: "function",
        legend: { position: "top", alignment: "end" },
        colors: ["#467BCA", "#FFB200"],
        height: 200,
        width: 385,
        chartArea: {width: '80%', height: '50%', left: 50},
        vAxis: {title: 'Avg time', titleTextStyle: {fontSize: 10, italic: false}},
        hAxis: {title: 'Levels', titleTextStyle: {fontSize: 10, italic: false}},
        isStacked: true,
      },
      payload: {
        user_type: 'ALL',
        campaign_id: -1,
        school_id: -1,
        start_date: JSON.stringify(new Date(new Date().setDate(new Date().getDate() - 30))).slice(0,11),
        end_date: JSON.stringify(new Date()).slice(0,11),
      }
    };
  },
  methods: {
    changeDataType (title,item) {
      console.log(title, item);
      if (title == 'Campaigns') {
        this.payload.school_id = -1;
        this.payload.campaign_id = item.id;
        this.selectedCampaign = item.name;
        this.selectedSchool = -1;
      }
      else if (title == 'Schools') {
        this.payload.school_id = item.id;
        this.payload.campaign_id = -1;
        this.selectedCampaign = -1;
        this.selectedSchool = item.name;
      }
      else {
        this.payload.school_id = -1;
        this.payload.campaign_id = -1;
        this.selectedCampaign = -1;
        this.selectedSchool = -1;
      }
      this.getDashboardData(this.payload);
    },
    onClose () {
      // this.period = 'Last 30 days'
      this.calenderVisible = false;
    },
    onClickOk() {
      this.payload.start_date = this.date.start;
      this.payload.end_date = this.date.end;
      this.getDashboardData(this.payload);
    },
    changePeriod(p) {
      console.log(p)
      this.period = p;
      if (this.period == 'Last 15 days') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 15));
        this.payload.start_date = JSON.stringify(start_date).slice(1,11),
        this.payload.end_date = JSON.stringify(end_date).slice(1,11),
        this.date = new Date();
        this.getDashboardData(this.payload)
      }
      else if (this.period == 'Last 7 days') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 7));
        this.payload.start_date = JSON.stringify(start_date).slice(1,11),
        this.payload.end_date = JSON.stringify(end_date).slice(1,11),
        this.date = new Date();
        this.getDashboardData(this.payload)
      }
      else if (this.period == 'Last 1 month') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 30));
        this.payload.start_date = JSON.stringify(start_date).slice(1,11),
        this.payload.end_date = JSON.stringify(end_date).slice(1,11),
        this.date = new Date();
        this.getDashboardData(this.payload)
      }
      else {
        this.calenderVisible = true;
      }
    },
    changeUserType() {
      this.payload.user_type = this.userTypeArray[this.userType];
      this.getDashboardData(this.payload)
    },
    async getDashboardData(data) {
      const response = await ChartsController.getDashboardData(data);
      if (response.data.success) {
      this.NudgeData[0].value = response.data.data.total_sign_up;
      this.NudgeData[1].value = response.data.data.screening_cleared;
      this.NudgeData[1].percentage = Math.round((response.data.data.screening_cleared / this.NudgeData[0].value)*100);
      this.NudgeData[2].value = response.data.data.mains_cleared;
      this.NudgeData[2].percentage = Math.round((response.data.data.mains_cleared / this.NudgeData[0].value)*100);
      this.NudgeData[3].value = response.data.data.demo_cleared;
      this.NudgeData[3].percentage = Math.round((response.data.data.demo_cleared / this.NudgeData[0].value)*100);
      this.NudgeData[4].value = response.data.data.interview_cleared;
      this.NudgeData[4].percentage = Math.round((response.data.data.interview_cleared / this.NudgeData[0].value)*100);

      this.chartDataForInterview = this.convertData(
        response.data.data.interview, ['Level','Demo', 'Interview']
      );
      this.chartDataForSuccess = this.convertData(
        response.data.data.success, ['Level','Screening', 'Mains']
      );
      
      this.chartDataForTimeToAnswer = this.convertData(
        response.data.data.time_to_answer, ['Level','Screening', 'Mains']
      );
      this.chartDataForUsers = this.convertData(
        response.data.data.users, ['Level','Screening', 'Mains']
      );
      this.pieChartDataForConversion = this.convertData(
        response.data.data.conversion, ['Offer selection','Count']
      );
      this.pieChartDataForPlatform = this.convertData(
        response.data.data.platform, ['Platform','Count']
      );
      }
    },
    convertData(data, labels) {
      const result = [
        [...labels],
      ];
      data.forEach(element => {
        const dummy = [];
        Object.keys(element).forEach((k) => {
          dummy.push(element[k]);
        })
        result.push(dummy);
      });
      return result;
    },

    async getCampaign() {
      const response = await ChartsController.getCampaign();

      if (response.data.success) {
        this.dataTypeItem[0].items = response.data.data;
      }
      else {
        alert('Error fetching the data')
      }
    },

    async getSchool() {
      const response = await ChartsController.getSchool();

      if (response.data.success) {
        this.dataTypeItem[1].items = response.data.data;
      }
      else {
        alert('Error fetching the data')
      }
    }
   
  },

  created() {
    this.getDashboardData(this.payload);
    this.getCampaign();
    this.getSchool();
  },
};
</script>

<style>
.vd-menu__content {
    top: 60px !important;
    left: 1200px !important;
}
.v-menu__content {
  max-height: 300px;
  max-width: 400px;
}
</style>
