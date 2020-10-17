const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const decode = require('unescape');
const parseString = require('xml2js').parseString;


// Player Results
// Player Tournaments
router.get('/v1/usta/player/:id/tournaments', (req, res) => {
    axios.get("http://tennislink.usta.com/PublicWebServices/TournamentsMobile.asmx/websrvc_get_user_tournaments", {
        params: {
            strMemberNum: req.params.id
        }
    })
        .then(response => {
            parseString(decode(response.data.toString()), { explicitArray: false, ignoreAttrs: true }, function (err, result) {
                let resp = { name: result.string.userinfo.playername, tournaments: result.string.userinfo.tournaments.tournament };
                res.json(resp);
            });
        })
});

// Player Results
router.get('/v1/usta/player/:id/results', (req, res) => {
    axios.get("http://tennislink.usta.com/PublicWebServices/TournamentsMobile.asmx/websrvc_get_player_result_history_for_tournaments", {
        params: {
            strMemberID: req.params.id,
            year: req.query.year || 0
        }
    })
        .then(response => {
            parseString(decode(response.data.toString()), { normalizeTags: true, explicitArray: false, ignoreAttrs: true }, function (err, result) {
                res.json(result.string.tournaments.tournament);
            });
        });
});


// Tournament Search
module.exports = router;