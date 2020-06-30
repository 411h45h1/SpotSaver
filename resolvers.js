const user = {
  _id: "1",
  name: "Ahmed",
  email: "email.ca",
  picture: "https://cloudinary.com/asdf",
};

module.exports = {
  Query: {
    me: () => user,
  },
};
