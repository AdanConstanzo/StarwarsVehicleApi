import config from './config.json';
import axios from 'axios';

export const store = {
  state: {
		starships: [],
		error: {}
	},
  async fetchStarShip () {
		let StarShips = []
		let count = 1;
		while (true) {
			try{
				const f = await this.fetchStarShipByPage(count);
				count ++;
				StarShips = StarShips.concat(f.results);
				if (f.next === null)
					break;
			} catch (error) {
				this.state.error['message'] = "An error occured. Sorry for the inconvenience. "
				break;
			}
			
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
		// Getting a reference to  localstorage
		let ls_vehicle = localStorage.getItem("films");
		// checks if it's null. Creates a new object else parses it.
		if (ls_vehicle === null) {
			ls_vehicle = {}
		} else {
			ls_vehicle = JSON.parse(ls_vehicle);
		}

		// varialbe to check if new info is added.
		let addedInfo = false;

		// loops though films.
		for(let i = 0; i < vehicle.films.length; i++) {

			// caching mechanism.
			if (ls_vehicle[vehicle.films[i]]) {
				console.log("Cached film from local storage!: ", vehicle.films[i])
				films.push(ls_vehicle[vehicle.films[i]].title);
			} else { /*  calling API and caching it. Also setting addedInfo to true. */
				console.log("Setting this film to local storage!: ", vehicle.films[i])
				try {
					const filmInfo = await this.film(vehicle.films[i]);
					films.push(filmInfo.title);
					ls_vehicle[vehicle.films[i]] = filmInfo;
					addedInfo = true;
				} catch(error) {
					this.state.error['message-films'] = "Occured while fetching films. Sorry for the inconvenience. "
					break;
				}
			}
		}
		// if added info then set to localstorage.
		if (addedInfo) {
			localStorage.setItem("films", JSON.stringify(ls_vehicle));
		}
		console.log("Films from parseFilms: ",films);
		return films;
	},
	async parseCharacters(vehicle){

		const characterNames = []
		// Getting reference to localstorage
		let ls_character = localStorage.getItem("characters");
		// checks if it's null. Creates a new object else parses it.
		if (ls_character === null) {
			ls_character = {}
		} else {
			ls_character = JSON.parse(ls_character);
		}

		// varialbe to check if new info is added.
		let addedInfo = false;

		// loops though pilots
		for(let i = 0; i < vehicle.pilots.length; i++) {
			// caching mechanism;
			if(ls_character[vehicle.pilots[i]]) {
				console.log("Cached pilot from localStorage!: ", vehicle.pilots[i]);
				characterNames.push(ls_character[vehicle.pilots[i]].name);
			} else { /*  calling API and caching it. Also setting addedInfo to true. */
				console.log("Setting this film to local storage!: ", vehicle.films[i])
				try {
					const characterInfo = await this.character(vehicle.pilots[i]);
					characterNames.push(characterInfo.name);
					ls_character[vehicle.pilots[i]] = characterInfo;
					addedInfo = true;
				} catch (error) {
					this.state.error['message-pilots'] = "Occured while fetching pilots. Sorry for the inconvenience. "
					break;
				}
			}
		}
		// if added info then set to localstorage.
		if (addedInfo) {
			localStorage.setItem("characters", JSON.stringify(ls_character));
		}
		console.log("Character names from parseCharacters", characterNames);
		return characterNames;
	}
}