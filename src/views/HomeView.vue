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
              <v-select
                style="width: 100px;"
                :items="['Default', 'Campaign', 'School']"
                dense
                v-model="dataType"
              ></v-select>
            </div>
          </div>

          <div>
            <v-select
                label="Period"
                rounded
                style="width: 200px;"
                :items="['Today', 'Last 7 days', 'Last 1 month', 'Custom']"
                dense
                outlined
                v-model="period"
                @change="changePeriod"
                :menu-props="{
                      closeOnClick: true,
                      closeOnContentClick: true,
                      }">
            </v-select>
            <VueDatePicker
                    v-model="date"
                    style="opacity: 0; top: -200px"
                    v-if="period == 'Custom'"
                    :visible="period == 'Custom'"
                    range
    @onChange="onClickOk('-- date changed --')"
    @onClose="onClose('-- datepicker closed --')"
                    validate
                    :locale="{lang: 'en'}"
                    placeholder="Custom"/>
          </div>
        </v-col>
      </v-row>
      <!-- VGOS -->
      <v-row class="pl-4" style="margin-top: -28px;">
        <v-col v-for="(item,index) in NudgeData" :key="index" class="white d-flex justify-start flex-row mr-4 rounded-xl pa-4">
          <div style="height: 48px; width: 48px;" class="mr-4">

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
              <div style="position: absolute; top: 74px;z-index: 1;left: 104px;">
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
            <v-card-title style="font-weight: 400;">Success %</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                :height="260"
                type="ColumnChart"
                :data="chartDataForSuccess"
                :options="chartOptionsForVgosScreening"
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
            <v-card-title style="font-weight: 400;">User</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                :height="260"
                type="ColumnChart"
                :data="chartDataForUsers"
                :options="chartOptionsForVgosScreening"
                :resizeDebounce="0"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-xl" outlined>
            <v-card-title style="font-weight: 400;">Sign Up by Platform</v-card-title>
            <v-card-text style="text-align: center; position: relative;">
              <div style="position: absolute; top: 74px;z-index: 1;left: 104px;">
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
      userType: 'ALL',
      userTypeArray: ['ALL','TEACHER','JOB_SEEKER'],
      dataType: 'Default',
      period: 'Today',
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
    };
  },
  methods: {
    onClose () {
      // this.period = 'Last 30 days'
    },
    onClickOk() {
      this.getDashboardData({
        start_date: this.date.start,
        end_date: this.date.end,
        user_type: this.userTypeArray[this.userType]
      })
    },
    changePeriod() {
      console.log(this.period)
      if (this.period == 'Today') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 1));
        this.getDashboardData({
          start_date: JSON.stringify(start_date).slice(1,11),
          end_date: JSON.stringify(end_date).slice(1,11),
          user_type: this.userTypeArray[this.userType]
        })
      }
      else if (this.period == 'Last 7 days') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 7));

        this.getDashboardData({
          start_date: JSON.stringify(start_date).slice(1,11),
          end_date: JSON.stringify(end_date).slice(1,11),
          user_type: this.userTypeArray[this.userType]
        })
      }
      else if (this.period == 'Last 1 month') {
        const end_date = new Date();
        const current_date = new Date();
        const start_date = new Date(current_date.setDate(current_date.getDate() - 30));
        this.getDashboardData({
          start_date: JSON.stringify(start_date).slice(1,11),
          end_date: JSON.stringify(end_date).slice(1,11),
          user_type: this.userTypeArray[this.userType]
        })
      }
    },
    changeUserType() {
      this.getDashboardData({user_type: this.userTypeArray[this.userType]})
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
   
  },

  created() {
    this.getDashboardData({});
  },
};
</script>

<style>
.vd-menu__content {
    top: 60px !important;
    left: 1200px !important;
}
</style>
