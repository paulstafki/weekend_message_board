var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
    //key: data type
    name: String,
    message: String
});

module.exports = mongoose.model("posts", PostsSchema);