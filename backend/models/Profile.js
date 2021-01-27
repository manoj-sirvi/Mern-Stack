const { Mongoose } = require("mongoose")

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Profileschema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            require: true
        },
        education: {
            type: String,
            required: true
        },
        skills: {
            type: String,
            required: true
        }

    }
);

module.exports = Profile = mongoose.model("Profile", Profileschema);
