const {
  registerevent,
  deleteregistration,
  gettransactions,
  discoverevents,
  exploretrans,
} = require("../Services/eventservices");

async function Registerevents(req, res) {
  const reqbody = req.body;
  try {
    const register = await registerevent({
      userId: req.user.userId,
      ...reqbody,
    });
    res
      .status(200)
      .json({ data: register, message: "Registration successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function deleteRegistration(req, res) {
  const userId = req.user.userId;
  const transactionid = req.params.id;
  try {
    const deletereg = await deleteregistration({ userId, transactionid });
    res.status(200).json({ data: deletereg, message: "event deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getEvents(req, res) {
  try {
    const events = await gettransactions({ userId: req.user.userId });
    res
      .status(200)
      .json({ data: events, message: "fetched all transaction of user" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function discoverEvents(req, res) {
  try {
    const discover = await discoverevents({ page: 1, limit: 10 });
    res
      .status(200)
      .json({ data: discover, message: "fetched all events successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function exploreTransactions(req, res) {
  try {
    const exploredtrans = await exploretrans({
      query: req.query,
    });
    res
      .status(200)
      .json({ data: exploredtrans, message: "Explore trans successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  Registerevents,
  deleteRegistration,
  getEvents,
  discoverEvents,
  exploreTransactions,
};
