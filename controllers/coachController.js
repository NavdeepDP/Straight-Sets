const express = require("express");
const router = express.Router();
const db = require("../models");
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML ROUTES
// =============================================================


//==============================================
router.get("/coach/new", (req, res) => {
  console.log("register new coach");
  res.render("coachRegister");
});
//===================================
router.get("/coach/:id",isAuthenticated, (req, res) => {

  db.Player.findAll().then((dbPlayers) => {
    var data = {
      players: dbPlayers,
      role: req.user
    };
    res.render("coachView", data);
    console.log(data);
  });
});


//==============================================
router.get("/coach/requests/:id", (req, res) => {
  res.render("coachRequests", { id: req.params.id });
});



// api ROUTES
// =============================================================


router.get("/api/coaches", (req, res) => {

  db.Coach.findAll()
    .then((coaches) => {
      res.json({
        error: false,
        data: coaches,
        message: "coaches List",
      });

    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve coaches.",
      });

    });

});

router.get("/api/coaches/:id", (req, res) => {

  db.Coach.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((coach) => {
      console.log(coach);
      res.json({
        error: false,
        data: coach,
        message: "Coach Detail",
      });

    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve coaches.",
      });

    });

});

router.post("/api/coach", (req, res) => {
  console.log(req.body);
  db.Coach.create(req.body)
    .then((newCoach) => {

      var dbUser = {
        email: newCoach.email,
        password: "password",
        role: "coach",
        roleId: newCoach.id
      };

      db.User.create(dbUser).then((user) => {
        res.json({
          error: false,
          data: newCoach,
          message: "Successfully created new coach and user entry.",
        });


      }).catch((err) => {
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create user entry and new coach.",
        });
      })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable to create new coach.",
          });
        });
    });
});

router.put("/api/coach/:id", (req, res) => {
  db.Coach.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedObject) => {
    console.log(updatedObject);
    res.end();
  });
});

router.delete("/api/coach/:id", (req, res) => {
  db.Coach.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.end();
  });
});


module.exports = router;