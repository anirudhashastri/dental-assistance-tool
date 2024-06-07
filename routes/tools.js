const express = require('express');
const router = express.Router();
const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

// Route to render the tools page
router.get('/tools', (req, res) => {
    res.render('tools');
});

// Route to run the tool and get the image path
router.post('/run-tool', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/run_tool');
        if (response.data.success) {
            res.json({ success: true, imagePath: response.data.image_path });
        } else {
            res.status(500).json({ success: false, error: 'Tool execution failed' });
        }
    } catch (error) {
        console.error('Error running tool:', error);
        res.status(500).json({ success: false, error: 'Error running tool' });
    }
});

module.exports = router;
