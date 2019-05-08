<template>
    <div class="StarWars" is="sui-container">
			<h1>Star Wars Vehicle API</h1>
			<br/>
			<div v-show="sharedState.starships.length === 0"  > 
				<h1>Loading</h1>
				<sui-image v-bind:src="MillenniumFalconImage" centered />
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
			// store.fetchStarShip()
			// this.generateStars();

		},
		components: {
			StarwarsShip,
			Star
		},
		methods:{
			getRandomPosition(){
				const y = window.innerWidth;
				const x = window.innerHeight;
				const randomX = Math.floor(Math.random()*x);
				const randomY = Math.floor(Math.random()*y);
				return [randomX, randomY];
			},
			generateStars(){
				for (let i = 0; i < 100; i++) {
					console.log(i);
					
					let star = document.createElement("div");  
					star.className = "star";
					const xy = this.getRandomPosition();
					console.log(xy)
					star.style.top = xy[0] + 'px';
					star.style.left = xy[1] + 'px';
					document.body.append(star);
				}
			}
		}
	}
</script>



<style scoped>
	.StarWars{
		margin-top: 20px;
	}
	h1{
		font-family:  'Star Jedi', arial;
		text-align: center;
		color: #FAE31E;
	}

	.star {
		position: absolute;
		width: 1px;
		height: 1px;
		background-color: white;
	}
	
</style>