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
    petWeight: Int!
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
    petWeight: Int!
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


/*
query {
  bookingSearchByPrice(price: 55.55) {
    checkIn
  }
}

query {
  login(email:"test11@test.com", password: "hello") {
    userId
    token
  }
}

mutation {
  cancelBooking(bookingId: "5e81400de3672109f860bdd4") {
    customer
  }
}

mutation {
  createBooking(bookingInput:{customer:"Tom Test", checkIn:"2020-04-01T18:11:26.165Z", checkOut:"2020-04-22T18:11:26.165Z", price: 288.55, date:"2020-03-30T18:11:26.165Z", petName:"Rex", petType: "dog", petWeight: 45 }) {
    customer
    checkIn
    checkOut
    price
    petName
    petType
    
  }
}

*/