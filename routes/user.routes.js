const express = require('express');
const passport = require('passport')
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res, next) => {
    const users = await User.find();

})

router.post('/register', (req, res, next) => {
    const done = (error, user) => {
        if(error) {
            return next(error)
        }
        req.logIn(user, (error) => {
            if(error) {
                return next(error)
            }
            return res.status(201).json(user)
        })
    };

    passport.authenticate('register', done)(req);
})

router.post('/login', (req, res, next) => {
    const done = (error, user) => {
        if(error) {
            return next(error)
        }
        req.logIn(user, (error) => {
            if(error) {
                return next(error);
            }
            return res.status(200).json('hola')
        });
    };

    passport.authenticate('login', done)(req);
});

router.post('/logout', (req, res, next) => {
    console.log(req.session);
    console.log(req.user);

    if (req.user) {
        req.logout(err => { // Proporciona una función de devolución de llamada para req.logout()
            if (err) {
                return next(err); // Manejar errores, si los hay
            }
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.status(200).json('Adiós');
            });
        });
    } else {
        return res.sendStatus(304);
    }
});

module.exports = router;