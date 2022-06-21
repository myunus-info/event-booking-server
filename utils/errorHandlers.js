// Global error handler
const globalErrorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({ message: error.message, stack: error.stack });
};

module.exports = globalErrorHandler;
