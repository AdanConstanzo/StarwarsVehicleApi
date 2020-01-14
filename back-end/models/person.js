const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
	birth_year: { type: String },
  eye_color: { type: String },
  films: [String],
  gender:  { type: String },
  hair_color: { type: String },
  height: { type: String },
  homeworld: { type: String },
  mass: { type: String },
  name: { type: String },
  skin_color: { type: String },
  created: { type: String },
  edited: { type: String },
  species: [String],
  starships: [String],
  url: { type: String },
	vehicles: [String],
});


module.exports = mongoose.model("People", schema);
