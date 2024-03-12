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
exports.getUserByEmailAndName = exports.getAllUsers = exports.getUserByRole = exports.getUserByEmail = exports.createUser = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const createUser = (name, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO public.users (name, email, role) VALUES (?, ?, ?)";
    const now = Date.now();
    const parameters = [name, email, role];
    try {
        const result = yield config_1.default.query(query, {
            replacements: [...parameters, now],
            type: sequelize_1.QueryTypes.INSERT,
        });
        const createdUserId = result[0]; // Assuming the inserted ID is returned by the database
        return { id: createdUserId, name, email, role }; // Return the created user object
    }
    catch (error) {
        throw new Error(`Failed to add user detail: ${error}`);
    }
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM public.users WHERE email = :email';
        const [user] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { email },
        });
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user by email: ${error}`);
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM public.users WHERE role = :role';
        const [user] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { role },
        });
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user by role: ${error}`);
    }
});
exports.getUserByRole = getUserByRole;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM public.users';
        console.log("Executing query:", query);
        const users = yield config_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        return users;
    }
    catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByEmailAndName = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM public.users WHERE email = :email AND name = :name';
        const [user] = yield config_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { email, name },
        });
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user by email and name: ${error}`);
    }
});
exports.getUserByEmailAndName = getUserByEmailAndName;
exports.default = { createUser: exports.createUser, getAllUsers: exports.getAllUsers };
