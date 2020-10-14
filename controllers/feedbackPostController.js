const express = require("express");
const router = express.Router();
const db = require("../models");


// HTML ROUTES
// =============================================================
router.get("/post/:id", function (req, res) {
    console.log("new post");
    res.render("new-post");
  });



// api ROUTES
// =============================================================
  // POST route for saving a new post
  router.post("/api/posts", function(req, res) {
      console.log("adding post");
    db.FeedbackPost.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });


module.exports = router;