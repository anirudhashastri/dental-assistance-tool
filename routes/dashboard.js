const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();

// GET dashboard
router.get('/welcome', isAuthenticated , (req, res) => {
    if (req.session.user) {
        //res.send('<h1>Hi</h1>'); // Simple response to say Hi
        res.render('dashboard', { user: req.session.user });
    }
});


// Placeholder route for 'hi' page
router.get('/hi', isAuthenticated, (req, res) => {
    res.send('Hi');
});
module.exports = router;
