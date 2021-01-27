const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./Users');

console.log("job");
const jobschema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        required: true
    },
    num_applications: {
        type: Number,
        max: 20,
        required: true
    },
    num_positions: {
        type: Number,
        max: 20,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: new Date()
    },
    deadline: {
        type: Date,
        required: true
    },
    language: {
        type: [],
        required: false
    },
    jobtype: {
        type: String,
        //enum: ['Full-time', 'Part-time', "work from home"],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    salary: {
        type: Number,
        required: true,
        min: 1000,
    },
    rating: {
        type: Number,
        max: 5,
        default: 0
    },
    sum: {
        type: Number,
        default: 0
    },
    applicant: [
        {
            email: {
                type: String,
                //unique:true,
            },
            name: {
                type: String
            }
            ,
            sop: {
                type: String,
                validate: {
                    validator: function (v) {
                        v = v.replace(/(^\s*)|(\s*$)/gi, "");
                        v = v.replace(/[ ]{2,}/gi, " ");
                        v = v.replace(/\n /, "\n");
                        var length = v.split(' ').length;
                        if (length > 250)
                            return false;
                        else
                            return true;
                    }
                }
            },
            status: {
                type: String,
                enum: ['apply', 'applied', 'rejected', 'accepted'],

            },
            date: {
                type: Date,
            },
            Rated: {
                type: Number,
                default: 0
            }

        }
    ]
});

module.exports = Job = mongoose.model("Job", jobschema);