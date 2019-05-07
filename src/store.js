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
		console.log(this.state.starships)
	},
	fetchStarShipByPage (page) {
		return axios(`${config.url}?page=${page}`).then(res => res.data)
	}
}


/*
axios.get(config.url)
		.then(results => {
			console.log(results.data)
		})
*/