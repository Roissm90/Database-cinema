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
        const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, {
            $push: { movies: movieId } 
        });
        if (!updatedCinema) {
            return res.status(404).json({ error: 'Cinema no encontrado' });
        }
        return res.status(200).json(updatedCinema);
    } 
    catch (err) {
        return next(err);
    }
});

router.put('/add-movie-by-genre', async (req, res, next) => {
    try {
        const cinemaId = req.body.cinemaId; 
        const genre = req.body.genre;
        const moviesToAdd = await movieId.find({genre: genre});
        const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, {
            $addToSet: { movies: { $each: moviesToAdd}},
            //new: true
        })
        return res.status(200).json(updatedCinema);
    } 
    catch (err) {
        return next(err);
    }
});

router.put('/add-movie-array', async (req, res, next) => {
    try {
        const cinemaId = req.body.cinemaId; 
        const movieIdArray = req.body.movieIdArray;
        const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, {
            $addToSet: { movies: { $each: movieIdArray } }
        });
        if (!updatedCinema) {
            return res.status(404).json({ error: 'Cinema no encontrado' });
        }
        return res.status(200).json(updatedCinema);
    } 
    catch (err) {
        return next(err);
    }
});



router.delete('/delete-movie-array/:id', async (req, res, next) => {
    try {
        const cinemaId = req.body.cinemaId; 
        const movieIdArray = req.body.movieIdArray;
        const updatedCinema = await Cinema.findByIdAndDelete(cinemaId, {
            $pull: { movies: { $each: movieIdArray } }
        });
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