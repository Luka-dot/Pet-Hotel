const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);


/*
const mongoose = require('mongoose');
// need schema from mongoose package
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // each user can create multiple bookings. therefor use [] inside create single model {}
    // only storing IDs with syntax below 
    createdBooking: [
        {      // ObjectID is special schema provided by mongodb
            type: Schema.Types.ObjectId,
            // ref helps set up connection between models. passing name of the model to connect to this case 'Booking'
            ref: 'Booking'    
        }
    ]
});

module.exports = mongoose.model('User', userSchema);

*/