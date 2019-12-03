<template>
    <div class="home">
        <div class="container-fluid">
            <div class="row">
                <main role="main" class="col-md-12 col-lg-12 pt-3 ">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">Dashboard</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="btn-group mr-2">
                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    @click="showModal = true"
                                >Upload</button>
                            </div>
                        </div>
                    </div>

                    <upload-modal v-if="showModal" @close="showModal = false">
                        <div class="form-group">
                            <file-input @file-event="fileInputHandler" v-bind:max-size="maxSize"></file-input>
                        </div>
                    </upload-modal>

                    <h2>Files</h2>
                    <div class="table-responsive">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Upload Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadModal from "../components/UploadModal.vue";


export default Vue.extend({
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
            showModal: boolean;
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
            downloadUrl: "",
            showModal: false
        }
        return data
    },
    methods: {
        
    },
    components: {
        UploadModal
    }
});
</script>

<style scoped>
body {
    font-size: 0.875rem;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 48px; /* Height of navbar */
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}

.sidebar .nav-link.active {
    color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

/*
 * Utilities
 */

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}
</style>