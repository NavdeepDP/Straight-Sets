const express = require("express");
const router = express.Router();
const db = require("../models");


// HTML ROUTES
// =============================================================

router.get("/players", (req, res) => {
    // ALL the Things should be displayed
    // DB query
    db.Player.findAll().then((players) => {
        console.log(players);
      //res.render("all-players", { players: allThings });
    });
  });



 // api ROUTES
// =============================================================

router.get("/api/players",(req,res) =>{

    db.Player.findAll()
    .then((players) =>{
        res.json({
            error: false,
            data: players,
            message: "Players List",
          });

    })
    .catch((err) =>{
        res.status(500).json({
            error: true,
            data: null,
            message: "Unable to retrieve players.",
          });

    });

});

router.get("/api/players/:id",(req,res) =>{

    db.Player.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((player) =>{
        res.json({
            error: false,
            data: player,
            message: "Player Detail",
          });

    })
    .catch((err) =>{
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
        res.json({
          error: false,
          data: newPlayer,
          message: "Successfully created new Player.",
        });
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
    }).then((result) => {
      res.end();
    });
  });


module.exports = router;