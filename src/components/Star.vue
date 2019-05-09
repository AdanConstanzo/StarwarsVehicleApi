<template>
    <div v-bind:class="myClassVariable" v-bind:style="{marginTop: randomX, marginLeft: randomY,  }" >
		</div>
</template>

<script>
	export default {
		name: 'StarComponent',        
		data () {
			return {
				randomX: Math.floor(Math.random()*window.innerHeight).toString()+"px",
				randomY: Math.floor(Math.random()*window.innerWidth).toString()+"px",
				myClassVariable: "star-no-animation"
			}
		}, created() {
			this.hasFlicker()
		}, methods: {
			// random value if less or equal to 3 we add the animations.
			hasFlicker() {
				(Math.floor(Math.random() * 10)) <= 3 ? this.myClassVariable = "star" : this.myClassVariable = "star-no-animation"
			}
		}
	}
</script>

<style scoped>
	
	@keyframes scale {
		100% {transform: scaleX(3) scaleY(3);}
	}
	.star-no-animation, .star {
		position: fixed;
		width: 1px;
		height: 1px;
		background-color: white;
		/* animation: scale 1s linear 0s infinite alternate; */
	}
	.star {
		animation: scale 3s ease 0s infinite alternate;
	}
</style>