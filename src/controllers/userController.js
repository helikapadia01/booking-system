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
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id ? req.query.id : null;
                const name = req.body.name ? req.body.name : null;
                const email = req.body.email ? req.body.email : null;
                const role = req.body.role ? req.body.role : null;
                if (!name || !email || !role) {
                    return res.status(400).json('Incomplete details');
                }
                const existingUser = yield (0, userService_1.getUserByEmail)(email);
                if (existingUser) {
                    return res.status(400).json({ error: 'User with this email already exists' });
                }
                const signUp = yield (0, userService_1.createUser)(name, email, role);
                res.status(200).json({ signUp, message: 'User Created successfully' });
            }
            catch (error) {
                console.error('Sign up error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, userService_1.getAllUsers)();
                const userData = users || [];
                res.status(200).json(userData);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Failed to fetch users' });
            }
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                // Verify the email and name combination
                const user = yield (0, userService_1.getUserByEmailAndName)(email, name);
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or name' });
                }
                // Generate token based on user role and permissions
                let permissions = [];
                if (user.role === 'creator') {
                    permissions = ['createBooking', 'readBooking', 'updateBooking', 'deleteBooking'];
                }
                else if (user.role === 'worker') {
                    permissions = ['readBooking', 'acceptBooking', 'rejectBooking'];
                }
                const token = jsonwebtoken_1.default.sign({ email: user.email, name: user.name, permissions }, 'secret-key');
                res.status(200).json({ token });
            }
            catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ error: 'Failed to login' });
            }
        });
    }
    ;
}
exports.default = new UserController();
