const express = require('express');

const Person = require('../models/person');

const router = express.Router();


router.get("/all", (req, res) => {
	Person
		.find()
		.exec((err, people) => {
			if (err) return err;
			if (people.length > 0) return res.send({ people });
			return res.status(404).json({ error: { global: "Empty Set" } });
		});
});

router.get('/', (req,res) => {
	Person
		.findOne({ "url": req.query.url })
		.exec((err, person) => {
			if (err) return err;
			if (person) return res.send({ person });
			return res.status(404).json({ error: { global: "Empty Set" } });
		});
});

module.exports = router;