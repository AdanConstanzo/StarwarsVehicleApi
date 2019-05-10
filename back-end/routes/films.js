import express from 'express';

import Film from '../models/film';

const router = express.Router();


router.get("/all", (req, res) => {
	Film
		.find()
		.exec((err, films) => {
			if (err) return err;
			if (films.length > 0) return res.send({ films });
			return res.status(404).json({ error: { global: "Empty Set" } });
		});
});

export default router;