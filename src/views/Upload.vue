<template>
    <div class="upload">
        <template>
            <div class="home">
                <div class="share-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 class="display-4">File Trust</h1>
                    <hr />
                </div>
                <div class="text-center" v-if="downloadUrl">
                    <div class="alert alert-success" role="alert">
                        <strong>File Uploaded!</strong>
                        <br />
                        <a v-bind:href="downloadUrl">{{downloadUrl}}</a>
                    </div>
                </div>
                <div class="container">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="card-deck mb-3">
                        <div class="card mb-4 box-shadow">
                            <div class="card-header text-center">
                                <h4 class="my-0 font-weight-normal">Upload</h4>
                            </div>
                            <div class="card-body">
                                <progress-circle class="text-center"></progress-circle>
                                <br />
                                <form>
                                    <div class="form-group">
                                        <file-input
                                            @file-event="fileInputHandler"
                                            v-bind:max-size="maxSize"
                                        ></file-input>
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password (optional)"
                                            v-model="password"
                                        />
                                    </div>
                                    <div class="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="option1Day"
                                            v-model="deleteAfterOneDay"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="option1Day"
                                        >Delete after 1 day</label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="option1Download"
                                            v-model="deleteAfterOneDownload"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="option1Download"
                                        >Delete after 1 download</label>
                                    </div>
                                    <br />
                                    <div class="text-center">
                                        <button
                                            class="btn btn-primary"
                                            :disabled="isDisabled"
                                            @click="encryptAndUpload"
                                        >Encrypt &amp; Upload</button>
                                    </div>
                                </form>
                                <br />
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
import { Firebase } from "../modules/Firebase";


interface FileEvent
{
    readableStream: ReadableStream;
    file: File;
    key: string;
}

interface StoreJSON
{
    fileUrl: string;
}


const functions = "https://us-central1-file-trust.cloudfunctions.net";

export default Vue.extend({
    name: "upload",
    data()
    {
        interface IData
        {
            maxSize: number;
            fileStream: ReadableStream | null;
            file: File | null;
            key: string | null;
            isDisabled: boolean;
            password: string | null;
            deleteAfterOneDay: boolean;
            deleteAfterOneDownload: boolean;
            downloadUrl: string;
        }

        const data: IData = {
            maxSize: 1e+6,
            fileStream: null,
            file: null,
            key: null,
            isDisabled: true,
            password: null,
            deleteAfterOneDay: false,
            deleteAfterOneDownload: false,
            downloadUrl: ""
        }

        return data;
    },
    methods:
    {
        fileInputHandler(options: any)
        {
            this.fileStream = options.readableStream;
            this.file = options.file;
            this.key = options.password;
            this.isDisabled = false;
        },
        async encryptAndUpload(event: Event)
        {
            event.preventDefault();

            if (!this.file)
            {
                return;
            }

            // Store file into database
            const file = {
                name: this.file.name,
                size: this.file.size,
                options: {
                    password: this.password,
                    deleteAfterOneDay: this.deleteAfterOneDay,
                    deleteAfterOneDownload: this.deleteAfterOneDownload
                }
            }

            const storeResponse = await fetch("https://us-central1-file-trust.cloudfunctions.net/api/store", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(file)
            })

            let fileUrl = await generateUUID();

            const database = Firebase.database();

            database.ref('files/' + fileUrl).set({
                name: this.file.name,
                size: this.file.size,
                options: {
                    password: this.password,
                    deleteAfterOneDay: this.deleteAfterOneDay,
                    deleteAfterOneDownload: this.deleteAfterOneDownload
                },
            });

            if (!this.fileStream) return;

            const reader = this.fileStream.getReader();

            let chunk = await reader.read();

            let index = 0;

            while (!chunk.done)
            {

                let storageReference = Firebase.storage().ref();

                let fileReference = storageReference.child(`files/${fileUrl}/${index}.chunk`)

                await fileReference.put(chunk.value);

                index++;

                let progress = (65536 * index) / this.file.size * 100;

                if (progress > 100)
                {
                    progress = 100;
                }

                this.$root.$emit("update_progress_message", progress)

                chunk = await reader.read();
            }

            this.downloadUrl = `${window.location.href}download/${fileUrl}/#${this.key}`
            this.done();


        },
        done()
        {
            this.file = null;
            this.fileStream = null;
            this.key = null;
            this.isDisabled = true;
            this.password = "";
            this.deleteAfterOneDay = false;
            this.deleteAfterOneDownload = false;
            this.$root.$emit("update_progress_message", 0)
            this.$root.$emit("done");
        }
    },
    components: {
        FileInput,
        ProgressCircle
    }
});

function generateUUID()
{
    let random = ""
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    while (random.length < 10)
    {
        random += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return random;
}
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