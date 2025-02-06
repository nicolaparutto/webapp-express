const connection = require('../data/moviesDB');

//Index (get)
const index = (req, res) => {

   const sql = 'SELECT * FROM movies';
   connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante il caricamento dei film' });
      res.json(results);
   })

}

//Show (get)
const show = (req, res) => {
   const id = req.params.id;

   const sql = 'SELECT * FROM movies WHERE id = ?';
   connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Errore durante il caricamento del film' });
      if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' });
      res.json(results[0]);
   })

}

module.exports = {
   index,
   show
}