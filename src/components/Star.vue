<template>
    <div class="star" v-bind:style="{marginTop: randomX, marginLeft: randomY }" >
		</div>
</template>

<script>
	export default {
		name: 'StarComponent',        
		data () {
			return {
				randomX: Math.floor(Math.random()*window.innerHeight).toString()+"px",
				randomY: Math.floor(Math.random()*window.innerWidth).toString()+"px"
			}
		}
	}
</script>



<style scoped>
	.star {
		position: absolute;
		width: 1px;
		height: 1px;
		background-color: white;
	}
	
</style>