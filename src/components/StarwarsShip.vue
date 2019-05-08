<template>
	<sui-card>
		<!-- This adds a dimmer and displays button -->
		<sui-dimmer-dimmable
			@mouseenter.native="cardHover = true"
			@mouseleave.native="cardHover = false">
			<div class="CenterImage">
				<sui-image class="SpaceShipImage" v-bind:src="image" centered/>
			</div>
			<sui-dimmer blurring :active="cardHover">
				<!-- This activates our modal -->
				<sui-button @click="toggle" inverted>More Info</sui-button>
			</sui-dimmer>
    </sui-dimmer-dimmable>
		<sui-card-content>
			<sui-card-header>{{ spaceship.name }}</sui-card-header>
			<sui-card-meta>{{ spaceship.model }}</sui-card-meta>
			<sui-card-description>{{ spaceship.manufacturer }}</sui-card-description>
		</sui-card-content>
		<!-- This is our modal! -->
		<sui-modal v-model="open" size="large" > 
			<sui-modal-content>
				<sui-grid :columns="2" celled >
					<sui-grid-column>
						<h1>{{spaceship.name}}</h1>
						<div class="CenterImage" >
							<sui-image class="SpaceShipImage" v-bind:src="image" centered />
						</div>
						<div id="tableData" >
							<sui-table basic="very" celled size='small'>
								<sui-table-body>
									<sui-table-row><sui-table-cell class="tableType">Model</sui-table-cell><sui-table-cell>{{spaceship.model}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Manufacturer:</sui-table-cell><sui-table-cell>{{spaceship.manufacturer}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Cost in credits</sui-table-cell><sui-table-cell>{{spaceship.cost_in_credits}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Max atmosphering speed</sui-table-cell><sui-table-cell>{{spaceship.max_atmosphering_speed}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Megalight per hour</sui-table-cell><sui-table-cell>{{spaceship.MGLT}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Crew</sui-table-cell><sui-table-cell>{{spaceship.crew}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Passengers</sui-table-cell><sui-table-cell>{{spaceship.passengers}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Cargo Capacity</sui-table-cell><sui-table-cell>{{spaceship.cargo_capacity}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Consumables</sui-table-cell><sui-table-cell>{{spaceship.consumables}}</sui-table-cell></sui-table-row>
									<sui-table-row><sui-table-cell class="tableType">Starship class</sui-table-cell><sui-table-cell>{{spaceship.starship_class}}</sui-table-cell></sui-table-row>
								</sui-table-body>
							</sui-table>
						</div>
					</sui-grid-column>
					<sui-grid-column>
						<div class="Info">
							<h3>Movies <span class='spaceshipName'>{{spaceship.name}}</span> has appeared in.</h3>
							<div v-show="movies.length === 0" >
								<h1>Fetching Movies {{spaceship.name}} has been in.</h1>
							</div>
							<div v-show="movies.length > 0" >
								<carousel>
									<slides class="MovieSlide" v-for="film in movies" 
										:key="film"
									>
										<sui-image class="Movie" v-bind:src="MovieImages[film]" center />
										<p>{{film}}</p>
									</slides>
								</carousel>
							</div>
						</div>
						<sui-divider />
						<div class="Info">
							<h3>Passengers in <span class='spaceshipName'>{{spaceship.name}}</span></h3>
							
						</div>
					</sui-grid-column>
				</sui-grid>
			</sui-modal-content>
	</sui-modal>
	</sui-card>
</template>


<script>
	
	import { Carousel, Slides } from 'vue-carousel';

	import { store } from '../store.js';
	import MovieCard from './MovieCard.vue';
	import MovieImages from '../seed/Films.JSON';


  export default {
      name: 'Spaceship',
      data () {
          return {
						open: false,
						cardHover: false,
						movies: [],
						MovieImages,
						fetched: false
          }
			},
			props: ['spaceship', 'image'],
			components: {
				MovieCard,
				Carousel,
				Slides
			},
      methods: {
        async toggle() {
					this.open = !this.open;
					if (this.movies.length === 0)
						this.movies = await store.parseFilms(this.spaceship)
					if (!this.fetched)
						this.fetched = true;
						console.log("I am suppose to fetch pilots")

				},
      }
  }
</script>

<style scoped >
	.SpaceShipImage{
		width: 350px;
		height: 200px;
	}
	.tableType {
		font-weight: bold;
	}
	#tableData {
		height: 200px;
		margin-top: 10px;
		padding: 2px;
		overflow-y: scroll;
	}
	h1, h3{
		text-align: center;
	}
	.CenterImage {
		display: block;
    margin: 0 auto;
		text-align: center
	}
	.Info {
		height: 50%;
	}
	.spaceshipName{
		text-decoration: underline;
	}
	.Movie{
		width: 100px;
		height: 150px;;
	}
	.MovieSlide{
		padding: 5px;
	}
</style>