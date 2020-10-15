const express = require("express");
const router = express.Router();
const db = require("../models");


// api ROUTES
// =============================================================
// lesson request for player
router.get("/api/requests/:id", function (req, res) {
    console.log("Getting lesson for player: " + req.params.id);

    db.LessonRequest.findAll({
        where: {
            PlayerId: req.params.id,
            
        },
        include: [db.Coach, db.Player]
        
           
    })
        .then((posts) => {
            res.json({
                error: false,
                data: posts,
                message: "Lesson Requests List",
            });

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve lesson Request lists.",
            });

        });

});


// lesson request for coach
router.get("/api/requests/coach/:id", function (req, res) {
    console.log("Getting lesson for coach: " + req.params.id);

    db.LessonRequest.findAll({
        where: {
            CoachId: req.params.id,
            
        },
        include: [db.Coach, db.Player]
        
           
    })
        .then((posts) => {
            res.json({
                error: false,
                data: posts,
                message: "Lesson Requests List",
            });

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve lesson Request lists.",
            });

        });

});


router.post("/api/request", function (req, res) {
    console.log("adding request");
    db.LessonRequest.create(req.body).then(function (dbRequest) {
        res.json(dbRequest);
    });
});


router.put("/api/request/:id", (req, res) => {
    db.LessonRequest.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((updatedObject) => {
      console.log(updatedObject);
      res.end();
    });
  });

module.exports = router;
