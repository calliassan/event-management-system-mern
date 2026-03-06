async function dashboardService({ userId }) {
  try {
    const now = new Date();

    const registeredevents = await eventmodel
      .find({ userId })
      .sort({ dateTime: 1 });

    const upcomingEvents = await eventmodel
      .find({
        userId,
        dateTime: { $gte: now },
      })
      .sort({ dateTime: 1 });

    const pastEvents = await eventmodel
      .find({
        userId,
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
