const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

//find or create new user
exports.findOrCreateUser = async (token) => {
  //verify token
  const googleUser = await verifyAuthToken(token);
  //check if usr exists
  const user = await checkUserExists(googleUser.email);
  //if usr exists, return it; otherwise, create new usr in db
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying auth token", error);
  }
};

const checkUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser = (googleUser) => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  return new User(user).save();
};
