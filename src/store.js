import config from './config.json';
import axios from 'axios';
import ShipImages from './seed/Starships.JSON';
import MovieImages from './seed/Films.JSON';
import PeopleImages from './seed/People.JSON';


export const store = {
  state: {
		starships: [],
		error: {},
		starshipSearched: {},
		searchShip: "",
		ShipImages,
		MovieImages,
		PeopleImages,
		API_LOCAL: true
	},
  async fetchStarShip (locally) {
		if (locally) {
			try {
				const ships = await this.fetchStarShipByPage(0, true);
				
				this.state.starships = ships;
				
				if (localStorage.getItem("ships") === null){
					localStorage.setItem("ships", JSON.stringify(ships))
				}
			} catch (error){
				console.log(error)
			}
			return ;
		}
		let StarShips = []
		let count = 1;
		let errorOccured = false;
		while (true) {
			try{
				const f = await this.fetchStarShipByPage(count, false);
				count ++;
				StarShips = StarShips.concat(f.results);
				if (f.next === null)
					break;
			} catch (error) {
				errorOccured = true;
				if (localStorage.getItem("ships")){
					StarShips = JSON.parse(localStorage.getItem("ships"));
				this.state.error['message'] = "An error occured through Star Wars API. Using cached data. Sorry for the inconvenience. "
				} else {
					this.state.error['message'] = "An error occured through Star Wars API. Sorry for the inconvenience. "
				}
				break;
			}
			
		}

		if (localStorage.getItem("ships") === null && !errorOccured ){
			localStorage.setItem("ships", JSON.stringify(StarShips))
		}
		this.state.starships = StarShips
	},
	searchShipByName () {
		const { starshipSearched, searchShip, starships } = this.state;

		if (starshipSearched[searchShip] === undefined) {
			const SearchShipArray = starships.filter(ship => ship.name.toLowerCase().includes(searchShip.toLowerCase()))
			starshipSearched[searchShip] = SearchShipArray;
			console.log(starshipSearched)
		}
	},

	fetchStarShipByPage (page, locally) {
		if (locally) {
			return axios(`${config.locally.ship}`).then(res => res.data.ships)
		}
		return axios(`${config.url}?page=${page}`).then(res => res.data)
	},
	film(filmUrl, locally){
		if (locally) {
			return axios(`${config.locally.film_url}${filmUrl}`).then(res => res.data.film)
		}
		return axios(filmUrl).then(res => res.data)
	},
	character(characterUrl, locally){
		if (locally) {
			return axios(`${config.locally.people_url}${characterUrl}`).then(res => res.data.person)
		}
		return axios(characterUrl).then(res => res.data)
	},
	async parseFilms(vehicle, locally) {
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
					const filmInfo = await this.film(vehicle.films[i], locally);
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
	async parseCharacters(vehicle, locally){

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
					const characterInfo = await this.character(vehicle.pilots[i], locally);
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