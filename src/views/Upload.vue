<template>
  <div class="upload">
    <upload-button></upload-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UploadButton from "../components/UploadButton.vue";

export default Vue.extend({
  name: "upload",
  components: { UploadButton }
});
</script>
