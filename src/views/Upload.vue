<template>
    <div class="upload">
        <template>
            <div class="home">
                <div class="share-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 class="display-4">File Trust</h1>
                    <hr />
                </div>

                <div class="container">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="card-deck mb-3 text-center">
                        <div class="card mb-4 box-shadow">
                            <div class="card-header">
                                <h4 class="my-0 font-weight-normal">Upload</h4>
                            </div>
                            <div class="card-body">
                                <progress-circle></progress-circle>
                                <br />
                                <file-input @readable-stream="uploadStream"></file-input>
                                <br />
                                <button
                                    class="btn btn-primary"
                                    :disabled="isDisabled"
                                    @click="encryptAndUpload"
                                >Encrypt &amp; Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import FileInput from "../components/FileInput.vue";
import ProgressCircle from "../components/ProgressCircle.vue";
import { FileStream } from '../modules/FileStream';

export default Vue.extend({
    name: "upload",
    data()
    {
        interface IData
        {
            fileStream: ReadableStream | null;
            isDisabled: boolean;
        }

        const data: IData =
        {
            fileStream: null,
            isDisabled: true
        }

        return data;
    },
    methods:
    {
        uploadStream(readableStream: ReadableStream)
        {
            this.fileStream = readableStream;
            this.isDisabled = false;
        },
        async encryptAndUpload()
        {
            if (!this.fileStream)
            {
                return;
            }
            let reader = this.fileStream.getReader();

            let index = 0;

            let chunk = await reader.read();

            while (!chunk.done)
            {

                if (index !== 0)
                {
                    return;
                }

                let data =
                {
                    chunk: chunk.value,
                    index
                }


                let response = await fetch("./api/upload", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });


                console.log(JSON.stringify(data))

                this.$root.$emit("update_progress_message", 100)

                chunk = await reader.read();

                index++;
            }
        },
    },
    components:
    {
        FileInput,
        ProgressCircle
    }
});
</script>

<style scoped>
html {
    font-size: 14px;
}
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

.container {
    max-width: 425px;
}

.share-header {
    max-width: 700px;
}

.card-deck .card {
    min-width: 220px;
}

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>