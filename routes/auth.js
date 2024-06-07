const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET login page
router.get('/login', (req, res) => {
    console.log('GoT /login');
    res.render('login', { title: 'Login Page' }); // Assumes login.ejs exists in your views folder
});

// Login processing route
router.post('/login',async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            // If user not found, show registration message
            console.log('status(401):No such user found, please register.');
            res.render('login', { error: 'No such user found, please register.' });
            return ;
        }
        if (!user.verifyPassword(password)) {
            console.log('status(401):Incorrect password');
            res.render('login', { error: 'Incorrect password. Please try again.' });
            return;
        }
        req.session.user = user;
        res.redirect('/dashboard/welcome');
    } catch (err) {
        console.log('status(500):Error during login, please try again.');
        res.render('login', { error: 'Error during login, please try again.' });
       
    }
});


// GET registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST registration data
router.post('/register',async  (req, res) => 
    {
        try {
            const { name, clinicName, username, password } = req.body;
            console.log('name:',name);
            const newUser = new User({ name, clinicName, username, password });
            await newUser.save();
            res.redirect('/auth/login');
        } catch (err) {
            console.log(err)
            //res.redirect('/auth/login');
            res.status(500).send("Error registering new user please try again.");
        }
    }
);




router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});


module.exports = router;
