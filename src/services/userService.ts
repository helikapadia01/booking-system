import sequelize from "../config/config";
import { QueryTypes } from "sequelize";

export const createUser = async (
  name: string,
  email: string,
  role: string
): Promise<any> => {
  const query =
    "INSERT INTO public.users (name, email, role) VALUES (?, ?, ?)";
  const now = Date.now();
  const parameters = [name, email, role];
  try {
    const result = await sequelize.query(query, {
      replacements: [...parameters, now],
      type: QueryTypes.INSERT,
    });

    const createdUserId = result[0]; // Assuming the inserted ID is returned by the database
    return { id: createdUserId, name, email, role }; // Return the created user object
  } catch (error) {
    throw new Error(`Failed to add user detail: ${error}`);
  }
};

export const getUserByEmail = async (email: string): Promise<any | null> => {
    try {
      const query = 'SELECT * FROM public.users WHERE email = :email';
      const [user] = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { email },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user by email: ${error}`);
    }
};

export const getUserByRole = async (role: string): Promise<any | null> => {
    try {
      const query = 'SELECT * FROM public.users WHERE role = :role';
      const [user] = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { role },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user by role: ${error}`);
    }
};

export const getAllUsers = async (): Promise<any[]> => {
  try {
    const query = 'SELECT * FROM public.users';
    console.log("Executing query:", query);
    const users = await sequelize.query(query, { type: QueryTypes.SELECT });
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const getUserByEmailAndName = async (email: string, name: string): Promise<any | null> => {
    try {
      const query = 'SELECT * FROM public.users WHERE email = :email AND name = :name';
      const [user] = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { email, name },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user by email and name: ${error}`);
    }
  };

export default { createUser, getAllUsers };
