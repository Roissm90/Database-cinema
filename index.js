require('./utils/db.js');

const express = require('express');
const router = express.Router();
const Movies = require('./models/Movie');
const PORT = 3000;
const server = express();

const moviesRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes')

server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use('/movies', moviesRoutes);
server.use('/cinema', cinemaRoutes);

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado');
})

server.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo http://localhost:${PORT}`);
})