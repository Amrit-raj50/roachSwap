import HiveMindSession from "../models/HiveMindSession.js";
import User from "../models/User.js";
import MentorshipBooking from "../models/MentorshipBooking.js";

export const getMentors = async (req, res) => {
  try {
    const mentors = await User.find({ isMentor: true }).select("alias rank mentorExpertise nextMentorSlot");
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSession = async (req, res) => {
  try {
    if (!req.user.isMentor) return res.status(403).json({ message: "Only mentors can create slots" });
    const session = new HiveMindSession({
      ...req.body,
      mentor: req.user._id
    });
    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new mentorship booking request
export const createBooking = async (req, res) => {
  try {
    const { mentorId, dateTime, note, topics } = req.body;
    if (!mentorId || !dateTime || !note) {
      return res.status(400).json({ message: "Please provide mentorId, dateTime, and a note." });
    }

    // Find the selected mentor
    const mentorUser = await User.findById(mentorId);
    if (!mentorUser) {
      return res.status(404).json({ message: "Mentor not found." });
    }
    if (!mentorUser.isMentor) {
      return res.status(400).json({ message: "Selected user is not registered as a mentor." });
    }

    // Prevent user booking themselves
    if (mentorId === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot book a mentorship session with yourself." });
    }

    // Ensure selected slot is in the future
    const scheduledTime = new Date(dateTime);
    if (scheduledTime.getTime() <= Date.now()) {
      return res.status(400).json({ message: "Mentorship sessions must be scheduled in the future." });
    }

    const booking = new MentorshipBooking({
      mentor: mentorId,
      bookedBy: req.user._id,
      dateTime: scheduledTime,
      note,
      topics: Array.isArray(topics) ? topics : []
    });

    const savedBooking = await booking.save();
    
    // Populate the response
    const populatedBooking = await MentorshipBooking.findById(savedBooking._id)
      .populate("mentor", "name alias rank avatar mentorExpertise")
      .populate("bookedBy", "name alias rank avatar");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings related to the logged-in user
export const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    // Get all bookings where the user is either the bookedBy (mentee) OR the mentor
    const bookings = await MentorshipBooking.find({
      $or: [{ bookedBy: userId }, { mentor: userId }]
    })
      .populate("mentor", "name alias rank avatar mentorExpertise")
      .populate("bookedBy", "name alias rank avatar currentStatus state")
      .sort({ dateTime: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status (accept, complete, or cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!["pending", "accepted", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status." });
    }

    const booking = await MentorshipBooking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const userId = req.user._id.toString();
    const isMentor = booking.mentor.toString() === userId;
    const isMentee = booking.bookedBy.toString() === userId;

    if (!isMentor && !isMentee) {
      return res.status(403).json({ message: "You are not authorized to update this booking." });
    }

    // Rule-based updates:
    // 1. Only mentors can accept or mark as completed
    if (["accepted", "completed"].includes(status) && !isMentor) {
      return res.status(403).json({ message: "Only the mentor can accept or complete a session." });
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    const populatedBooking = await MentorshipBooking.findById(updatedBooking._id)
      .populate("mentor", "name alias rank avatar mentorExpertise")
      .populate("bookedBy", "name alias rank avatar currentStatus state");

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

