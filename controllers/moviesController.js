const connection = require('../data/moviesDB');

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

module.exports = {
   index,
   show
}