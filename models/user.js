const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

    uid:{
        type: String,
        require: true
    },

    username: {
        type : String,
        required: true
    },

    password: {
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("User",UserSchema);