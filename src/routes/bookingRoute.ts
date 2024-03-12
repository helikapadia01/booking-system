import express from 'express';
import BookingController from '../controllers/bookingController';
import { authenticateMiddleware } from '../middleware/auth';

const bookingRouter = express.Router();

bookingRouter.post('/bookings',authenticateMiddleware,BookingController.createBooking);
bookingRouter.get('/getBookings', BookingController.getAllBooking);
bookingRouter.put('/booking/:id', BookingController.updateBooking);
bookingRouter.delete('/booking/:id', BookingController.deleteBooking);
bookingRouter.put('/booking/:id/accept', BookingController.acceptBooking);
bookingRouter.put('/booking/:id/reject', BookingController.rejectBooking);

export default bookingRouter;