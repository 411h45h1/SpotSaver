//graphql
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//MongoDB
const mongoose = require("mongoose");
const { findOrCreateUser } = require("./controllers/userController");
require("dotenv").config();

mongoose
  .connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error("Unable to authenticate user");
    }
    return { currentUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running @ ${url}`);
});
