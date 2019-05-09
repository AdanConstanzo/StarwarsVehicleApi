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
							<div v-if="movies.length === 0 && !sharedState.error.hasOwnProperty('message-films')" >
								<h1>Fetching Movies {{spaceship.name}} has been in.</h1>
								<!-- Loader Animation -->
								<div class="lds-dual-ring"></div>
							</div>
							<div v-else-if="movies.length > 0" >
								<Carousel>
									<Slide class="SlideInfo" v-for="film in movies" 
										:key="film"
									>
										<div>
											<img class="Movie" v-bind:src="MovieImages[film]" />
											<center><p>{{film}}</p></center>
										</div>
									</Slide>
								</Carousel>
							</div>
							<div v-else-if="sharedState.error.hasOwnProperty('message-films')" >
								<sui-message header="An error has occured!" :content="sharedState.error['message-films']" />
							</div>
						</div>
						<sui-divider />
						<div class="Info">
							<h3>Pilots for <span class='spaceshipName'>{{spaceship.name}}</span></h3>
							<div v-if="!fetched" >
								<h1>Fetching pilots for {{spaceship.name}} </h1>
								<!-- Loader Animation -->
								<div class="lds-dual-ring"></div>
							</div>
							<div v-else-if="characters.length === 0 && fetched && !sharedState.error.hasOwnProperty('message-pilots')" >
								<h1>No pilots listed for {{spaceship.name}} </h1>
							</div>
							<div v-else-if="characters.length > 0" >
								<Carousel>
									<Slide class="SlideInfo" v-for="character in characters" 
										:key="character"
									>
										<div>
											<img class="Movie" v-bind:src="PeopleImages[character]" />
											<center><p>{{character}}</p></center>
										</div>
									</Slide>
								</Carousel>
							</div>
							<div v-else-if="sharedState.error.hasOwnProperty('message-pilots')" >
								<sui-message header="An error has occured!" :content="sharedState.error['message-pilots']" />
							</div>
						</div>
					</sui-grid-column>
				</sui-grid>
			</sui-modal-content>
	</sui-modal>
	</sui-card>
</template>


<script>
	
	import { Carousel, Slide } from 'vue-carousel';

	import { store } from '../store.js';
	import MovieImages from '../seed/Films.JSON';
	import PeopleImages from '../seed/People.JSON';


  export default {
      name: 'Spaceship',
      data () {
          return {
						sharedState: store.state,
						open: false,
						cardHover: false,
						movies: [],
						characters: [],
						MovieImages,
						PeopleImages,
						fetched: false
          }
			},
			props: ['spaceship', 'image'],
			components: {
				Carousel,
				Slide
			},
      methods: {
        async toggle() {
					this.open = !this.open;
					if (this.movies.length === 0)
						this.movies = await store.parseFilms(this.spaceship)
					if (!this.fetched){
						this.characters = await store.parseCharacters(this.spaceship)
						this.fetched = true;
					}
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
		height: auto;
		margin-top: 10px;
		padding: 2px;
		/* overflow-y: scroll; */
	}
	h1, h3{
		text-align: center;
	}
	.CenterImage {
		display: block;
    margin: 0 auto;
		text-align: center;
	}
	.Info {
		height: 50%;
		overflow-y: hidden;
	}
	.spaceshipName{
		text-decoration: underline;
	}
	img{
		width: 100px;
		height: 150px;
		margin: 0 auto;
		text-align: center;
		display: block !important;
	}
	.SlideInfo{
		padding: 5px;
		margin-top: 5px;
	}
	/* CSS code for loading spinner in modal */
	lds-dual-ring {
		display: inline-block;
		width: 64px;
		height: 64px;
	}
	.lds-dual-ring:after {
		content: " ";
		display: block;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		border: 5px solid #000;
		border-color: #000 transparent #000 transparent;
		animation: lds-dual-ring 1.2s linear infinite;
		margin: 0 auto;
		margin-top: 3em;
		text-align: center;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>