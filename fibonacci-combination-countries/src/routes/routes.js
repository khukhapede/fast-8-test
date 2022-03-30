const express = require("express");
const router = express.Router();

const { Fibonacci } = require("../controller/fibonacci");
const { Combinations } = require("../controller/combination");
const { Countries } = require("../controller/countries");

router.post("/fibonacci", Fibonacci);

router.post("/combinations", Combinations);

router.get("/countries", Countries);

module.exports = router;
