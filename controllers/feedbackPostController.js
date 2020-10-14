const express = require("express");
const router = express.Router();
const db = require("../models");


// HTML ROUTES
// =============================================================
router.get("/post", function (req, res) {
    console.log("new post");
    res.render("new-post");
  });



 // api ROUTES
// =============================================================



module.exports = router;