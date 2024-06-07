const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/details', isAuthenticated, (req, res) => {
    if (req.session.user) {
        res.render('account', { user: req.session.user });
    }
});

module.exports = router;