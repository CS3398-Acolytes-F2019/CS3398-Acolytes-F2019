<template>
    <div class="upload">
        <upload-button></upload-button>
        <progress-circle></progress-circle>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import UploadButton from "../components/UploadButton.vue";
import ProgressCircle from "../components/ProgressCircle.vue";

export default Vue.extend({
    name: "upload",
    components: {
        UploadButton,
        ProgressCircle
    }
});
</script>
