import express from 'express';
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 7000
app.use(express.json())

app.use('/api', require('./routes'))



app.listen(PORT, () => {
    console.log(`✅ Server running port on: ${PORT}` );
  });

