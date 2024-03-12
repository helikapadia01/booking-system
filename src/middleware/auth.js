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
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the token from the request headers
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, 'secret_key'); // Replace 'your_secret_key' with your actual secret key
        if (!decoded || typeof decoded !== 'object' || !('_id' in decoded)) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        const user = yield user_model_1.User.findById(decoded._id);
        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Attach the authenticated user to the request object
        req.user = user;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.authenticateMiddleware = authenticateMiddleware;
