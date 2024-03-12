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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// models/User.ts
const sequelize_1 = require("sequelize");
const schema_1 = require("../schema/schema");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            // password: {
            //   type: DataTypes.STRING,
            //   allowNull: false,
            // },
            role: {
                type: sequelize_1.DataTypes.ENUM('Creator', 'Worker'),
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true, // Use the current timestamp as the default value
            }
        }, {
            sequelize,
            schema: 'public',
            tableName: 'users',
            modelName: 'User',
            hooks: {
                beforeValidate: (user, options) => {
                    const { error } = schema_1.userSchema.validate(user, { abortEarly: false });
                    if (error) {
                        throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);
                    }
                },
            },
        });
    }
    // Static method to find user by ID
    static findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ where: { id: userId } });
        });
    }
}
exports.User = User;
