const setDefaultPath = (req, res, next) => {
   req.defaultPath = `${req.protocol}://${req.get('host')}`;
   next()
}

module.exports = setDefaultPath;