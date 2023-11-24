const express = require('express');
const router = express.Router();

const Cinema = require('../models/Cinema');

router.get('/', async (req, res, next) => {
	try {
		const cinema = await Cinema.find().populate('movies');
		return res.status(200).json(cinema)
	} catch (err) {
		return next(err)
	}
});

router.post('/', async (req, res, next) => {
    try{
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });

        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    }
    catch(err){
        return next(err)
    }
});

router.delete('/deleteById/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);
        return res.status(200).json(cinemaDeleted);
    }
    catch(err){
        return next(err)
    }
});

router.put('/add-movie', async (req, res, next) => {
    try {
        const cinemaId = req.body.cinemaId; 
        const movieId = req.body.movieId;

        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );

        if (!updatedCinema) {
            return res.status(404).json({ error: 'Cinema no encontrado' });
        }

        return res.status(200).json(updatedCinema);
    } 
    catch (err) {
        return next(err);
    }
});


module.exports = router;