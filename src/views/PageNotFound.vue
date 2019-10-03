<template>
    <div class="download">
        <template>
            <div class="home">
                <div class="share-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 class="display-4">File Trust</h1>
                    <hr />
                    <h1 class="display-5">File Not Found</h1>
                </div>
                <div class="container">
                    <div class="row"></div>
                    
                </div>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "pagenotfound",
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