const express = require("express");
const router = express.Router();
const {
    authUser,
    authAdmin
} = require("../middleware/auth");

const {
    readCountry,
    readOneCountry,
    createCountry,
    updateCountry,
    deleteCountry
} = require("../controllers/country");

router.get("/country", readCountry);
router.get("/country/:id", readOneCountry);
router.post("/country", authAdmin, createCountry);
router.patch("/country/:id", authAdmin, updateCountry);
router.delete("/country/:id", authAdmin, deleteCountry);

const {
    readUser,
    deleteUser,
    register,
    loginUser
} = require("../controllers/user");

router.get("/user", readUser);
router.post("/register", register);
router.post("/login", loginUser);
router.delete("/user/:id", deleteUser);

const {
    readTrip,
    createTrip,
    deleteTrip,
    readOneTrip,
    updateTrip
} = require("../controllers/trip");

router.get("/trip", readTrip);
router.get("/trip/:id", readOneTrip);
router.post("/trip", authAdmin, createTrip);
router.put("/trip/:id", authAdmin, updateTrip);
router.delete("/trip/:id", authAdmin, deleteTrip);

const {
    readTransaction,
    readOneTransaction,
    createTransaction,
    updateTransaction
} = require("../controllers/transaction");

router.get("/transaction", readTransaction);
router.get("/transaction/:id", readOneTransaction);
router.post("/transaction", createTransaction);
router.patch("/transaction/:id", updateTransaction);

module.exports = router;