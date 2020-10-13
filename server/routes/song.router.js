const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


// POST route for adding tempo track to a specific users profile
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('/songs POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    const queryString = `
        INSERT INTO "track" ("name", "bpm", "beats", "user_id")
        VALUES ($1, $2, $3, $4);
    `;
    pool.query(queryString, [req.body.name, req.body.bpm, req.body.beats, req.user.id])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.error(`POST /songs failed`, err);
            res.sendStatus(500);
        });
});

module.exports = router;