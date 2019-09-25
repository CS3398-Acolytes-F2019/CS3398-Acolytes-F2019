<template>
    <div class="upload-button">
        <!-- <input type="file" class="btn btn-primary" @change="onFileChange" /> -->

        <div class="input-group">
            <div class="input-group-prepend">
                <button class="input-group-text" :disabled="isDisabled">Upload</button>
            </div>
            <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileChange" />
                <label class="custom-file-label">Choose file</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { HTMLInputEvent } from "../interfaces/HTMLInputEvent";
import { FileStream } from "../modules/FileStream";

export default Vue.extend({
    name: "upload-button",
    data: () => 
    {
        let data =
        {
            progress: 0,
            file: {} as File
        }
        return data;
    },
    methods:
    {
        onFileChange(event: HTMLInputEvent) 
        {
            const fileList = event.target.files;

            if (!fileList) return;

            this.file = fileList[0];
            console.log(this.file);
        },
        encryptAndUpload()
        {
            const readableStream = new ReadableStream({
                start: controller => { new FileStream(this.file, controller, this.updateProgress) }
            });
        },
        updateProgress(progress: number) 
        {
            progress > 1 ? this.progress = 100 : this.progress = progress * 100;
            return;
        },
        isDisabled()
        {
            return !this.file;
        }
    }
});

</script>