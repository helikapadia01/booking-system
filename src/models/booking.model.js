"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
// models/Booking.ts
const sequelize_1 = require("sequelize");
const schema_1 = require("../schema/schema");
class Booking extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            bookingId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            creatorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            workerId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true, // Allow null as a worker may not be assigned initially
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('Accepted', 'Rejected', 'Pending'),
                allowNull: false,
                defaultValue: 'Pending',
            },
        }, {
            sequelize,
            tableName: 'bookings',
            modelName: 'Booking',
            hooks: {
                beforeValidate: (booking, options) => {
                    const { error } = schema_1.bookingSchema.validate(booking, { abortEarly: false });
                    if (error) {
                        throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);
                    }
                },
            },
        });
    }
}
exports.Booking = Booking;
