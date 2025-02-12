const connection = require('../data/moviesDB');
const path = require('path');
const fs = require('fs');

//Index (get)
const index = (req, res) => {
   const sql = 'SELECT * FROM movies';
   connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante il caricamento dei film' });
      const moviesList = results.map(movie => {
         return {
            ...movie,
            image: `${req.defaultPath}/img/movies/${movie.image}`
         }
      })
      res.json(moviesList);
   })
}

//Show (get)
const show = (req, res) => {
   const id = req.params.id;
   const sql = 'SELECT * FROM movies WHERE id = ?';
   const sqlReviews = 'SELECT * FROM reviews WHERE reviews.movie_id = ?';
   //movie query
   connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante il caricamento del film' });
      if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' });
      //reviews query
      connection.query(sqlReviews, [id], (err, resultsReviews) => {
         if (err) return res.status(500).json({ error: 'Errore durante il caricamento delle recensioni' });
         const movies = results.map(movie => {
            return {
               ...movie,
               image: `${req.defaultPath}/img/movies/${movie.image}`,
               reviews: resultsReviews
            }
         })
         res.json(movies);
      })
   })
}

//STORE (new review) (post)
const addReview = (req, res) => {
   const id = req.params.id;

   const { text, name, vote } = req.body;

   const sql = `
   INSERT INTO reviews (movie_id, name, vote, text)
   VALUES (?, ?, ?, ?)
   `;
   connection.query(sql, [id, name, vote, text], (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante l\'aggiunta della recensione' });
      res.status(201);
      res.json({ message: 'Recensione aggiunta con successo', id: results.insertId });
   })
}

//STORE (new movie) (post)
const addMovie = (req, res) => {

   const { title, director, genre, release_year, abstract } = req.body;
   const imageName = req.file.filename;

   const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)';
   connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante l\'aggiunta del film' });
      res.status(201).json({ status: 'Added', message: 'Film aggiunto con successo' });
   })
}

//DESTROY (delete movie) (delete)
const deleteMovie = (req, res) => {
   const id = req.params.id;

   const sql = 'DELETE FROM movies WHERE id = ?';
   const sqlDeleteImg = 'SELECT image FROM movies WHERE id = ?';

   connection.query(sqlDeleteImg, [id], (err, results) => {

      const imageName = results[0].image;

      const imagePath = path.join(__dirname, '../public/img/movies', imageName);

      fs.unlink(imagePath, (err) => {
         console.log(err)
      })

      connection.query(sql, [id], (err, result) => {
         if (err) return res.status(500).json({ error: 'Errore durante l\'elliminazione del film' });
         res.status(201).json({ message: 'Film elliminato con successo' });
      })
   })
}

module.exports = {
   index,
   show,
   addReview,
   addMovie,
   deleteMovie
}