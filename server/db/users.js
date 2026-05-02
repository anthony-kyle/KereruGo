const connection = require("./connection");
const { generateHash } = require("../lib/auth/password");

function createUser(user, db = connection) {
  const newUser = { ...user };
  return generateHash(newUser.password).then((passwordHash) => {
    newUser.hash = passwordHash;
    delete newUser.password;
    return db("users").insert(newUser);
  });
}

function userExists(username, db = connection) {
  return db("users")
    .where("username", username)
    .then((users) => users.length > 0);
}

function getUserByUsername(username, db = connection) {
  return db("users").where("username", username).first();
}

function getUserBadges(user_id, db = connection) {
  return db("badges")
    .join("badges_users", "badges.id", "badges_users.badge_id")
    .where("badges_users.user_id", user_id);
}

function addToCount(newCount, id, db = connection) {
  return db("badges_users").where("id", id).update({ current_count: newCount });
}

function addBadge(newBadge, db = connection) {
  return db("badges_users").insert(newBadge);
}

// matt's stuff here
//Here we create a function that uses the DB (which inserts our image information into the table)
//Which will get fired when we the image uploader function in the client API fires.

//Get user by username and POST or GET image

function assignImage(id, db = connection) {
  return db("users")
    .join("images", "users.user_img", "images.user_img")
    .where("users.id", id);
}

function getImage(id, file, db = connection) {
  // const file = req.file;
  console.log(file);
  return db("users").where("id", id).insert(file);
}

function addImage(user_id, user_img, db = connection) {
  console.log('addImage')
  return db("users").where("id", user_id).update("user_img", user_img);
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername,
  getUserBadges,
  addToCount,
  addBadge,
  addImage,
  getImage,
};
