const notFound = (req, res, next) => {
  console.log("notfound middleware")
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404)
  next(error);
};

const errorHandler = (error, req, res, next) => {
  console.log("errorhandler middleware")
  // this is retarded 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
   res.status(statusCode);
   res.json({
     message: error.message,
     stack: process.env.NODE_ENV === 'production' ? 'something' : error.stack,
   });
};

module.exports = {
  notFound,
  errorHandler
};