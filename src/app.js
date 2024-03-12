"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userController_1 = __importDefault(require("./controllers/userController"));
const bookingController_1 = __importDefault(require("./controllers/bookingController"));
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.post('/api/signup', userController_1.default.signUp);
app.get('/api/getUser', userController_1.default.getAllUser);
app.post('/api/login', userController_1.default.login);
app.post('/bookings', bookingController_1.default.createBooking);
app.get('/getBookings', bookingController_1.default.getAllBooking);
app.put('/booking/:id', bookingController_1.default.updateBooking);
app.delete('/booking/:id', bookingController_1.default.deleteBooking);
exports.default = app;
