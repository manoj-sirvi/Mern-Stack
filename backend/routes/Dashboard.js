var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const Job = require('../models/Job');
const User = require("../models/Users");
//console.log(typeof (Job.user));
//console.log("hello");
router.get("/", function (req, res) {
    // console.log("hello\n");
    // console.log("hello");
    var date = new Date().toISOString();
    Job.find({ deadline: { $gte: date } }, function (err, jobs) {
        if (err) {
            console.log(err);
        } else {
            // console.log((jobs));
            // res.redirect("http://localhost:3000/users");
            res.json(jobs);
        }
    })
});
router.post("/createjob", function (req, res) {
    console.log(req.body);
    const newJob = new Job({
        email: req.body.email,
        Title: req.body.Title,
        num_applications: req.body.num_applications,
        num_positions: req.body.num_positions,
        date: req.body.date,
        deadline: req.body.deadline,
        language: req.body.language,
        jobtype: req.body.jobtype,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: req.body.rating,
        applicant1: [],
        name: req.body.name

    });

    console.log("jello\n");
    console.log(req.body.name)
    console.log(newJob);
    newJob.save().then
        (
            job => {

                // console.log("fhdgdsk")
                res.send(job);
            }
        ).catch(err => {
            //  console.log(err);
            // console.log("wfuywuekf");//
            res.status(400).send(err);
        });

}
);
router.post("/update", async function (req, res) {
    var id = req.body.id;
    console.log(id);
    // console.log()
    let update = {
        email: req.body.email,
        sop: req.body.sop,
        status: 'applied',
        date: new Date().toISOString(),
        name: req.body.name
        // _id:1
    }
    console.log(update);
    var opt = {
        runValidators: true
    }
    // var fun = function (err, res) {
    //    // console.log("hiii");
    //     console.log(err, res);

    // }
    // console.log("dude");
    var ty = await Job.findByIdAndUpdate(id,
        {
            $addToSet: {
                applicant: update
            }
        }, opt).then(
            user => {
                res.send(user);
            }
        ).catch(err => {
            res.status(400).send(err);
        })

    //console.log("poor people");
    // console.log(update1);

});
router.post("/getspecial", function (req, res) {
    // console.log(req.body.email);
    Job.find({ email: req.body.email }, function (err, jobs) {
        if (err) {
            console.log(err);
        } else {
            // console.log((jobs));
            // res.redirect("http://localhost:3000/users");
            res.json(jobs);
        }
    })

});
router.post("/updatejob", async function (req, res) {
    var id = req.body.id;
    // console.log(id);
    // console.log(req.body);
    // console.log()
    let update = {
        num_applications: req.body.applicants,
        num_positions: req.body.positions,
        deadline: req.body.deadline
        // _id:1
    };
    // console.log(update);
    var opt = {
        runValidators: true
    }
    //  console.log("hello\n");
    var fun = function (err, res) {
        // console.log("hiii");
        // console.log(err, res);

    }
    var ty = await Job.findByIdAndUpdate(id, update, opt).then(
        user => {
            // console.log(user);
            return res.send(user);
        }
    ).catch(err => {
        res.status(400).send(err);
    })


});
router.post("/getjob", function (req, res) {
    //  console.log(req.body.email);
    console.log("jedjkas" + req.body.email);
    const id = req.body.email;
    Job.findOne({ _id: id }).then(user => {
        if (!user) {
            return res.status(404).json({
                error: "Email or password are wrong",
            });
        }
        else {
            console.log(user);
            res.json(user);
            //console.log(user);
            return user;
        }
    })

});
router.post("/delete", async function (req, res) {
    // console.log(req.body);
    // console.log("hello");
    var id = req.body.id;
    console.log(id);
    var yu = await Job.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("hello")
            res.status(404).json(err);
        }
        else {
            console.log("weuhhgwek");
            res.send("success");
        }
    })
});
router.post("/accept", async function (req, res) {
    var id = req.body.id1;
    console.log(id);
    console.log("hello1");
    console.log(req.body.id, id);
    var reject = req.body.status
    var k = 0;
    if (reject == 'accepted')
        k++;
    var date = new Date().toISOString();

    console.log(reject);
    console.log(Job.length);
    var response;
    var ty = await Job.updateOne({ "_id": req.body.id, "applicant._id": id },
        { "$set": { "applicant.$.status": reject, "applicant.$date": date }, "$inc": { "sum": k } }, function (err) {
            if (err) {
                console.log("jhba");
                res.status(404).json(err);
            }
            else {
                console.log("sud");
                response = res;
                //console.log(res);
                res.send("success");
            }

        })
    if (reject == "accepted") {
        // console.log("checking");
        let mailTransporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: 'mc796749@gmail.com',
                    pass: 'choudhary09876'
                }
            }
        );
        var p = req.body.email + "accept your application";
        let maildetails = {
            from: 'mc796749@gmail.com',
            to: response.applicant[0].email,
            subject: p,
            text: 'hello'
        };
        mailTransporter.sendMail(maildetails, function (err, data) {
            if (err) {
                console.log("completed")
            }
            else {
                console.log("half completed");
            }
        })
    }
    console.log("wdbjwgke");

});
router.post("/sum", async function (req, res) {

    var id = req.body.id;
    var rating = req.body.rating;
    console.log(rating);
    var id1 = req.body.id1;
    var update = {
        rating: req.body.rating
    }
    var opt = {
        runValidators: true
    }
    console.log("wejhgwej");
    var ty = await Job.findByIdAndUpdate(id, update, opt).then(
        user => {
            // console.log(user);
            return res.send(user);
        }
    ).catch(err => {
        res.status(400).send(err);
    })




})



module.exports = router;