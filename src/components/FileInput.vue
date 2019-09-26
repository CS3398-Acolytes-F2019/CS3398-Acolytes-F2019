<template>
    <div class="file-input">
        <div class="input-group">
            <div class="input-group-prepend">
                <button class="input-group-text" :disabled="isDisabled">&nbsp;&nbsp;&nbsp;&nbsp;Upload <progress-circle></progress-circle></button>
            </div>
            <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileChange" />
                <label class="custom-file-label">{{ name }}</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProgressCircle from "./ProgressCircle.vue";
import { HTMLInputEvent } from "../interfaces/HTMLInputEvent";
import { FileStream } from "../modules/FileStream";

export default Vue.extend({
    name: "file-input",
    data()
    {
        let data =
        {
            progress: 0,
            file: {} as File,
            name: "Choose File"
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

            this.name = this.file.name;

            this.encryptAndUpload();
        },
        encryptAndUpload()
        {
            let callback = this.updateProgress;
            const readableStream = new ReadableStream({
                start: controller => { new FileStream(this.file, controller, callback) }
            });
        },
        updateProgress(progress: number)
        {
            let old_progress = this.progress;

            progress > 1 ? this.progress = 100 : this.progress = progress * 100;

            if (Math.round(old_progress) == Math.round(this.progress)) return;

            this.$root.$emit("update_progress_message", Math.round(this.progress))

            return;
        },
        isDisabled()
        {
            return !this.file;
        }
    },
    components:
    {
        ProgressCircle
    }
});

</script>

<style scoped>
</style>