const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
	MGLT: { type: String },
	cargo_capacity: { type: String },
	consumables: { type: String },
	cost_in_credits: { type: String },
	created: { type: String },
	crew: { type: String },
	edited: { type: String },
	hyperdrive_rating: { type: String },
	length: { type: String },
	manufacturer: { type: String },
	max_atmosphering_speed: { type: String },
	model: { type: String },
	name: { type: String },
	passengers: { type: String },
	films: [String],
	pilots: [String],
	starship_class: { type: String },
	url: { type: String }
});


module.exports = mongoose.model("ship", schema);
