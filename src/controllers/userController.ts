// controllers/userController.ts
import { Request, Response } from 'express';
import {createUser, getAllUsers, getUserByEmail, getUserByEmailAndName } from '../services/userService';
import jwt, { JwtPayload } from 'jsonwebtoken';


class UserController{
  public async signUp(req: Request, res: Response) : Promise<any>{
    try{
      const id = req.query.id ? req.query.id : null;
      const name = req.body.name ? req.body.name : null;
      const email = req.body.email ? req.body.email : null;
      const role = req.body.role ? req.body.role : null;
      if(!name || !email || !role ){
        return res.status(400).json('Incomplete details');
      }
      const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
      const signUp = await createUser(name, email, role);
      res.status(200).json({signUp, message:'User Created successfully'});
    } catch(error){
      console.error('Sign up error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getAllUser(req: Request, res: Response): Promise<any> {
    try {
      const users = await getAllUsers();
      const userData = users || []; 
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { name, email } = req.body;
  
      // Verify the email and name combination
      const user = await getUserByEmailAndName(email, name);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or name' });
      }
  
      // Generate token based on user role and permissions
      let permissions: string[] = [];
      if (user.role === 'creator') {
        permissions = ['createBooking', 'readBooking', 'updateBooking', 'deleteBooking'];
      } else if (user.role === 'worker') {
        permissions = ['readBooking', 'acceptBooking', 'rejectBooking'];
      }
  
      const token = jwt.sign({ email: user.email, name: user.name, permissions }, 'secret-key');
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  };
}

export default new UserController();
