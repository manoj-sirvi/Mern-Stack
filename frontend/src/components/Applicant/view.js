import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { LocalActivity } from '@material-ui/icons';
var usem

class Profile extends Component {
    // localStorage.getItem("currentuser");
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            usertype: '',
            name: '',
            email: '',
            password: '',
            date: null,
            contact: '',
            bio: '',
            sop: '',
            applied: new Date(),
            rating: '',
            education: [

            ],
            skill: [],
            errors: {
                name1: '',
                // email1: 'email not be empty',
                password1: '',
                contact1: '',
                bio: '',
                startyear1: '',
                endyear1: ''
            }
        }



        // this.addclg = this.addclg.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var you = this.props.location.state;
        // console.log(you);
        this.setState({ usertype: you.detail.usertype });
        this.setState({ education: you.detail.education });
        this.setState({ name: you.detail.name });
        this.setState({ skill: you.detail.skill });
        this.setState({ sop: you.obj.sop });
        this.setState({ applied: you.obj.date });
        this.setState({ rating: you.detail.rating });
        this.setState({ status: you.obj.status });

        this.setState({ skill: you.detail.skill });
        console.log(this.state.skill, you.detail.skill);
    }


    createUI() {
        return this.state.skill.map((el, i) =>
            <div key={i}>
                <input type="text" value={el} />
                <input type='button' value='remove' />
            </div>
        )
    }



    render() {
        // console.log("destruy" + this.state.name);
        //console.log("yuou" + this.state.errors.name1);
        // console.log("hello\n");
        // for (var i = 0; i < this.state.education.length; i++) {
        //     console.log(this.state.education[i]);
        // for (var i = 0; i < this.state.education.length; i++) {
        //     console.log(this.state.education[i]);
        // }
        // console.log("hello\n");
        if (this.state.usertype == "applicant") {
            return (

                <div className="box">
                    <form >
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.name}

                            />
                        </div>

                        <div className="form-group">
                            <label>Status: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.status}

                            />
                        </div>

                        <div className="form-group">
                            <label>Applied date: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.applied}

                            />
                        </div>



                        <label>Education:</label>
                        <div>
                            {
                                this.state.education.map((x, i) => {
                                    return (
                                        <div className="box">
                                            <input name="institute_name" placeholder="institute_name" value={x.institute_name} />
                                            <input name="startyear" placeholder="startyear" value={x.startyear} />
                                            <input name="endyear" placeholder="endyear" value={x.endyear} />
                                        </div>


                                    );
                                })
                            }

                        </div>
                        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.education)}</div> */}
                        <br></br>

                        <div >
                            <label>Skill:</label>
                            {
                                this.createUI()
                            }
                            <br></br>

                        </div>


                        <br></br><br></br>
                        <div className="form-group">
                            <label>Rating: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.rating}

                            />
                        </div>
                        <div className="form-group">
                            <label>Sop: </label>
                            <textarea type="text"
                                className="form-control"
                                value={this.state.sop}

                            ></textarea>
                        </div>
                        <div className="form-group">
                        </div>

                    </form>
                </div >
            )
        }
        else {
            return (

                <div className="box">
                    <form onSubmit={this.onSubmit}>
                        <div checker={this.state} className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeUsername}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>

                        <div className="form-group">
                            <label>password: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>contact_no: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.contact}
                                onChange={this.onChangeContact}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bio: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.bio}
                                onChange={this.onChangeBio}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                        <div style={{ color: "red", }}>
                            <b>
                                {this.state.errors.email1}
                                <br></br>
                                {
                                    this.state.errors.name1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.password1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.contact1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.bio
                                }
                            </b>
                        </div>
                    </form>
                </div>
            )
        }
    }


}

function checker(value) {
    if (value == undefined) {
        return 0;
    }
    else {
        return 1;
    }
}

export default Profile;