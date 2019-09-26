<template>
    <div class="upload">
        <file-input @file-stream="uploadStream"></file-input>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FileInput from "../components/FileInput.vue";
import { FileStream } from '../modules/FileStream';

export default Vue.extend({
    name: "upload",
    methods:
    {
        uploadStream(fileStream: FileStream)
        {

        }
    },
    components: {
        FileInput
    }
});
</script>
