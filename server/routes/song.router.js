const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


// GET route to return the users songs
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/songs GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    const queryText = `SELECT * FROM "track" WHERE "user_id" = $1 ORDER BY "id" ASC;`; 
    const queryParams = [req.user.id];
    pool.query(queryText, queryParams)
        .then((result) => {
        res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});


// POST route for adding tempo track to a specific users profile
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('/songs POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    const queryString = `
        INSERT INTO "track" ("name", "bpm", "beats", "accent", "regular", "user_id")
        VALUES ($1, $2, $3, $4, $5, $6);
    `;
    pool.query(queryString, [req.body.name, req.body.bpm, req.body.beats, req.body.track2, req.body.track, req.user.id])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.error(`POST /songs failed`, err);
            res.sendStatus(500);
        });
});

// DELETE route for removing a track from a users profile
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('Delete song with id of', req.params.id);
    const queryString = 'DELETE FROM "track" WHERE "id" = $1;'
    pool.query(queryString, [req.params.id])
        .then(response => {
            console.log("Deleted!");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log("Error in DELETE", err);
            res.sendStatus(500);
        })
  });

// PUT route for editing track info in users profile
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('EDITING song with id of', req.body.id);
    const queryString = 'UPDATE "track" SET ("name", "bpm", "beats") = ($1, $2, $3) WHERE "id" = $4;'
    pool.query(queryString, [req.body.name, req.body.bpm, req.body.beats, req.body.id])
        .then(response => {
            console.log("Updated!");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log("Error in PUT", err);
            res.sendStatus(500);
        })
  });


module.exports = router;