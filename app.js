// This is the main entry point of the Subscription Tracker API application
// It sets up the Express server and defines the initial route for the API

import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

// Import the express module to create a web server(starting point of the application)
const app = express();

app.use(express.json()); // allow to handles json data in api requests
app.use(express.urlencoded({ extended: false })); // allow to handle url encoded data in api requests
app.use(cookieParser()); // allow to handle cookies in api requests
app.use(arcjetMiddleware)

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Global error handling middleware
app.use(errorMiddleware);

//app.get tells whenver the the user comes to my website, which is req then do this which is res
app.get('/', (req, res) => {
  res.send('Welome to the Subscription Tracker API!');
});

//app.listen() only starts the server and tells it to begin listening for incoming requests on a specific port.
app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase(); // Connect to the database after the server starts

});

//then app.get sends the client request on port 3000 then response is shown on their screen

// Export the app for testing or further configuration
export default app;