const usermodel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function Register({ username, email, password }) {
  // check if user already exists
  const existingUser = await userexists(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedone = await protectedpassword(password);

  try {
    const registerobject = new usermodel({
      username,
      email,
      password: hashedone,
    });

    return await registerobject.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function protectedpassword(password) {
  return await bcrypt.hash(password, 10);
}

async function userexists(email) {
  return await usermodel.findOne({ email });
}

async function Login({ email, password }) {
  const user = await userexists(email);
  if (!user) {
    throw new Error("user not found");
  }
  try {
    const login = await bcrypt.compare(password, user.password);
    if (!login) {
      throw new Error("Creditianls dont match");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const userobject = user.toObject();
    delete userobject.password;
    return { user: userobject, token };
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { Register, Login };
