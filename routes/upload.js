const express = require('express');
const multer = require('multer');
const router = express.Router();
const {isAuthenticated } = require('../middlewares/authMiddleware'); // Ensure you have this middleware
const fs = require('fs');
const path = require('path');
const User = require('../models/user');


router.get('/upload', isAuthenticated, (req, res) => {
    res.render('upload');
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './public/upload-img/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }
    const filePath = `/upload-img/${req.file.filename}`;

    // Assuming the user's ID is stored in the session
    if (req.session && req.session.user) {
        const userId = req.session.user._id;
        User.findByIdAndUpdate(userId, { $push: { uploads: filePath } }, { new: true }, (err, user) => {
            if (err || !user) {
                return res.status(500).json({ success: false, error: 'Database update failed.' });
            }
            res.json({ success: true, filePath: filePath });
        });
    } else {
        res.status(401).json({ success: false, error: 'User not authenticated.' });
    }
});


module.exports = router;
