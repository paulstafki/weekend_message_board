var express = require('express');
var router = express.Router();
var path = require('path');
var Posts = require('../models/posts');

router.post("/", function(req, res, next) {
    console.log("posted", req.body);
    Posts.create(req.body, function(err, post){
        res.send("something created");
    });
});

router.delete("/:id", function(req, res, next){
    Posts.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if (err) {
            console.log("error in delete", err);
        }
        res.json(post);
    });
});

router.get("/", function(req, res, next) {
    Posts.find(function(err, posts){
        res.json(posts);
    });
});

module.exports = router;