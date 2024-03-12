"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userController_2 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// POST /signup
router.post('/api/signup', userController_1.default.signUp);
router.get('/api/getUser', userController_2.default.getAllUser);
router.post('/api/login', auth_1.authenticateMiddleware, userController_2.default.login);
exports.default = router;
