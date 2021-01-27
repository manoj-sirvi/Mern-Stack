var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const { check, validationResult1 } = require('express-validator')
// Load User model
const User = require("../models/Users");
var paswd = '0123456789';
const dashboard = require('./Dashboard');
const { use } = require("./Dashboard");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", [body('password').isNumeric().withMessage("password must contain integers"), body('password').isLength({ min: 5, max: 8 }).withMessage("length must be b/w 5 and 8"), body('email').isEmail().withMessage("please write correct email-address"), body('type').isIn('applicant', "recuirtor"), body('name').matches(/^[A-Za-z\s]+$/).withMessage('name must contain only alphabets')]
    , (req, res) => {
        const errors = validationResult(req);

        //   console.log(errors);
        if (!errors.isEmpty()) {
            //console.log("htyty");
            //  return res.send(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        // console.log("hiii");
        //  console.log(req.body);
        const email = req.body.email;
        User.findOne({ email }).then(user => {
            console.log(user);
            if (user) {
                // console.log(user);
                res.send("1"); // email found in server
            }
            else {
                //console.log("enter\n");
                //console.log(req.body.education);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    date: req.body.date,
                    password: req.body.password,
                    usertype: req.body.usertype,
                    skill: req.body.skill,
                    education: req.body.education,
                    bio: req.body.bio,
                    contact: req.body.contact,
                    job: []

                });
                // console.log(newUser);                                // add new user
                newUser.save()
                    .then(user => {
                        //console.log("fukerf");
                        //  console.log("hii");
                        //   res.redirect('http://localhost:3000/users');
                        res.send(user);
                        //console.log("hiii\n");
                    })
                    .catch(err => {
                        // console.log("error");
                        res.status(400).send(err);
                    });
            }
        });
    });


// POST request 
// Login
router.post("/login", [body('password').isNumeric().withMessage("password must contain integers"), body('password').isLength({ min: 5, max: 8 }).withMessage("length must be b/w 5 and 8"), body('email').isEmail().withMessage("please write correct email-address")], (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //console.log(email);
    // Find user by email
    User.findOne({ email, password }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email or password are wrong",
            });
        }
        else {
            console.log()
            console.log(user);
            res.json(user);
            return user;
        }
    });
});

router.post("/", async function (req, res) {

    const email = req.body.email;
    //console.log(email);
    var id = -1;
    const we = await User.findOne(
        { email },

    ).then(user => {
        console.log(user.id)
        id = user.id
    })
    //  console.log("hello")
    //console.log(id);
    let opts = {
        runValidators: true
    };
    let update = {
        name: req.body.name,
        password: req.body.password,
        education: req.body.education,
        skill: req.body.education,
        bio: req.body.bio,
        contact: req.body.contact

    };
    const ty = await User.findByIdAndUpdate(id,
        update, opts).then(
            user => {
                // console.log("sdfhdsj")
                return res.send(user)
            }
        ).catch(
            err => {
                res.status(400).send(err);
            }
        );



});

router.post("/addjob", async function (req, res) {
    // var id = req.body.id;
    console.log(req.body);
    const email = req.body.email;
    // console.log()
    let update = {
        Title: req.body.Title,
        status: 'applied',
        id: req.body.id,
        date: new Date().toISOString()

    }
    var opt = {
        runValidators: true
    }
    var id = -1;
    const we = await User.findOne(
        { email },

    ).then(user => {
        // console.log(user.id)
        id = user.id
    });
    //console.log(id);
    // var fun = function (err, res) {
    //    // console.log("hiii");
    //     console.log(err, res);

    // }
    //console.log("dude");
    var ty = await User.findByIdAndUpdate(id,
        {
            $addToSet: {
                job: update
            }
        }, opt).then(
            user => {
                res.send(user);
            }
        ).catch(err => {
            console.log("rahul")
            res.status(400).send(err);
        })
});

router.post("/delete", async function (req, res) {
    var id = req.body.id;
    console.log(id);
    console.log("hello");
    console.log(req.body.id2, id, req.body.id1);
    var reject = req.body.status
    date = new Date().toISOString();
    var ty = await User.updateMany({ "_id": req.body.id2, "job.id": id },
        { "$set": { "job.$.status": reject, "job.$.date": date } }, function (err) {
            if (err) {
                console.log("jhba");
                res.status(404).json(err);
            }
            else {
                console.log("sud");
                res.send("success");
            }

        })

});
router.post("/sum1", async function (req, res) {
    var email = req.body.email
    var id = req.body.id;
    var rating = req.body.rating

    console.log(id, rating, email);

    // console.log(email);
    var ty = await User.updateOne({ email: email, "job.id": id }, {
        "$set": { "job.$.Rated": req.body.rating }
    }, function (err) {
        if (err) {
            console.log("jhba");
            res.status(404).json(err);
        }
        else {
            console.log("sud");
            // console.log(res);
            //console.log(res);
            res.send("success");
        }
    }

    )
    console.log("djwhekgf");
});
router.post("/final", async function (req, res) {
    var id = req.body.id
    var rating = req.body.value
    // console.log(email, rating);

    var ty = await User.updateOne({ _id: id }, {
        $set: { rating: rating }
    }, function (err) {
        if (err) {
            console.log("jhba");
            res.status(404).json(err);
        }
        else {
            console.log("sud");
            // console.log(res);
            //console.log(res);
            res.send("success");
        }
    }

    )
})
router.post("/final1", (req, res) => {
    const email = req.body.email;
    console.log(email);
    const name = req.body.name
    console.log(name);
    // const password = req.body.password
    const errors = validationResult(req);

    //console.log(email);
    // Find user by email
    User.findOne({ email: email, name: name }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email or password are wrong",
            });
        }
        else {
            console.log()
            console.log(user);
            res.json(user);
            return user;
        }
    });
});

module.exports = router;

