const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
    booking(_id: String): Booking
    bookings: [Booking!]!
    bookingSearch(filter: String): [Booking!]
}
type RootMutation {
    createBooking(bookingInput: BookingInput): Booking
    createUser(userInput: UserInput): User
    cancelBooking(bookingId: ID!): Booking!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);