const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// nodemon.json is set up with username and password. passing those variables to connection to mongoose and starting server
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9lijc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useUnifiedTopology: true}).then(() => {
                        app.listen(3000);
                    }).catch(err => { 
                        console.log('logging error in connect ',err);
                    });




/*
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
          checkIn: String!
          checkOut: String!
          price: Float!
          date: String!
          creator: User!
        }
        type User {
            _id: ID!
            email: String!
            password: String
            createdBookings: [Booking!]
          }
        input BookingInput {
            customer: String!
            checkIn: String!
            checkOut: String!
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
        return Booking.find().populate('creator')    // populate will allow to "drill" in to ref collection
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
          checkIn:  dateToString(args.bookingInput.checkIn),
          checkOut:  dateToString(args.bookingInput.checkOut),
          price: +args.bookingInput.price,
          date: dateToString(args.bookingInput.date),
          // temp hardcoded
          creator: "5e80a69b43a09c2de8af89c4"
        });
        let createdBooking;
        return booking
          .save()
          .then(result => {
            createdBooking = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById('5e80a69b43a09c2de8af89c4');
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.createdBooking.push(booking);
            return user.save();
          })
          .then(result => {
            return createdBooking;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      
    },

    createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error('User exists already.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            // setting password returned to null so it never shows
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
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
*/
