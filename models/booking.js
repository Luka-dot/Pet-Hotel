const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customer: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    // ref helps set up connection between models. passing name of the model to connect to this case 'User'
    ref: 'User'
  },
  petName: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  petWeight: {
    type: String,
    required: true
  },
  note: {
    type: String,
  }
});

module.exports = mongoose.model('Booking', bookingSchema);


/*
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customer: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    // ref helps set up connection between models. passing name of the model to connect to this case 'User'
    ref: 'User'
}
  
},
{ timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
*/