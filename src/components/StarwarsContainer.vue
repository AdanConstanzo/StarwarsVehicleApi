<template>
    <div class="StarWars" is="sui-container">
			<div  v-bind:class="classAfterAnimation">
				<div id="scaleDown" >
				<h1 class="Title" >Star Wars Vehicle API</h1>
				<h1 class="Meta" >Created by Adan Constanzo</h1>
			</div>
			</div>
			<br/>
			<div v-show="sharedState.error.hasOwnProperty('message')" >
				<h1 class="Title">{{sharedState.error.message}}</h1>
			</div>
			<!-- Loading scene. -->
			<div v-show="sharedState.starships.length === 0 && animationDone "  > 
				<div v-show="!sharedState.error.hasOwnProperty('message')" id="loaderDiv"><sui-loader class="loader" active centered inline size="massive">Loading</sui-loader></div>
				<div id="MillenniumFalconImage" ><sui-image size='medium' v-bind:src="MillenniumFalconImage"/></div>
			</div>
			<div v-show="!animationDone" id="MillenniumFalconImageAnimation" ><sui-image size='medium' v-bind:src="MillenniumFalconImage"/></div>
			<div id="ShipContent" v-show="sharedState.starships.length > 0 && animationDone" >
				<sui-card-group :items-per-row="5" stackable>
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
				animationDone: false,
				classAfterAnimation: "IntroHeader"
			}
		},
		created() {
			// fetches all starships.
			store.fetchStarShip()
			this.QueAnimationDone()
		},
		components: {
			StarwarsShip,
			Star
		},
		methods: {
			QueAnimationDone(){
				setTimeout(() => { 
					this.animationDone = true
					this.classAfterAnimation = ""	
				 }, 5000)
			}
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
	
	.Title {
		font-size: 100px;
	}
	.Meta {
		font-size: 40px;
	}
	#scaleDown{
		animation: scaleDown 3s ease 1s 1 normal forwards;
	}
	/* ==== Animations! ==== */
	@keyframes scale { 
		100% { transform: scaleX(2) scaleY(2);} 
	}
	@keyframes scaleDown { 
		100% { transform: scaleX(0.5) scaleY(0.5);} 
	}
	@keyframes moveUp {
		from {
			top: 50%
		}
		to {
			top: 0%
		}
	}

	@keyframes fadeOut {
		0% {opacity: 1;}
		100% {opacity: 0;}
	}
	@keyframes fadeIn {
		0% {opacity: 0;}
		100% {opacity: 1;}
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
	div#MillenniumFalconImage, div#MillenniumFalconImageAnimation{
    animation: move 5s linear 0.5s infinite alternate;
	}
	div#MillenniumFalconImage img,div#MillenniumFalconImageAnimation img{
		margin-top: 10%;
		margin-left: 10%;
    animation: scale 5s linear 0.5s infinite alternate;
	}
	div#MillenniumFalconImageAnimation img{
		animation: scale 5s linear 0.5s infinite alternate, fadeOut 1s linear 4s 1;
	}
	#ShipContent {
		animation: fadeIn 1s linear 0s 1;
	}
	/* On hover rotate. */
	/* div#MillenniumFalconImage img:hover {
    animation: rotate 0.5s linear 0s 1 alternate;
	} */
	.IntroHeader {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		animation: moveUp 3s ease 2s 1 normal forwards;
	}


</style>