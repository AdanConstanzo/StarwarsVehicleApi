import express from 'express';

import Person from '../models/person';

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

export default router;