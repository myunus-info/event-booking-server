const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Synchronous error
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT REJECTION🔥🔥🔥. Shutting down...');
  process.exit(1); // Crashing the app is mandatory because the app remains at unclean state
});

const app = require('./app');
const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);
const port = process.env.PORT || 5000;

mongoose.connect(DB).then(() => console.log('Database connected successfully!'));
const server = app.listen(port, () => console.log(`Server is up on port ${port}`));

// Asynchronous error
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION🔥🔥🔥. Shutting down...');
  server.close(() => {
    process.exit(1); // Crashing the app is optional
  });
});
