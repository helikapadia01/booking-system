// middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserAttributes } from '../models/user.model';

interface AuthenticatedRequest extends Request {
  user?: UserAttributes;
}

const authenticateMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'secret_key'); // Replace 'your_secret_key' with your actual secret key
    if (!decoded || typeof decoded !== 'object' || !('_id' in decoded)) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  const user = await User.findById(decoded._id);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { authenticateMiddleware };
