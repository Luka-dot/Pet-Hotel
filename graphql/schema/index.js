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
    petName: String!
    petType: String!
    petWeight: Integer!
  }
type User {
  _id: ID!
  email: String!
  password: String
  createdBookings: [Booking!]
}
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
input BookingInput {
    customer: String!
    checkIn: String!
    checkOut: String!
    price: Float!
    date: String!
    petName: String!
    petType: String!
    petWeight: Integer!
}
input UserInput {
  email: String!
  password: String!
}
type RootQuery {
    booking(_id: String): Booking
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    bookingSearchById(bookingId: ID!): Booking!
    bookingSearchByDate(checkIn: String!): Booking!
    bookingSearchByPrice(price: Float!): Booking!
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