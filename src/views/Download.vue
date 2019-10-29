<template>
    <div class="download">
        <template>
            <div class="home">
                <div class="share-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 class="display-4">File Trust</h1>
                    <hr />
                </div>
                <div v-if="ready" class="text-center">
                    <loading></loading>
                </div>
                <div class="container" v-if="!ready">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="card-deck mb-3">
                        <div class="card mb-4 box-shadow">
                            <div class="card-header text-center">
                                <h4 class="my-0 font-weight-normal">{{name}}&nbsp;</h4>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group" v-if="isPassword">
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            v-model="inputPassword"
                                            v-on:change="check"
                                        />
                                    </div>
                                    <br />
                                    <div class="text-center">
                                        <button
                                            class="btn btn-primary"
                                            :disabled="isDisabled"
                                            @click="download"
                                        >Download</button>
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
import Loading from "../components/Loading.vue";
import { Firebase } from "../modules/Firebase";
import { DownloadStream } from "../modules/Download";
// import { aesGcmDecrypt } from '../modules/Encrypt';
import { saveAs } from 'file-saver';

export default Vue.extend({
    name: "download",
    data()
    {
        const data = {
            name: "",
            size: 0,
            isDisabled: true,
            ready: false,
            inputPassword: "",
            isPassword: false,
            password: "",
            deleteAfterOneDay: Boolean,
            deleteAfterOneDownload: Boolean
        }

        return data;
    },
    methods:
    {
        async download(event: Event)
        {
            event.preventDefault();

            let reference = Firebase.storage().ref(`files/${this.$route.params.fileUrl}`);

            let url = await reference.getDownloadURL();

            console.log(url);

            let result = await fetch(url, {
                method: "GET"
            });

            let blob = await result.blob();

            saveAs(blob, this.name);

            // let down = URL.createObjectURL(blob);

            // console.log(down);

            // let plain = await aesGcmDecrypt(down, window.location.href.split("/#")[1])

            // let a = document.createElement("a");
            // document.body.appendChild(a);
            // // a.setAttribute("href", down)
            // a.setAttribute('download', this.name);
            // a.click();




            if(this.deleteAfterOneDownload)
            {
                await Firebase.database().ref('files/' + this.$route.params.fileUrl).remove();
            }

        },
        async show()
        {
            let file = await Firebase.database().ref('files/' + this.$route.params.fileUrl).once('value');


            if (!file.val())
            {
                this.$router.push("/404")
            }

            this.name = file.val().name;
            this.size = file.val().size;
            this.password = file.val().options.password;
            this.deleteAfterOneDay = file.val().options.deleteAfterOneDay;
            this.deleteAfterOneDownload = file.val().options.deleteAfterOneDownload;

            if (this.password)
            {
                this.isPassword = true;
            } else
            {
                this.isDisabled = false;
            }

        },
        check()
        {
            if (this.password == this.inputPassword)
            {
                this.isDisabled = false;
            }
        }
    },
    mounted()
    {
        this.show();
    },
    components: {
        Loading
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