const express = require("express");
const router = express.Router();
const db = require("../models");

// HTML ROUTES
// =============================================================

router.get("/coach/:id", (req, res) => {
    // ALL the Things should be displayed
    // DB query
    db.Player.findAll().then((dbPlayers) => {
        var data = {
            players:dbPlayers
        };
        res.render("coachView",data );
        console.log(data);
    });
  });

  router.get("/coach/requests/:id", (req, res) => {
    // ALL the Things should be displayed
    // DB query
    // db.Player.findAll().then((dbPlayers) => {
    //     var data = {
    //         players:dbPlayers
    //     };
    //     res.render("coachView",data );
    //     console.log(data);
    // });
    res.render("coachRequests", {id:req.params.id});
  });


 // api ROUTES
// =============================================================

router.get("/api/coaches",(req,res) =>{

    db.Coach.findAll()
    .then((coaches) =>{
        res.json({
            error: false,
            data: coaches,
            message: "coaches List",
          });

    })
    .catch((err) =>{
        res.status(500).json({
            error: true,
            data: null,
            message: "Unable to retrieve coaches.",
          });

    });

});

router.get("/api/coaches/:id",(req,res) =>{

    db.Coach.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((player) =>{
        console.log(coach);
        res.json({
            error: false,
            data: coach,
            message: "Coach Detail",
          });

    })
    .catch((err) =>{
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
        res.json({
          error: false,
          data: newCoach,
          message: "Successfully created new coach.",
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