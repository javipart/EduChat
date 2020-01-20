const mongoose = require('mongoose').set('debug', true);

const connectionString = 'mongodb+srv://admin:1234@cluster0-nrdjv.mongodb.net/test?retryWrites=true&w=majority'
const mongoIP = '127.0.0.1';
const mongoPort = '27017';
const mongoCollection = 'educhat';
const URI = `mongodb://${mongoIP}:${mongoPort}/${mongoCollection}`;

const db = mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Successfully connected to MongoDB @ ${mongoIP}:${mongoPort}`);
  }
});
module.exports = db;
