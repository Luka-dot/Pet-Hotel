const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Booking = require('./models/booking');

const User = require('./models/user');

const { dateToString } = require('./helpers/date');

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
        type User {
            _id: ID!
            email: String!
            password: String
            createdBooking: [Booking!]
          }
        input BookingInput {
            customer: String!
            startDate: String!
            endDate: String!
            price: Float!
            date: String!
        }
        input UserInput {
            email: String!
            password: String!
          }
        type RootQuery {
            bookings: [Booking!]!
        }
        type RootMutation {
            createBooking(bookingInput: BookingInput): Booking
            createUser(userInput: UserInput): User
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
          startDate:  dateToString(args.bookingInput.startDate),
          endDate:  dateToString(args.bookingInput.endDate),
          price: +args.bookingInput.price,
          date: dateToString(args.bookingInput.date)
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

    createUser: async args => {
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            // for each event ran: _doc is a property provided by Mongoose. gives {} all properties without metadata
            return {
                ...result._doc
            };
        } 
    

    graphiql: true
  })
);

// nodemon.json is set up with username and password. passing those variables to connection to mongoose and starting server
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9lijc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useUnifiedTopology: true}).then(() => {
                    app.listen(3000);;
                    }).catch(err => { 
                        console.log('logging error in connect ',err);
                    });

