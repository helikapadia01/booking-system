// models/Booking.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { bookingSchema } from '../schema/schema';

interface BookingAttributes {
  bookingId: number;
  name: string;
  description: string;
  creatorId: number;
  workerId: number | null;
  status: 'Accepted' | 'Rejected' | 'Pending';
}

class Booking extends Model<BookingAttributes> implements BookingAttributes {
  public bookingId!: number;
  public name!: string;
  public description!: string;
  public creatorId!: number;
  public workerId!: number | null;
  public status!: 'Accepted' | 'Rejected' | 'Pending';

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        bookingId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        creatorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        workerId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allow null as a worker may not be assigned initially
        },
        status: {
          type: DataTypes.ENUM('Accepted', 'Rejected', 'Pending'),
          allowNull: false,
          defaultValue: 'Pending',
        },
      },
      {
        sequelize,
        tableName: 'bookings',
        modelName: 'Booking',
        hooks: {
          beforeValidate: (booking: Booking, options: any) => {
            const { error } = bookingSchema.validate(booking, { abortEarly: false });
            if (error) {
              throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);
            }
          },
        },
      }
    );
  }
}

export { Booking, BookingAttributes };