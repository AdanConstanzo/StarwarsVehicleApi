<template>
    <div class="SearchInputDiv" >
			<sui-input class="SearchInput" @keyup.enter="handleInput()" v-model="ShipSearch" placeholder="Search a spaceship!" icon="search"/>
			<div v-if="sharedState.searchShip.length > 0" >
					<sui-button @click="clearSearch" class="ClearButton" color="black" inverted content="Clear Search" icon="times" />
					<h1 v-if="!sharedState.starshipSearched.hasOwnProperty(sharedState.searchShip)" >Searching for a spaceship with the name {{ShipSearch}}</h1>
					<h1 v-else >Results for {{sharedState.searchShip}}</h1>
					<sui-card-group :items-per-row="5" v-show="sharedState.starshipSearched.hasOwnProperty(sharedState.searchShip)" stackable>
						<StarwarsShip v-for="ship in sharedState.starshipSearched[sharedState.searchShip]"
									:key="ship.url"
									:spaceship="ship"
									:image="sharedState.ShipImages[ship.name]"/>
					</sui-card-group>
				</div>
		</div>
</template>

<script>
	import { store } from '../store.js';
	import StarwarsShip from './StarwarsShip.vue';

	export default {
		name: 'SearchStarship',        
		data () {
			return {
				sharedState: store.state,
				ShipSearch: ""
			}
		}, created() {
		}, methods: {
			handleInput(){
				this.sharedState.searchShip = this.ShipSearch
				store.searchShipByName();
			},
			clearSearch(){
				this.sharedState.searchShip = "";
				this.ShipSearch = "";
			},
		},
		components:{
			StarwarsShip
		}
	}
</script>

<style scoped>
	.SearchInput{
		width: 40%;
	}
	.SearchInputDiv{
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	h1{
		text-align: center;
		color: #FAE31E;
	}
	.ClearButton{
		margin-top: 10px;
	}
	
</style>