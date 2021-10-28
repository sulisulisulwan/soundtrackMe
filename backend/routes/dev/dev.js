const router = require('express').Router();
const path = require('path');

router.get('/', async(req, res) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname, '../../../frontend/public/dev.html'))
  } catch(err) {
    res.sendStatus(500);
  }
})

module.exports = router;