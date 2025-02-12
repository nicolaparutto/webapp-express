const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const upload = require('../middlewares/multer');

//Rotte CRUD:
//Index
router.get('/', moviesController.index);
//Show
router.get('/:id', moviesController.show);
//Store Reviews
router.post('/:id/reviews', moviesController.addReview);
// Store Movie
router.post('/', upload.single('image'), moviesController.addMovie);

router.delete('/:id', moviesController.deleteMovie)

module.exports = router;