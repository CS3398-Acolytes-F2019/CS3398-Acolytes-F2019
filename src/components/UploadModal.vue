<template>
    <transition name="upload-modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-body">
                        <slot name="body">
                            <file-input @file-event="fileInputHandler" v-bind:max-size="maxSize"></file-input>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer" class="text-center">
                            <div class="text-center">
                                <button
                                    class="btn btn-primary"
                                    :disabled="isDisabled"
                                    @click="encryptAndUpload"
                                >Encrypt &amp; Upload</button>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import FileInput from "../components/FileInput.vue";

export default Vue.extend({
    name: "loading",
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
        return data
    },
    methods: {
        fileInputHandler(options: any)
        {
            this.fileStream = options.readableStream;
            this.file = options.file;
            this.key = options.password;
            this.isDisabled = false;
        },
    },
    components: {
        FileInput
    }
});
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    vertical-align: middle;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
    vertical-align: middle;
}

.modal-body {
    margin: 20px 0;
    vertical-align: middle;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
    vertical-align: middle;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    vertical-align: middle;
}
</style>