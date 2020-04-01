const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
// middleware to check for authentication
const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

// preventing CORS fail by allowing any calls to any server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

// middleware check for authentication. this will run on every request and give true/false for token auth
app.use(isAuth);

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
                        app.listen(8000);
                    }).catch(err => { 
                        console.log('logging error in connect ',err);
                    });




/*
mutation {
  createBooking(bookingInput:{customer:"Tomas Tankengine", checkIn:"2020-04-05T18:11:26.165Z", checkOut:"2020-04-12T18:11:26.165Z", price: 288.55, date:"2020-03-30T18:11:26.165Z", petName:"Rufus", petType: "Dog", petWeight: 120 }) {
    customer
    checkIn
    checkOut
    price
    petName
    petType
    petWeight
  }
}
*/
