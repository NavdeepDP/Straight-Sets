const express = require("express");
const router = express.Router();
const db = require("../models");


// HTML ROUTES
// =============================================================
// get all the posts associated with player
router.get("/posts/player/:id", function (req, res) {
    console.log("Display posts for player with is: " +  req.params.id);
    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.id,            
        },
        include: [db.Coach, db.Player]
    })
        .then((dbPosts) => {
            console.log(dbPosts);
            res.render("playerFeedback", {posts: dbPosts});

        })
        .catch((err) => {
            res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retrieve player feedback posts.",
            });

        });

});

router.get("/posts/:playerId/:coachId", function (req, res) {
    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.playerId,
            CoachId:req.params.coachId
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

router.get("/post/:id", function (req, res) {
    console.log("new post");
    res.render("new-post",{id: req.user.roleId});
});


// get player posts with  associate coach logged-in
router.get("/posts/:id", function (req, res) {
    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.id,
            CoachId: req.user.roleId
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


router.get("/api/posts/:playerId/:coachId", function (req, res) {
    db.FeedbackPost.findAll({
        where: {
            PlayerId: req.params.playerId,
            CoachId:req.params.coachId
        },
        include: [db.Coach, db.Player]
    })
        .then((dbPosts) => {
            res.json({
                error: false,
                data: dbPosts,
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