<template>
  <v-container class="ma-16">
    <div class="d-flex justify-center myInput">
      <input class="mt-16" type="file" @change="onFileSelected" />
      <button @click="uploadFile">Upload</button>
    </div>
  </v-container>
</template>

<script>
import UploadController from "../controllers/UploadController";

export default {
  name: "TestView",
  data() {
    return {
      selectedFile: null,
      preSignedUrl: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (!this.selectedFile) {
        console.error("No file selected");
        return;
      }
      this.getPreSignedUrl();
      // const contentType = this.selectedFile.type;
      // const contentLength = this.selectedFile.size;

      // axios.put(this.preSignedUrl, this.selectedFile, {
      //     headers: {
      //       'Content-Type': contentType,
      //       'Content-Length': contentLength
      //     }
      //   })
      //   .then(response => {
      //     console.log('Image uploaded successfully',response);
      //   })
      //   .catch(error => {
      //     console.error('Error uploading image: ', error);
      //   });
    },
    async getPreSignedUrl() {
      const response = await UploadController.getPreSignedUrl({
        context: "user-profiles",
        file_name: this.selectedFile.name,
        mime_type: this.selectedFile.type,
        file_type: "images",
        business_type: "b2c",
        uuid: "123-456-7",
      });
      this.preSignedUrl = response.data.data.signed_request;
      this.uploadToS3();

    },
    async uploadToS3() {
      console.log("Pre-Signed URL: ", this.preSignedUrl);
      const uploadResponse = await UploadController.uploadFile(
        this.preSignedUrl,
        this.selectedFile
      );
      console.log("Upload Response: ", uploadResponse);
    },
  },
};
</script>
