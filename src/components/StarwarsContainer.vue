<template>
    <div class="StarWars" is="sui-container">
			<h1>Star Wars Vehicle API</h1>
			<br/>
			<h1 v-show="sharedState.starships.length === 0" >Loading</h1>
			<sui-card-group :items-per-row="3">
				<StarwarsShip v-for="ship in sharedState.starships"
							:key="ship.url"
							:spaceship="ship"
							:image="ShipImages[ship.name]"/>
			</sui-card-group>
		</div>
</template>

<script>
	
	import { store } from '../store.js';
	import StarwarsShip from './StarwarsShip.vue';
	import ShipImages from '../seed/Starships.JSON';
	export default {
		name: 'StarwarsContainer',        
		data () {
			return {
				sharedState: store.state,
				ShipImages
			}
		},
		created() {
			store.fetchStarShip()
		},
		components: {
			StarwarsShip
		}
	}
</script>

<style scoped>
	.StarWars{
		margin-top: 20px;
	}
	h1{
		text-align: center;
	}
</style>