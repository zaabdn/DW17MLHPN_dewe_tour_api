const express = require("express");

const router = express.Router();

const {
    readCountry,
    readOneCountry,
    createCountry,
    updateCountry,
    deleteCountry
} = require("../controllers/country");

router.get("/country", readCountry);
router.get("/country/:id", readOneCountry);
router.post("/country", createCountry);
router.patch("/country/:id", updateCountry);
router.delete("/country/:id", deleteCountry);

const {
    readUser,
    deleteUser
} = require("../controllers/user");

router.get("/user", readUser);
router.delete("/user/:id", deleteUser);

module.exports = router;