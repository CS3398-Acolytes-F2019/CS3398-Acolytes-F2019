<template>
    <div class="file-input">
        <div class="input-group">
            <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileChange"/>
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

            this.encrypt();
        },
        encrypt()
        {
            const readableStream = new ReadableStream({
                start: controller => { new FileStream(this.file, controller) }
            });

            this.$emit("readable-stream", readableStream);
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
.custom-file-label {
    margin: auto;
}
</style>