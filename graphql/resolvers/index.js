const authResolver = require('./auth');
const bookingResolver = require('./booking');

/*  merging all resolvers in to rootResolver. Using spread operator to spread all the fields.
    every resolver file has to have module.export. !naming clashes on the top level (nested is not an issue)
    every resolver fits the name in a schema => !name clash
*/
const rootResolver = {
    ...authResolver,
    ...bookingResolver
};

module.exports = rootResolver;
