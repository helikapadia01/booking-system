// models/User.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { userSchema } from '../schema/schema';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  // password: string;
  role: 'Creator' | 'Worker';
  createdAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  // public password!: string;
  public role!: 'Creator' | 'Worker';
  public createdAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        // password: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        role:{
            type:DataTypes.ENUM('Creator', 'Worker'),
            allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true, // Use the current timestamp as the default value
        }
      },
      {
        sequelize,
        schema: 'public',
        tableName: 'users',
        modelName: 'User',
        hooks: {
          beforeValidate: (user: User, options: any) => {
            const { error } = userSchema.validate(user, { abortEarly: false });
            if (error) {
              throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);
            }
          },
        },
      }
    );
  }

  // Static method to find user by ID
  static async findById(userId: number): Promise<User | null> {
    return this.findOne({ where: { id: userId } });
  }
}

export { User, UserAttributes };
