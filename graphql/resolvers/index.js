const bcrypt = require('bcryptjs');
const moment = require('moment');

const Booking = require('../../models/booking');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date.js');

const transformBooking = bookingToTransform =>  {    //  booking => is the current argument I want to change
    return {
        ...bookingToTransform._doc,
        _id: bookingToTransform.id,
        date: dateToString(bookingToTransform._doc.date),
        creator: user.bind(this, bookingToTransform.creator)
      }
}

const bookings = async bookingIds => {
  try {
    const bookings = await Booking.find({ _id: { $in: bookingIds } });
    bookings.map(booking => {
      return transformBooking(booking);
    });
    return bookings;
  } catch (err) {
    throw err;
  }
};

const singleBooking = async bookingId => {
    try {
        const booking = await Booking.findById(bookingId);
        return transformBooking(booking)
    } catch (err) {
        throw err;
    }
}

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
        return transformBooking(booking);
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
        date: dateToString(args.bookingInput.date),
      creator: '5e80c76d1f65172aacd92d55'
    });
    let createdBooking;
    try {
      const result = await booking.save();
      createdBooking = transformBooking(result);
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
  },  
  cancelBooking: async (args, reg) => { 
    try {
        const booking = await Booking.findById(args.bookingId);
    //    const booking = transformBooking(booking)
        await Booking.deleteOne({_id: args.bookingId});
        return booking;
    } catch (err) {
        throw err;
    }
} 
};



//      5e80c76d1f65172aacd92d55

/*
 ...booking._doc,
        _id: booking.id,
        date: new Date(booking._doc.date).toISOString(),
        creator: user.bind(this, booking.creator)
        */