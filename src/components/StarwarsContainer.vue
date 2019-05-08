<template>
    <div class="StarWars" is="sui-container">
			<h1>Star Wars Vehicle API</h1>
			<br/>
			<div v-show="sharedState.starships.length === 0"  > 
				<div id="loaderDiv"><sui-loader class="loader" active centered inline size="massive">Loading</sui-loader></div>
				<div id="MillenniumFalconImage" ><sui-image size='medium' v-bind:src="MillenniumFalconImage"/></div>
			</div>
			<div v-show="sharedState.starships.length > 0" >
				<sui-card-group :items-per-row="3">
					<StarwarsShip v-for="ship in sharedState.starships"
								:key="ship.url"
								:spaceship="ship"
								:image="ShipImages[ship.name]"/>
				</sui-card-group>
			</div>
		</div>
</template>

<script>
	
	import { store } from '../store.js';
	import StarwarsShip from './StarwarsShip.vue';
	import Star from './Star.vue';
	import ShipImages from '../seed/Starships.JSON';
	import MillenniumFalconImage from "../assets/Millennium Falcon.png"
	export default {
		name: 'StarwarsContainer',        
		data () {
			return {
				sharedState: store.state,
				ShipImages,
				MillenniumFalconImage,
			}
		},
		created() {
			// fetches all starships.
			store.fetchStarShip()
		},
		components: {
			StarwarsShip,
			Star
		}
	}
</script>

<style scoped>
	.StarWars{
		margin-top: 20px;
	}
	h1,.loader{
		text-align: center;
		color: #FAE31E;
	}
	#loaderDiv{
		margin-top: 10%;
	}

	.star {
		position: absolute;
		width: 1px;
		height: 1px;
		background-color: white;
	}

	/* ==== Animations! ==== */
	@keyframes scale { 
		100% { transform: scaleX(2) scaleY(2);} 
	}
	
	@keyframes move {
		0%  { transform: translate(0, 0);}
		20% { transform: translate(0, 0);}
		80% {transform: translate(50px, 100px);}
		85% {transform: translate(55px, 105px);}
		95% {transform: translate(50px, 100px);}
		80% {transform: translate(55px, 105px);}
		100% {transform: translate(50px, 100px);}
	}
	@keyframes rotate {
		100% {transform: rotate(360deg);}
	}
	/* Image animations! */
	div#MillenniumFalconImage{
    animation: move 5s linear 0.5s infinite alternate;
	}
	div#MillenniumFalconImage img{
		margin-top: 10%;
		margin-left: 10%;
    animation: scale 5s linear 0.5s infinite alternate;
	}
	div#MillenniumFalconImage img:hover {
    animation: rotate 0.5s linear 0s 1 alternate;
	}


</style>