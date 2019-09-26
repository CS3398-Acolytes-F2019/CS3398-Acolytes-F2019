<template>
    <div class="progress-circle">
        <svg class="stat-circle" viewBox="-2 2 23 16.8">
            <circle class="progress" cx="12" cy="9.4" r="5" :data-percentage="percentage" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "progress-circle",
    data()
    {
        let data =
        {
            percentage: 0
        }
        return data;
    },
    methods:
    {
        update()
        {
            let $statCircle = document.querySelector(".progress");

            if (!$statCircle) return;

            let offset = -51 - ((51 / 100) * this.percentage);

            console.log("here");

            $statCircle.setAttribute("style", `stroke-dashoffset: ${offset}`)
        },
    },
    mounted()
    {
        this.$root.$on("update_progress_message", (percentage: number) => { this.percentage = percentage; this.update() })
    }
});


</script>

<style scoped>
.stat-circle {
    width: 25px;
}
.stat-circle circle.bg {
    fill: none;
    stroke: #000;
    stroke-width: 2.75;
}
.stat-circle circle.progress {
    fill: none;
    stroke: #00bd74;
    stroke-width: 2.75;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round;
}
</style>