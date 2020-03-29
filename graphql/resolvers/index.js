const bcrypt = require('bcryptjs');

const Booking = require('../../models/booking');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date.js');

const bookings = async bookingIds => {
  try {
    const bookings = await Booking.find({ _id: { $in: bookingIds } });
    bookings.map(booking => {
      return {
        ...booking._doc,
        _id: booking.id,
        date: new Date(booking._doc.date).toISOString(),
        creator: user.bind(this, booking.creator)
      };
    });
    return bookings;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdBookings: bookings.bind(this, user._doc.createdBookings)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          date: new Date(booking._doc.date).toISOString(),
          creator: user.bind(this, booking._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createBooking: async args => {
    const booking = new Booking({
        customer: args.bookingInput.customer,
        checkIn:  dateToString(args.bookingInput.checkIn),
        checkOut:  dateToString(args.bookingInput.checkOut),
        price: +args.bookingInput.price,
        date: new Date(args.bookingInput.date).toISOString(),
      creator: '5e80c76d1f65172aacd92d55'
    });
    let createdBooking;
    try {
      const result = await booking.save();
      createdBooking = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(booking._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById('5e80c76d1f65172aacd92d55');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdBookings.push(booking);
      await creator.save();

      return createdBooking;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};



//      5e80c76d1f65172aacd92d55