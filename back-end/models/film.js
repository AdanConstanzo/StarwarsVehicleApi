const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
	characters: [String],
	created: { type: String },
	director: { type: String },
	edited: { type: String },
	episode_id: { type: String },
	opening_crawl: { type: String },
	planets: [String],
	producer: { type: String },
	release_date: { type: String },
	species: [String],
	starships: [String],
	title: { type: String },
	url: { type: String },
	vehicles: []
});


module.exports = mongoose.model("film", schema);
