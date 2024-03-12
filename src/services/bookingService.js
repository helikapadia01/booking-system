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
exports.rejectBooking = exports.acceptBooking = exports.deleteBooking = exports.updateBooking = exports.getAllBookings = exports.createBooking = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const createBooking = (name, description, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO public.booking (name, description, creator_id) VALUES (?, ?, ?)";
    try {
        const result = yield config_1.default.query(query, {
            replacements: [name, description, creatorId],
            type: sequelize_1.QueryTypes.INSERT,
        });
        // Assuming the inserted ID is returned by the database
        const createdBookingId = result[0];
        // Return the created booking object
        return { bookingId: createdBookingId, name, description, creatorId }; // Return the created booking object
    }
    catch (error) {
        throw new Error(`Failed to create booking: ${error}`);
    }
});
exports.createBooking = createBooking;
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM public.booking";
        console.log("Executing query:", query);
        const bookings = yield config_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        return bookings;
    }
    catch (error) {
        throw new Error(`Failed to fetch bookings: ${error}`);
    }
});
exports.getAllBookings = getAllBookings;
const updateBooking = (bookingId, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    UPDATE public.booking
    SET name = ?, description = ?
    WHERE id = ?
  `;
    try {
        yield config_1.default.query(query, {
            replacements: [name, description, bookingId],
            type: sequelize_1.QueryTypes.UPDATE,
        });
        return { id: bookingId, name, description };
    }
    catch (error) {
        throw new Error(`Failed to update booking: ${error}`);
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM public.booking WHERE id = ?";
    try {
        yield config_1.default.query(query, {
            replacements: [bookingId],
            type: sequelize_1.QueryTypes.DELETE,
        });
        return { message: "Booking deleted successfully" };
    }
    catch (error) {
        throw new Error(`Failed to delete booking: ${error}`);
    }
});
exports.deleteBooking = deleteBooking;
const acceptBooking = (bookingId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
      UPDATE public.booking 
      SET workerId = :workerId, status = 'accepted'
      WHERE id = :bookingId AND status = 'pending'`;
    try {
        const [rowsAffected] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.UPDATE,
            replacements: { bookingId, workerId },
        });
        if (rowsAffected === 0) {
            throw new Error("Failed to accept booking: Invalid booking ID or booking is already accepted");
        }
        // Retrieve the accepted booking details after update
        const updatedBooking = yield getBookingById(bookingId);
        return updatedBooking;
    }
    catch (error) {
        throw new Error(`Failed to accept booking: ${error}`);
    }
});
exports.acceptBooking = acceptBooking;
const rejectBooking = (bookingId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
      UPDATE public.booking 
      SET workerId = :workerId, status = 'reject'
      WHERE id = :bookingId AND status = 'pending'`;
    try {
        const [rowsAffected] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.UPDATE,
            replacements: { bookingId, workerId },
        });
        if (rowsAffected === 0) {
            throw new Error("Failed to accept booking: Invalid booking ID or booking is already accepted");
        }
        // Retrieve the accepted booking details after update
        const updatedBooking = yield getBookingById(bookingId);
        return updatedBooking;
    }
    catch (error) {
        throw new Error(`Failed to accept booking: ${error}`);
    }
});
exports.rejectBooking = rejectBooking;
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM bookings WHERE id = :bookingId";
    try {
        const [booking] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { bookingId },
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    }
    catch (error) {
        throw new Error(`Failed to fetch booking: ${error}`);
    }
});
exports.default = {
    createBooking: exports.createBooking,
    getAllBookings: exports.getAllBookings,
    updateBooking: exports.updateBooking,
    deleteBooking: exports.deleteBooking,
    getBookingById,
    acceptBooking: exports.acceptBooking,
    rejectBooking: exports.rejectBooking,
};
