<template>
  <div class="upload-button">
    <h2>Select an File</h2>
    <input type="file" @change="onFileChange" />
    {{progress}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { HTMLInputEvent } from "../interfaces/HTMLInputEvent";

export default Vue.extend({
  data: () => {
    return {
        progress: 0
    }
  },
  methods: {
    onFileChange(event: HTMLInputEvent) {
      const fileList = event.target.files;

      if (!fileList) return;

      const file = fileList[0];

      let updateProgress = (progress: number) => {this.progress = progress};

      const readableStream = new ReadableStream({
        start: controller => {
          const fileSize = file.size;
          const chunkSize = 65536;
          let offset = 0;

          function readerHandler(event: ProgressEvent<any>) {

            offset += chunkSize;

            let slice = new Uint8Array(event.target.result);

            updateProgress(progress());

            if (!controller) return;

            if (offset >= fileSize) {
              controller.close();
              return;
            }

            controller.enqueue(slice);

            seek();
          }

          function progress() {
            let progress = offset / fileSize;
            if (progress > 1) return 100;
            return progress * 100;
          }

          function seek() {
            let fileReader = new FileReader();
            let blob = file.slice(offset, offset + chunkSize);
            fileReader.onload = readerHandler;
            fileReader.readAsArrayBuffer(blob);
          }

          seek();
        }
      });
    },
    updateProgress() {}
  }
});
</script>