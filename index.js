require('./utils/db.js');

const express = require('express');
const router = express.Router();
const Movies = require('./models/Movie');
const PORT = 3000;
const server = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./authentication/passport.js')
const cors = require('cors');

const moviesRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes')
const userRoutes = require('./routes/user.routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
    session({
      secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
      resave: false, // Solo guardará la sesión si hay cambios en ella.
      saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
      cookie: {
        maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
      },
      store: MongoStore.create({ //mantener la sesión
        mongoUrl: process.env.MONGODB_URL
      })
    })
);
server.use(passport.initialize());
server.use(passport.session());
server.use('/movies', moviesRoutes);
server.use('/cinema', cinemaRoutes);
server.use('/user', userRoutes);

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado');
})

server.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo http://localhost:${PORT}`);
})