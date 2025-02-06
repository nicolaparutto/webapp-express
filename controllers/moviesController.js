//Index (get)
const index = (req, res) => {
   res.send('Visualizzo la lista dei film')
}

//Show (get)
const show = (req, res) => {
   const id = req.params.id;
   res.send(`Visualizzo il film con id ${id}`)
}

module.exports = {
   index,
   show
}