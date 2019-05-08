import config from './config.json';
import axios from 'axios';

export const store = {
  state: {
		starships: []
	},
  async fetchStarShip () {
		let StarShips = []
		let count = 1;
		while (true) {
			const f = await this.fetchStarShipByPage(count);
			count ++;
			StarShips = StarShips.concat(f.results);
			if (f.next === null)
				break;
		}
		this.state.starships = StarShips
	},
	fetchStarShipByPage (page) {
		return axios(`${config.url}?page=${page}`).then(res => res.data)
	},
	film(filmUrl){
		return axios(filmUrl).then(res => res.data)
	},
	character(characterUrl){
		return axios(characterUrl).then(res => res.data)
	},
	async parseFilms(vehicle) {
		const films = []
		for(let i = 0; i < vehicle.films.length; i++) {
			const filmInfo = await this.film(vehicle.films[i]);
			films.push(filmInfo.title);
		}
		console.log("Films from parseFilms: ",films);
		return films;
	},
	async parseCharacters(vehicle){
		const characterNames = []
		for(let i = 0; i < vehicle.pilots.length; i++) {
			const characterInfo = await this.character(vehicle.pilots[i]);
			characterNames.push(characterInfo.name);
		}
		console.log("Character names from parseCharacters", characterNames);
		return characterNames;
	}
}


/*
axios.get(config.url)
		.then(results => {
			console.log(results.data)
		})
*/