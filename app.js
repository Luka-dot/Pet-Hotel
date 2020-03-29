const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Booking = require('./models/booking');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Booking {
          _id: ID!
          customer: String!
          startDate: String!
          endDate: String!
          price: Float!
          date: String!
        }
        input BookingInput {
            customer: String!
            startDate: String!
            endDate: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            bookings: [Booking!]!
        }
        type RootMutation {
            createBooking(bookingInput: BookingInput): Booking
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      bookings: () => {
        return Booking.find()
          .then(bookings => {
            return bookings.map(booking => {
              return { ...booking._doc, _id: booking.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createBooking: args => {
        const booking = new Booking({
          customer: args.bookingInput.customer,
          startDate: new Date(args.bookingInput.startDate),
          endDate: new Date(args.bookingInput.endDate),
          price: +args.bookingInput.price,
          date: new Date(args.bookingInput.date)
        });
        return booking
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

// nodemon.json is set up with username and password. passing those variables to connection to mongoose and starting server
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9lijc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useUnifiedTopology: true}).then(() => {
                    app.listen(3000);;
                    }).catch(err => { 
                        console.log('logging error in connect ',err);
                    });

