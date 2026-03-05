const { Register, Login } = require("../Services/registerandloginservices");

async function Registercontroller(req, res) {
  const { username, email, password } = req.body;
  try {
    const registeruser = await Register({
      username,
      email,
      password,
    });
    res
      .status(200)
      .json({ data: registeruser, message: "Registration successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function Logincontroller(req, res) {
  const { email, password } = req.body;
  try {
    const loginuser = await Login({ email, password });
    res.status(200).json({ data: loginuser, message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = { Registercontroller, Logincontroller };
