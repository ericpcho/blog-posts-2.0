'use strict';

const express = require('express');
const bPostRouter = require('./bPostRouter');
const morgan = require('morgan');
const {BlogPosts} = require('./models');

const app = express();

// log http
app.use(morgan('common'));

app.use('/blog-post', bPostRouter);

app.get('/', (req, res) => {
  console.log('running get w only /');
  res.sendFile(__dirname + '/views/index.html');
});

console.log('adding dummy data');
BlogPosts.create(
  'My first blog post',
  'This is my first blog post.',
  'giri'
);

BlogPosts.create(
  'My second blog post',
  'This is my second blog post',
  'giri'
);
let server;
function runServer(){
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Ypur app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err);
    });
  });
}

function closeServer(){
  return new Promise((resolve, reject) => {
    console.log('closing server');
    server.close(err => {
      if (err){
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module){
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });
