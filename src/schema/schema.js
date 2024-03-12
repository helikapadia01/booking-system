"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required().regex(/^.+@.+\..+$/),
    // password: Joi.string().required().min(6), // Minimum password length of 6 characters
    role: joi_1.default.string().required().valid('Creator', 'Worker'),
    createdAt: joi_1.default.date()
});
exports.userSchema = userSchema;
const bookingSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    creatorId: joi_1.default.number().integer().required(),
    workerId: joi_1.default.number().integer().allow(null), // Allow workerId to be null
    status: joi_1.default.string().valid('Accepted', 'Rejected', 'Pending').required(),
});
exports.bookingSchema = bookingSchema;
