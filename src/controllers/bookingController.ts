import { Request, Response } from "express";
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  acceptBooking,
  rejectBooking,
} from "../services/bookingService";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authenticateMiddleware } from "../middleware/auth";

class BookingController {
  public async createBooking(req: Request, res: Response): Promise<any> {
    try {
      // Assuming workerId is obtained from the authenticated user
        // Extract data from request body
        const { name, description, creatorId } = req.body;
        // Create new booking
        const booking = await createBooking(
          name,
          description,
          creatorId
        );

        // Send response
        res.status(200).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  }

  public async getAllBooking(req: Request, res: Response): Promise<void> {
    try {
      // Fetch booking
      const booking = await getAllBookings();
      const bookingData = booking || []; 
      res.status(200).json(bookingData);
      // Check if booking exists
      if (!booking) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }

      // Send response
      res.status(200).json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  }

  public async updateBooking(req: Request, res: Response): Promise<void> {
    try {
      // Extract data from request body
      const { id } = req.params;
      const { name, description } = req.body;

      // Update booking
      const updatedBooking = await updateBooking(
        parseInt(id, 10),
        name,
        description
      );

      // Send response
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  }

  public async deleteBooking(req: Request, res: Response): Promise<void> {
    try {
      // Extract booking ID from request parameters
      const { id } = req.params;
      const bookingId = parseInt(id, 10);

      // Delete booking
      await deleteBooking(bookingId);

      // Send response
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  }

  public async acceptBooking(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const decodedToken = jwt.verify(token, "secret-key") as JwtPayload;
        const bookingId = req.params.id; // Assuming bookingId is passed in the request params
        // Extract user's role and ID from request object
        const userRole = decodedToken.userRole;
        const userId = decodedToken.userId; // Assuming workerId is obtained from the authenticated user

        if (userRole !== "worker") {
          return res.status(403).json({ error: "Unauthorized access" });
        }

        // Call the service to accept the booking
        const acceptedBooking = await acceptBooking(bookingId, userId);

        res.status(200).json({
          message: "Booking accepted successfully",
          booking: acceptedBooking,
        });
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
      res.status(500).json({ error: "Failed to accept booking" });
    }
  }

  public async rejectBooking(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const decodedToken = jwt.verify(token, "secret-key") as JwtPayload;
        const bookingId = req.params.id; // Assuming bookingId is passed in the request params
        // Extract user's role and ID from request object
        const userRole = decodedToken.userRole;
        const userId = decodedToken.userId; // Assuming workerId is obtained from the authenticated user

        if (userRole !== "worker") {
          return res.status(403).json({ error: "Unauthorized access" });
        }

        // Call the service to accept the booking
        const rejectedBooking = await rejectBooking(bookingId, userId);

        res.status(200).json({
          message: "Booking rejected successfully",
          booking: rejectedBooking,
        });
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      res.status(500).json({ error: "Failed to reject booking" });
    }
  }
}

export default new BookingController();
