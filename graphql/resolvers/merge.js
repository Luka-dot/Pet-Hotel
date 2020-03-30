const Booking = require('../../models/booking');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');



const bookings = async bookingIds => {
    try {
      const bookings = await Booking.find({ _id: { $in: bookingIds } });
      bookings.map(booking => {
        return transformBooking(booking);
      });
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
  
  const transformBooking = bookingToTransform =>  {    //  booking => is the current argument I want to change
    return {
        ...bookingToTransform._doc,
        _id: bookingToTransform.id,
        date: dateToString(bookingToTransform._doc.date),       
        creator: user.bind(this, bookingToTransform.creator)
      }
}
 
exports.transformBooking = transformBooking;