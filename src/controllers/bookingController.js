"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingService_1 = require("../services/bookingService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BookingController {
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming workerId is obtained from the authenticated user
                // Extract data from request body
                const { name, description, creatorId } = req.body;
                // Create new booking
                const booking = yield (0, bookingService_1.createBooking)(name, description, creatorId);
                // Send response
                res.status(200).json(booking);
            }
            catch (error) {
                console.error("Error creating booking:", error);
                res.status(500).json({ error: "Failed to create booking" });
            }
        });
    }
    getAllBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch booking
                const booking = yield (0, bookingService_1.getAllBookings)();
                // Check if booking exists
                if (!booking) {
                    res.status(404).json({ error: "Booking not found" });
                    return;
                }
                // Send response
                res.status(200).json(booking);
            }
            catch (error) {
                console.error("Error fetching booking:", error);
                res.status(500).json({ error: "Failed to fetch booking" });
            }
        });
    }
    updateBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract data from request body
                const { id } = req.params;
                const { name, description } = req.body;
                // Update booking
                const updatedBooking = yield (0, bookingService_1.updateBooking)(parseInt(id, 10), name, description);
                // Send response
                res.status(200).json(updatedBooking);
            }
            catch (error) {
                console.error("Error updating booking:", error);
                res.status(500).json({ error: "Failed to update booking" });
            }
        });
    }
    deleteBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract booking ID from request parameters
                const { id } = req.params;
                const bookingId = parseInt(id, 10);
                // Delete booking
                yield (0, bookingService_1.deleteBooking)(bookingId);
                // Send response
                res.status(200).json({ message: "Booking deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting booking:", error);
                res.status(500).json({ error: "Failed to delete booking" });
            }
        });
    }
    acceptBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (token) {
                    const decodedToken = jsonwebtoken_1.default.verify(token, "secret-key");
                    const bookingId = req.params.id; // Assuming bookingId is passed in the request params
                    // Extract user's role and ID from request object
                    const userRole = decodedToken.userRole;
                    const userId = decodedToken.userId; // Assuming workerId is obtained from the authenticated user
                    if (userRole !== "worker") {
                        return res.status(403).json({ error: "Unauthorized access" });
                    }
                    // Call the service to accept the booking
                    const acceptedBooking = yield (0, bookingService_1.acceptBooking)(bookingId, userId);
                    res.status(200).json({
                        message: "Booking accepted successfully",
                        booking: acceptedBooking,
                    });
                }
            }
            catch (error) {
                console.error("Error accepting booking:", error);
                res.status(500).json({ error: "Failed to accept booking" });
            }
        });
    }
    rejectBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (token) {
                    const decodedToken = jsonwebtoken_1.default.verify(token, "secret-key");
                    const bookingId = req.params.id; // Assuming bookingId is passed in the request params
                    // Extract user's role and ID from request object
                    const userRole = decodedToken.userRole;
                    const userId = decodedToken.userId; // Assuming workerId is obtained from the authenticated user
                    if (userRole !== "worker") {
                        return res.status(403).json({ error: "Unauthorized access" });
                    }
                    // Call the service to accept the booking
                    const rejectedBooking = yield (0, bookingService_1.rejectBooking)(bookingId, userId);
                    res.status(200).json({
                        message: "Booking rejected successfully",
                        booking: rejectedBooking,
                    });
                }
            }
            catch (error) {
                console.error("Error rejecting booking:", error);
                res.status(500).json({ error: "Failed to reject booking" });
            }
        });
    }
}
exports.default = new BookingController();
