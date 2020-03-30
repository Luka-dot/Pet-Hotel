const Booking = require('../../models/booking');
const User = require('../../models/user')
const { dateToString } = require('../../helpers/date.js');
const { transformBooking } = require('./merge.js')


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
            checkIn: dateToString(args.bookingInput.checkIn),
            checkOut: dateToString(args.bookingInput.checkOut),
            price: +args.bookingInput.price,
            date: dateToString(args.bookingInput.date),
            creator: '5e813eebe2cd77339caafa98'
        });
        let createdBooking;
        try {
            const result = await booking.save();

            createdBooking = transformBooking(result);

            const creator = await User.findById('5e813eebe2cd77339caafa98');

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

    cancelBooking: async (args, reg) => {
        try {
            const booking = await Booking.findById(args.bookingId);
            //    const booking = transformBooking(booking)
            await Booking.deleteOne({
                _id: args.bookingId
            });
            return booking;
        } catch (err) {
            throw err;
        }
    },

     bookingSearch: 
     
     async (_, {filter}) => {
         console.log('filter ',filter,_)
        const query = JSON.parse(filter)
        return (await this.bookings.find(query).toArray()).map(prepare)
      }
};