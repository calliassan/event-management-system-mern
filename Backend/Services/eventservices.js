const eventmodel = require("../Models/eventmodel");

async function registerevent(data) {
  try {
    const registerobject = new eventmodel(data);
    const result = await registerobject.save();
    return result;
  } catch (error) {
    throw Error(error.message);
  }
}
async function deleteregistration({ userId, transactionid }) {
  try {
    const deleteobject = await eventmodel.findOneAndDelete({
      userId,
      _id: transactionid,
    });
    return deleteobject;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function gettransactions({ userId }) {
  try {
    const transobj = await eventmodel.find({ userId });
    return transobj;
  } catch (error) {
    throw Error(error.message);
  }
}
async function discoverevents({ page, limit }) {
  try {
    const eventsall = await eventmodel
      .find()
      .sort({ dateTime: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return eventsall;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function exploretrans({ query }) {
  const {
    search,
    page = 1,
    limit = 10,
    category,
    startDate,
    endDate,
    location,
  } = query;
  const filter = {}; //it is usually recommended not to use userId as filter while exploring transactions
  if (search) {
    filter.eventName = { $regex: search, $options: "i" };
  }
  if (category) {
    filter.categoryTags = category;
  }
  if (location) {
    filter.location = location;
  }
  if (startDate || endDate) {
    filter.dateTime = {};
    if (startDate) {
      filter.dateTime.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.dateTime.$lte = new Date(endDate);
    }
  }
  const transactions = await eventmodel
    .find(filter)
    .sort({ dateTime: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await eventmodel.countDocuments(filter);

  return {
    total,
    page: Number(page),
    Totalpages: Math.ceil(total / limit),
    data: transactions,
  };
}
module.exports = {
  registerevent,
  deleteregistration,
  gettransactions,
  discoverevents,
  exploretrans,
};
