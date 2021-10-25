const express = require('express');
const path = require('path')
const app = express();
const PORT = 1337;

app.use(express.static(path.resolve('frontend/client/public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/users', require('./routes/index.js').users);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
