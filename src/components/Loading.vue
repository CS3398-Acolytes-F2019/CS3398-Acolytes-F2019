<template>
    <div class="loading">
        <svg class="loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle class="internal-circle" cx="60" cy="60" r="30" />
            <circle class="external-circle" cx="60" cy="60" r="50" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "loading"
})
</script>

<style scoped>

 .loader {
	 width: 75px;
	 height: 75px;
	 transform: rotate(-90deg);
	 stroke-linecap: round;
	 stroke-width: 4;
	 fill: none;
}
 .loader .internal-circle, .loader .external-circle {
	 stroke: #000;
	 stroke-dashoffset: 0;
	 transform-origin: center;
}
 .loader .internal-circle {
	 stroke-dasharray: 187;
	 animation: internal 1s ease-in-out infinite;
	 opacity: 0.4;
}
 .loader .external-circle {
	 stroke-dasharray: 312;
	 animation: external 1s linear infinite;
	 opacity: 0.9;
}
 @keyframes internal {
	 0% {
		 stroke-dashoffset: 187;
	}
	 25% {
		 stroke-dashoffset: 80;
	}
	 100% {
		 stroke-dashoffset: 187;
		 transform: rotate(360deg);
	}
}
 @keyframes external {
	 0% {
		 stroke-dashoffset: 312;
		 transform: rotate(70deg);
	}
	 60% {
		 stroke-dashoffset: -312;
	}
	 100% {
		 stroke-dashoffset: -312;
		 transform: rotate(450deg);
	}
}
 
</style>