import sequelize from "../config/config";
import { QueryTypes } from "sequelize";

export const createBooking = async (
  name: string,
  description: string,
  creatorId: number
): Promise<any> => {
  const query =
    "INSERT INTO public.booking (name, description, creator_id) VALUES (?, ?, ?)";

  try {
    const result = await sequelize.query(query, {
        replacements: [name, description, creatorId],
        type: QueryTypes.INSERT,
    });

    // Assuming the inserted ID is returned by the database
    const createdBookingId = result[0];

    // Return the created booking object
    return { bookingId: createdBookingId, name, description, creatorId }; // Return the created booking object
  } catch (error) {
    throw new Error(`Failed to create booking: ${error}`);
  }
};

export const getAllBookings = async (): Promise<any[]> => {
  try {
    const query = "SELECT * FROM public.booking";
    console.log("Executing query:", query);
    const bookings = await sequelize.query(query, { type: QueryTypes.SELECT });
    return bookings;
  } catch (error) {
    throw new Error(`Failed to fetch bookings: ${error}`);
  }
};

export const updateBooking = async (
  bookingId: number,
  name: string,
  description: string
): Promise<any> => {
  const query = `
    UPDATE public.booking
    SET name = ?, description = ?
    WHERE id = ?
  `;
  try {
    await sequelize.query(query, {
      replacements: [name, description, bookingId],
      type: QueryTypes.UPDATE,
    });
    return { id: bookingId, name, description };
  } catch (error) {
    throw new Error(`Failed to update booking: ${error}`);
  }
};

export const deleteBooking = async (bookingId: number): Promise<any> => {
  const query = "DELETE FROM public.booking WHERE id = ?";
  try {
    await sequelize.query(query, {
      replacements: [bookingId],
      type: QueryTypes.DELETE,
    });
    return { message: "Booking deleted successfully" };
  } catch (error) {
    throw new Error(`Failed to delete booking: ${error}`);
  }
};

export const acceptBooking = async (
  bookingId: string,
  workerId: string
): Promise<any> => {
  const query = `
      UPDATE public.booking 
      SET workerId = :workerId, status = 'accepted'
      WHERE id = :bookingId AND status = 'pending'`;

  try {
    const [rowsAffected] = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { bookingId, workerId },
    });

    if (rowsAffected === 0) {
      throw new Error(
        "Failed to accept booking: Invalid booking ID or booking is already accepted"
      );
    }

    // Retrieve the accepted booking details after update
    const updatedBooking = await getBookingById(bookingId);
    return updatedBooking;
  } catch (error) {
    throw new Error(`Failed to accept booking: ${error}`);
  }
};

export const rejectBooking = async (
  bookingId: string,
  workerId: string
): Promise<any> => {
  const query = `
      UPDATE public.booking 
      SET workerId = :workerId, status = 'reject'
      WHERE id = :bookingId AND status = 'pending'`;

  try {
    const [rowsAffected] = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { bookingId, workerId },
    });

    if (rowsAffected === 0) {
      throw new Error(
        "Failed to accept booking: Invalid booking ID or booking is already accepted"
      );
    }

    // Retrieve the accepted booking details after update
    const updatedBooking = await getBookingById(bookingId);
    return updatedBooking;
  } catch (error) {
    throw new Error(`Failed to accept booking: ${error}`);
  }
};

const getBookingById = async (bookingId: string): Promise<any> => {
  const query = "SELECT * FROM bookings WHERE id = :bookingId";

  try {
    const [booking] = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { bookingId },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error) {
    throw new Error(`Failed to fetch booking: ${error}`);
  }
};

export default {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingById,
  acceptBooking,
  rejectBooking,
};
