const express = require('express');
const router = express.Router();

router.get('/profile', (req,res) =>{
    res.render('layout',{username:'Anonymous',pass:'Anonymous!1337'});
});

module.exports = router;
