const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config() // configs, gets all env var from dotenv

//create express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors()); //cors middleware, allows us to parse json
app.use(express.json()); //our code sends and recieves json files


//connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//tell server to use those files
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

//when redirected when go to first param
//same as flask's @app.route('./users')
app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);

//starts the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});
