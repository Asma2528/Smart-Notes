const connectToMongo = require('./db');
const express = require('express')
require('dotenv').config()
var cors = require('cors')

connectToMongo();
require('./cronJobs/deleteTrashNotes'); 

const app = express()
app.use(cors())
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Smart Notes app listening on port ${port}`)
})
