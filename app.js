const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); //basically middleware before express
const { buildSchema }= require('graphql');
const mongoose = require('mongoose');

const app = express();


// parsing upcoming json bodies
app.use(bodyParser.json());
// inside graphqlHttp() is object {} there we configure graphql api
app.use('/graphql', graphqlHttp({ 
    schema: null,     // this needs to point to graphQl schema
    rootValue: {}       // points to {} with all the resolves function and match schema with names
}))

app.listen(3000);