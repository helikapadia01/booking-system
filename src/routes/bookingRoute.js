"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const auth_1 = require("../middleware/auth");
const bookingRouter = express_1.default.Router();
bookingRouter.post('/bookings', auth_1.authenticateMiddleware, bookingController_1.default.createBooking);
bookingRouter.get('/getBookings', bookingController_1.default.getAllBooking);
bookingRouter.put('/booking/:id', bookingController_1.default.updateBooking);
bookingRouter.delete('/booking/:id', bookingController_1.default.deleteBooking);
bookingRouter.put('/booking/:id/accept', bookingController_1.default.acceptBooking);
bookingRouter.put('/booking/:id/reject', bookingController_1.default.rejectBooking);
exports.default = bookingRouter;
