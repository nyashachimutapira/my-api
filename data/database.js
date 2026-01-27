const mongoose = require('mongoose');

let mongoUrl = process.env.MONGODB_URI;

module.exports = {
  initDb: (callback) => {
    if (!mongoUrl) {
      console.error('MONGODB_URI environment variable is not set');
      return callback(new Error('MONGODB_URI not configured'));
    }

    mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database is connected successfully');
        callback(null);
      })
      .catch((err) => {
        console.error('Database connection failed:', err);
        callback(err);
      });
  },
  getDb: () => {
    return mongoose.connection;
  },
};
