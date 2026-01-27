const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const setupSwaggerDocs = require('./swagger');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  next();
});

// Setup Swagger API documentation
setupSwaggerDocs(app);

app.use('/', require('./routes'));
    

  mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    }
    else {
      app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`);});
    }
  });