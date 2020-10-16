const express = require("express");
const router = express.Router();
const db = require("../models");
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


// // HTML ROUTES
// // =============================================================



router.get("/player/new", function (req, res) {
  console.log("new player");
  res.render("new-player");
});


router.get("/players", (req, res) => {
  // ALL the Things should be displayed
  // DB query
  db.Player.findAll().then((players) => {
    console.log(players);
    //res.render("all-players", { players: allThings });
  });
});


router.get("/players/:id", isAuthenticated, (req, res) => {

  db.Player.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((player) => {
      console.log(player)
      res.render("playerView", player.dataValues);
    })
    .catch((err) => {

    });

});



// // api ROUTES
// // =============================================================


// router.post("/api/login", passport.authenticate("local"), function (req, res) {
//   console.log(req.user);
//   res.json(req.user);
// });

router.get("/api/players", (req, res) => {

  db.Player.findAll()
    .then((players) => {
      res.json({
        error: false,
        data: players,
        message: "Players List",
      });

    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve players.",
      });

    });

});

router.get("/api/players/:id", (req, res) => {
  console.log("player id: " + req.params.id);
  db.Player.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((player) => {
      console.log(player);
      res.json({
        error: false,
        data: player,
        message: "Player Detail",
      });

    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve players.",
      });

    });

});

router.post("/api/player", (req, res) => {
  console.log(req.body);

  db.Player.create(req.body)
    .then((newPlayer) => {

      var dbUser = {
        email: newPlayer.email,
        password: newPlayer.password,
        role: "player",
        roleId: newPlayer.id
      };

      db.User.create(dbUser).then((user) => {
        res.json({
          error: false,
          data: newPlayer,
          message: "Successfully created user entry Player.",
        });
      }).catch((err) => {
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create user entry and new player.",
        });


      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new player.",
      });
    });

});

router.put("/api/player/:id", (req, res) => {
  db.Player.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedObject) => {
    console.log(updatedObject);
    res.end();
  });
});

router.delete("/api/Player/:id", (req, res) => {
  db.Player.destroy({
    where: {
      id: req.params.id,
    },
  }).then((numberOfDestroyedRows) => {
    console.log(numberOfDestroyedRows);
    if (numberOfDestroyedRows === 1) {
      res.json({
        success: true,
        message: `Successfully deleted player: ${req.params.id}`,
      });
    } else {
      res.status(500);
      res.json({
        success: false,
        message: `A problem occurred deleting player: ${req.params.id}`,
      });
    }
  })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        success: false,
      });
    });
});

module.exports = router;