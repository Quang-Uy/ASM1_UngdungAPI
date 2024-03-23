const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send ('vao api mobile');
})

const mongoose = require('mongoose');

const fashionModel = require('./fashionModel');

const COMMON = require('./COMMOM');

router.get('/list', async (req, res) => {
    await mongoose.connect(COMMON.uri);

    let fashions = await fashionModel.find();

    console.log(fashions);

    res.send(fashions);
})