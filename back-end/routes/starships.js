const express = require('express');

const Starship = require('../models/starship');

const router = express.Router();


router.get("/all", (req, res) => {
	Starship
		.find()
		.exec((err, ships) => {
			if (err) return err;
			if (ships.length > 0) return res.send({ ships });
			return res.status(404).json({ error: { global: "Empty Set" } });
		});
});

module.exports = router;