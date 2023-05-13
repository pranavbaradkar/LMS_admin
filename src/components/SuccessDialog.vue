<template>
    <v-dialog v-model="dialogVisible" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">{{ message }}</p>
            <v-btn class="primary" large width="157px" rounded @click="closeDialog">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'SuccessDialog',
data() {
    return {
        dialogVisible:true,
    }
},    props: {
    
      message: String,
    },
    methods: {
      closeDialog() {
        this.$emit('close');
      }
    }
  }
  </script>
  