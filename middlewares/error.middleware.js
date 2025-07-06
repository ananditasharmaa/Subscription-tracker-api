const errorMiddleware = (err, req, res, next) => {
    // This middleware handles errors that occur in the application
    //intercepting the error and sending a response to the client by knowing more info about it.
      try{
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId error
        if (err.name === 'CastError') {
            const message = `Resource not found`;
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate field value entered`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            //mapping over the vlaues of the object and show message for each error
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
      } catch (error){
        next(error);
      }
}

export default errorMiddleware;