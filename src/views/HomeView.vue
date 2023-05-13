<template>
  <div>
    <v-container>
      <!-- VGOS -->
      <v-row>
        <v-col cols="6">
          <v-card class="rounded-xl" outlined>
            <v-card-title>VGOS Screening</v-card-title>
            <v-card-text style="text-align: center">
              <GChart
                type="ColumnChart"
                :data="chartDataForVgosScreening"
                :options="chartOptionsForVgosScreening"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl" outlined>
            <v-card-title>VGOS Mains</v-card-title>

            <v-card-text style="text-align: center">
              <GChart
                type="ColumnChart"
                :data="chartDataForVgosMains"
                :options="chartOptionsForVgosMains"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Job Seekers -->
      <v-row>
        <v-col cols="6">
          <v-card class="rounded-xl" outlined>
            <v-card-title>Job Seekers Screening</v-card-title>

            <v-card-text style="text-align: center">
              <GChart
                type="ColumnChart"
                :data="chartDataForJobSeekerScreening"
                :options="chartOptionsForJobSeekerScreening"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="rounded-xl" outlined>
            <v-card-title>Job Seekers Mains</v-card-title>

            <v-card-text style="text-align: center">
              <GChart
                type="ColumnChart"
                :data="chartDataForJobSeekrMains"
                :options="chartOptionsForJobSeekerMains"
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
import AuthService from '@/services/AuthService';
export default {
  name: "HomeView",
  components: {
    GChart,
  },
  data() {
    return {
      chartDataForVgosScreening: [],
      chartDataForVgosMains: [],
      chartDataForJobSeekerScreening: [],
      chartDataForJobSeekrMains: [],

      chartData: [
        ["Level", "Passed", "Failed", "In Progress", "Yet To Be Assessed"],
        ["Pre Primary", 1000, 400, 200, 200],
        ["Primary", 1170, 460, 250, 200],
        ["Secondary", 660, 1120, 300, 200],
        ["Sr. Secondary", 1030, 540, 350, 200],
      ],
      chartOptionsForVgosScreening: {
        //title: "VGOS Screening",
        curveType: "function",

        legend: { position: "right" },
        colors: ["#06C270", "#e0440e", "#0967C6", "grey"],

        height: 300,
      },
      chartOptionsForVgosMains: {
        //title: "VGOS Mains",
        curveType: "function",
        legend: { position: "right" },
        colors: ["#06C270", "#e0440e", "#0967C6", "grey"],
        height: 300,
      },
      chartOptionsForJobSeekerScreening: {
        //title: "Job Seekers Screening",
        curveType: "function",

        legend: { position: "right" },
        colors: ["#06C270", "#e0440e", "#0967C6", "grey"],

        height: 300,
      },
      chartOptionsForJobSeekerMains: {
        //title: "Job Seekers Mains",
        curveType: "function",
        legend: { position: "right" },

        colors: ["#06C270", "#e0440e", "#0967C6", "grey"],
        height: 300,
      },
    };
  },
  methods: {
    async getDashboardData() {
      const response = await ChartsController.getDashboardData();
      if(response.data=='Unauthorized'){
        AuthService.logout();
      }
      console.log(response);
      this.chartDataForVgosScreening = this.convertData(
        response.data.data.teacher.screening
      );
      this.chartDataForVgosMains = this.convertData(
        response.data.data.teacher.mains
      );

      this.chartDataForJobSeekerScreening = this.convertData(
        response.data.data.job_seeker.screening
      );
      this.chartDataForJobSeekrMains = this.convertData(
        response.data.data.job_seeker.mains
      );
    },
    convertData(data) {
      const result = [
        ["Level", "Passed", "Failed", "In Progress", "Yet To Be Assessed"],
      ];
      const levels = {};

      // iterate over each category of data
      Object.keys(data).forEach((category) => {
        // iterate over each item in the category and group by level name
        data[category].forEach((item) => {
          if(item.level!=null){
            const levelName = item.level.name;
          if (!levels[levelName]) {
            levels[levelName] = {
              passed: 0,
              failed: 0,
              in_progress: 0,
              yet_to_be_assessed: 0,
            };
          }
          levels[levelName][category] += parseInt(item.users);
          }
        });
      });

      // add each level's data to the result array
      Object.keys(levels).forEach((levelName) => {
        const levelData = levels[levelName];
        result.push([
          levelName,
          levelData.passed,
          levelData.failed,
          levelData.in_progress,
          levelData.yet_to_be_assessed,
        ]);
      });

      return result;
    },
   
  },

  created() {
    this.getDashboardData();
  },
};
</script>
