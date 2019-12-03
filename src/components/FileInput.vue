<template>
    <div class="file-input">
        <div class="input-group">
            <div class="custom-file">
                <input
                    type="file"
                    id="fileInputField"
                    v-bind:class="{'is-invalid': blured}"
                    class="custom-file-input"
                    @change="onFileChange"
                />
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

const isFile = (file: File | null): file is File => 
{
    return (file as File).size !== undefined;
}

const generatePassword = async (): Promise<ArrayBuffer> =>
{
    let password = ""
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    while (password.length < 10)
    {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

    return pwHash;
}

export default Vue.extend({
    name: "file-input",
    props: ['maxSize'],
    data()
    {
        interface IData
        {
            file: File;
            name: string;
            size: number;
            blured: boolean;
        };

        const data: IData = {
            file: {} as File,
            name: `Choose a File`,
            size: 0,
            blured: false
        };
        return data;
    },
    methods:
    {
        onFileChange(event: HTMLInputEvent)
        {
            const fileList = event.target.files;

            if (!fileList) return;

            let file: File = fileList[0];

            if (!file) return;

            // if (file.size > this.$props.maxSize)
            // {
            //     this.blured = true;
            //     this.name = "File Too Powerful!"
            //     return;
            // }

            this.blured = false;

            this.file = file;

            this.name = this.file.name;

            this.encrypt();
        },
        async encrypt()
        {
            let file = this.file;

            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (var i = 0; i < 32; i++)            {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            
            let password = result;

            if (!isFile(file)) return;

            const readableStream = new ReadableStream({
                start: controller => { new FileStream(file, controller) }
            });

            this.$emit("file-event", { readableStream, file, password });
        },
        isDisabled()
        {
            return !this.file;
        }
    },
    mounted()
    {
        this.$root.$on("done", () => { this.name = `Choose a File (${this.$props.maxSize / 1000000}MB)` })
    }
});

</script>
