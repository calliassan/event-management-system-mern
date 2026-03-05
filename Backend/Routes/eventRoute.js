const express = require("express");
const {
  Registerevents,
  deleteRegistration,
  getEvents,
  discoverEvents,
  exploreTransactions,
} = require("../controllers/eventcontroller");
const { userAuth } = require("../Authorization/userAuth");
const { dashboardController } = require("../controllers/dashboardcontroller");
const router = express.Router();
router.post("/register", userAuth, Registerevents);
router.delete("/delete/:id", userAuth, deleteRegistration);
router.get("/getevents", userAuth, getEvents);
router.get("/allevents", userAuth, discoverEvents);
router.get("/explore", userAuth, exploreTransactions);
router.get("/dashboard", userAuth, dashboardController);
module.exports = router;
