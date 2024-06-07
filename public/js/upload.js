const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './public/uploads/';
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

router.post('/upload', upload.array('images'), (req, res) => {
    const images = req.files.map(file => {
        return {
            filename: file.originalname,
            path: file.path.replace('public', '')
        };
    });

    // Optionally update database here with images info

    res.json({ success: true, images: images });
});

module.exports = router;
