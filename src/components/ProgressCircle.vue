<template>
    <div class="progress-circle">
        <svg class="stat-circle" width="150" viewBox="0 0 20 20">
            <circle class="bg" cx="10" cy="10" r="8" />
            <circle class="progress" cx="10" cy="10" r="8" :data-percentage="percentage" />
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
.stat-circle circle.bg {
    fill: none;
    stroke: #f1f1f1;
    stroke-width: 2;
}
.stat-circle circle.progress {
    fill: none;
    stroke: #2ecc71;
    stroke-width: 2;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round;
}
.stat-circle text {
    font-size: 3px;
    text-anchor: middle;
    fill: #555;
}
</style>