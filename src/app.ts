import express from 'express';
import bodyParser from 'body-parser';
import userController from './controllers/userController';
import bookingController from './controllers/bookingController';
import { authenticateMiddleware } from './middleware/auth';

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes

app.post('/api/signup', userController.signUp);
app.get('/api/getUser', userController.getAllUser);
app.post('/api/login', userController.login);
app.post('/bookings', bookingController.createBooking);
app.get('/getBookings', bookingController.getAllBooking);
app.put('/booking/:id', bookingController.updateBooking);
app.delete('/booking/:id', bookingController.deleteBooking);

export default app;
