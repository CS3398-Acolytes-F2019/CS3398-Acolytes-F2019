<template>
    <div class="upload">
        <file-input></file-input>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FileInput from "../components/FileInput.vue";

export default Vue.extend({
    name: "upload",
    methods:
    {
    },
    components: {
        FileInput
    }
});
</script>
