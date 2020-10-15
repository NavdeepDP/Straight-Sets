const express = require("express");
const router = express.Router();
const db = require("../models");


// api ROUTES
// =============================================================
// POST route for saving a new post
router.get("/api/requests/:id", function (req, res) {
    console.log("Getting post for player: " + req.params.id);

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


router.post("/api/request", function (req, res) {
    console.log("adding request");
    db.LessonRequest.create(req.body).then(function (dbRequest) {
        res.json(dbRequest);
    });
});


module.exports = router;
