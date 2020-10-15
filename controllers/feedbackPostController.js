const express = require("express");
const router = express.Router();
const db = require("../models");


// HTML ROUTES
// =============================================================
router.get("/post/:id", function (req, res) {
    console.log("new post");
    res.render("new-post");
});

router.get("/posts/:id", function (req, res) {
    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.id
        },
        include: [db.Coach, db.Player]
    })
        .then((dbPosts) => {
            res.render("feedBackView", {posts: dbPosts});

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve player feedback posts.",
            });

        });

});

// api ROUTES
// =============================================================
// POST route for saving a new post
router.get("/api/posts/:id", function (req, res) {
    console.log("Getting post for player: " + req.params.id);

    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.id,
            
        },
        include: [db.Coach, db.Player]
        
           
    })
        .then((posts) => {
            res.json({
                error: false,
                data: posts,
                message: "Feeback List",
            });

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve player feedback posts.",
            });

        });

});

router.post("/api/posts", function (req, res) {
    console.log("adding post");
    db.FeedbackPost.create(req.body).then(function (dbPost) {
        res.json(dbPost);
    });
});




router.get("/api/posts", function (req, res) {
    console.log("adding post");
    db.FeedbackPost.findAll()
        .then((posts) => {
            res.json({
                error: false,
                data: posts,
                message: "Feeback List",
            });

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve player feedback posts.",
            });

        });
});




module.exports = router;