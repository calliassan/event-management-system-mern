const { dashboardService } = require("../Services/dashboardservice");

async function dashboardController(req, res) {
  try {
    const dashboardwork = await dashboardService({ userId: req.user.userId });
    res.status(200).json({ data: dashboardwork });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = { dashboardController };
