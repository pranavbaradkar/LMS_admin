<template>
    <div>
      <v-container fluid class="ml-2">
        <!-- VGOS -->
        <v-row class="pl-4">
          <v-col v-for="(item,index) in NudgeData" :key="index" class="white d-flex justify-start flex-row mr-4 rounded-xl pa-4">
            <div style="height: 48px; width: 48px;" class="mr-4">
  
            </div>
            <div>
              <div style="font-style: 16px">
                {{ item.value }}
              </div>
              <div style="font-size: 12px; font-weight: 500;">
                {{ item.title }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="pt-0">
            <v-col cols="4">
            <v-card class="rounded-xl" outlined>
              <v-card-title style="font-weight: 400;">User status</v-card-title>
              <v-card-text style="text-align: center; position: relative;">
                <div style="position: absolute; top: 70px;z-index: 1;left: 101px;">
                  <div style="font-size: 22px; font-weight: 700; color: black;">
                    {{ NudgeData[0].value }}
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
              <v-card-title style="font-weight: 400;">Pass Rate- Grades</v-card-title>
              <v-card-text style="text-align: center">
                <GChart
                  :height="260"
                  type="ColumnChart"
                  :data="chartDataForGrades"
                  :options="chartOptionsForPass"
                  :resizeDebounce="0"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="rounded-xl" outlined>
              <v-card-title style="font-weight: 400;">Bloom’s Taxonomy</v-card-title>
              <v-card-text style="text-align: center">
                <GChart
                  :height="260"
                  type="ColumnChart"
                  :data="chartDataForBlooms"
                  :options="chartOptionsForBloom"
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
              <v-card-title style="font-weight: 400;">Avg. Score</v-card-title>
              <v-card-text style="text-align: center">
                <GChart
                  type="SteppedAreaChart"
                  :data="chartDataForSkills"
                  :options="chartOptionsForAvgMarks"
                  :resizeDebounce="0"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="rounded-xl" outlined>
              <v-card-title style="font-weight: 400;">Success Rate-Difficulty Level</v-card-title>
              <v-card-text style="text-align: center">
                <GChart
                  :height="260"
                  type="BarChart"
                  :data="pieChartDataForConversion"
                  :options="chartOptionsForLevel"
                  :resizeDebounce="0"
                />
              </v-card-text>
            </v-card>
            </v-col>
          <v-col cols="4">
            <v-card class="rounded-xl" outlined>
              <v-card-title style="font-weight: 400;">Dropout Rate- Grades</v-card-title>
              <v-card-text style="text-align: center">
                <GChart
                  type="SteppedAreaChart"
                  :data="chartDataForDropout"
                  :options="chartOptionsForDropOut"
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
    props: {
    id: Number,
    },
    data() {
      return {
        usertType: 'ALL',
        userTypeArray: ['ALL','TEACHER','JOB_SEEKER'],
        dataType: 'Default',
        period: 'Last 30 days',
        NudgeData: [
          {
          title: "Users Attended Assessment",
          value: 4500,
          },
          {
          title: "Users In Progress",
          value: 450,
          },
          {
          title: "Users Cleared Assessment",
          value: 4500,
          },
          {
          title: "Users Failed Assessment",
          value: 450,
          },
        ],
        chartDataForConversion: [],
        chartDataForGrades: [],
        chartDataForBlooms: [],
        chartDataForSkills: [],
        chartDataForDropout: [],
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
          width: 370,
          pieHole: 0.75,
          chartArea: {width: '100%', height: '100%'},
          pieSliceTextStyle: {color: 'black', fontSize: 14},
          pieSliceText: 'none',
        },
        chartOptionsForPass: {
          //title: "VGOS Screening",
          curveType: "function",
          legend: 'none',
          height: 200,
          width: 370,
          chartArea: {width: '85%', height: '50%', left: 40},
          vAxis: {title: 'Pass rate', titleTextStyle: {fontSize: 12, italic: false}},
          hAxis: {title: 'Grades', titleTextStyle: {fontSize: 12, italic: false}},
          colors: ['#467BCA']
        },
        chartOptionsForBloom: {
          //title: "VGOS Screening",
          curveType: "function",
          legend: 'none',
          height: 200,
          width: 370,
          chartArea: {width: '85%', height: '50%', left: 40},
          vAxis: {title: 'Avg marks', titleTextStyle: {fontSize: 12, italic: false}},
          hAxis: {title: "Bloom's taxonomy", titleTextStyle: {fontSize: 12, italic: false}},
          colors: ['#467BCA']
        },
        chartOptionsForLevel: {
          //title: "VGOS Screening",
          curveType: "function",
          legend: 'none',
          height: 200, 
          width: 370,
          chartArea: {width: '85%', height: '50%', left: 40},
          vAxis: {title: 'Difficulty', titleTextStyle: {fontSize: 12, italic: false}},
          hAxis: {title: 'Success rate', titleTextStyle: {fontSize: 12, italic: false}}
        },
        chartOptionsForAvgMarks: {
          //title: "VGOS Screening",
          curveType: "function",
          legend: 'none',
          height: 200,
          width: 370,
          chartArea: {width: '85%', height: '50%', left: 40},
          vAxis: {title: 'Avg score', titleTextStyle: {fontSize: 12, italic: false}},
          hAxis: {title: 'Skills', titleTextStyle: {fontSize: 12, italic: false}},
        },
        chartOptionsForDropOut: {
          //title: "VGOS Screening",
          curveType: "function",
          legend: 'none',
          height: 200,
          width: 370,
          chartArea: {width: '85%', height: '50%', left: 40},
          vAxis: {title: 'Dropout rate', titleTextStyle: {fontSize: 12, italic: false}},
          hAxis: {title: 'Grades', titleTextStyle: {fontSize: 12, italic: false}},
        },
      };
    },
    methods: {
      changeUserType() {
        this.getDashboardData({user_type: this.userTypeArray[this.usertType]})
      },
      async getDashboardData() {
        const response = await ChartsController.getAssessmentData({assessment_id: this.id});
        if (response.data.success) {
        this.NudgeData[0].value = response.data.data.users_attended_assessment;
        this.NudgeData[1].value = response.data.data.users_in_progress;
        this.NudgeData[2].value = response.data.data.user_cleared_assessment;
        this.NudgeData[3].value = response.data.data.user_failed_assessment;

        this.pieChartDataForConversion = this.convertData(
          response.data.data.success_rate_difficulty, ['difficulty','Success rate']
        );
        this.chartDataForGrades = this.convertData(
          response.data.data.pass_rate_grades, ['Grade','Pass Rate']
        );
        this.chartDataForBlooms = this.convertData(
          response.data.data.blooms_taxonomy, ['Bloomtaxonomy','Avg-marks']
        );
  
        this.chartDataForSkills = this.convertData(
          response.data.data.average_scores, ['Skill','Avg-marks']
        );

        this.chartDataForDropout = this.convertData(
          response.data.data.dropout_rate, ['Grade','Rate']
        );
        // this.chartDataForUsers = this.convertData(
        //   response.data.data.users, ['Level','Screening', 'Mains']
        // );
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
  