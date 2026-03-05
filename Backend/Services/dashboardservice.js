const mongoose = require("mongoose");
const eventmodel = require("../Models/eventmodel");

async function dashboardService({ userId }) {
  try {
    const now = new Date();

    // convert to ObjectId to maintain consistency
    const objectId = new mongoose.Types.ObjectId(userId);

    const registeredevents = await eventmodel
      .find({ userId: objectId })
      .sort({ dateTime: 1 });

    const upcomingEvents = await eventmodel
      .find({
        userId: objectId,
        dateTime: { $gte: now },
      })
      .sort({ dateTime: 1 });

    const pastEvents = await eventmodel
      .find({
        userId: objectId,
        dateTime: { $lt: now },
      })
      .sort({ dateTime: -1 });

    return {
      registeredevents,
      upcomingEvents,
      pastEvents,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { dashboardService };
