const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandlers');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middlewares and bodyParsers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes (app mounts)
app.use('/api', eventRoutes);

// Routing errors
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server`, 404));
});

// General errors
app.use(globalErrorHandler);

module.exports = app;
