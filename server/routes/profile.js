'use strict';

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');




router.post('/', profileController.createProfile);
router.get('/' , profileController.getAllProfiles);
router.get('/:id', profileController.getProfileById);



module.exports = router;

