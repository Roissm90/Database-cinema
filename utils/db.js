require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {})
.then( () => {
    console.log('Conectado a MongoDB Atlas');

})
.catch( (err) => console.log('Error al conectarse', err))