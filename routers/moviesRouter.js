const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

//Rotte CRUD:
//Index
router.get('/', moviesController.index);
//Show
router.get('/:id', moviesController.show);

module.exports = router;