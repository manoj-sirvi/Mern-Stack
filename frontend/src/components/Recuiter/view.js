import React, {
    Component
} from 'react';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from '@material-ui/core/Select';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from 'react-datepicker';
import MenuItem from '@material-ui/core/MenuItem';
import nodemailer from 'nodemailer'
import { Table } from 'react-bootstrap'

import FuzzySearch from 'fuzzy-search';
import Fuse from 'fuse.js'
import { keys } from '@material-ui/core/styles/createBreakpoints';
export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            job: JSON.parse(localStorage.getItem("currentjob")),
            users: [],
            sortName: false,
            sortDate: false,
            sortRating: false,
            value1: 'Accept',
            value2: 'Reject'
        }
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        //this.onChangeUsertype = this.onChangeUsertype.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeApplication = this.onChangeApplication.bind(this);
        this.onChangeDeadLine = this.onChangeDeadLine.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.ViewProfile = this.ViewProfile.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
        this.sortName = this.sortName.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.Accept = this.Accept.bind(this);
        this.Reject = this.Reject.bind(this);
    }
    componentDidMount() {
        this.state.job =
            JSON.parse(localStorage.getItem("currentjob"))

        console.log("recall");
        axios.get("http://localhost:5000/user/").then(res => {

            this.setState({
                users: res.data
            });


            //  console.log(this.state.applicants, this.state.positions, this.state.deadline, this.state.id);

        }).catch(err => {
            alert("Error occur");

        })

    }
    onChangeApplication(e) {
        this.setState({ applicants: e.target.value })
    }
    onChangeDeadLine(date) {
        console.log(date);
        this.setState({ deadline: date.toISOString() })

    }
    onChangePosition(e) {
        this.setState({ positions: e.target.value })

    }
    onSubmit(e) {
        e.preventdefault();
    }


    ViewProfile(ind, user) {
        var ans = this.state.users.find(val => val.email == user.email);
        var obj = {
            sop: user.sop,
            date: user.date,
            status: user.status
        }
        this.props.history.push({
            pathname: '/recdashboard/view/applicant',
            state: {
                detail: ans,
                obj: obj
            }
        })
    }

    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var k = this.state.job;
        var array = this.state.job.applicant;
        var flag = this.state.sortDate
        array.sort(function (a, b) {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            }
            else {
                return 1;
            }
        });
        k.applicant = array;
        this.setState({
            job: k,
            sortDate: !flag
        });
    }
    sortName() {
        var k = this.state.job;
        var array = this.state.job.applicant;
        var results;
        //console.log(array.length);
        //console.log(this.state.users);
        for (var i = 0; i < array.length; i++) {
            var ans = this.state.users.find(val => val.email == array[i].email);
            console.log(ans);
            if (ans) {
                console.log("gfhk");
                array[i].name = ans.name
            }
        }

        // console.log(array);
        var flag = this.state.sortName
        //  console.log(array[0].name);
        array.sort(function (a, b) {
            // console.log("calling");
            if (a.name != undefined && b.name != undefined) {
                var j = String(a.name);
                var o = String(b.name)
                var result = j.localeCompare(o);

                // console.log(a.name, b.name, result);
                return (1 - flag * 2) * result;
            }
            else {
                // console.log("ewhj");
                return 1;
            }
        });
        for (var i = 0; i < array.length; i++) {
            delete array[i].name;
        }
        //console.log(array[0].name);
        //console.log(array);
        k.applicant = array;
        this.setState({
            job: k,
            sortName: !flag
        });
    }
    sortRating() {
        var k = this.state.job;
        var array = this.state.job.applicant;
        for (var i = 0; i < array.length; i++) {
            var ans = this.state.users.find(val => val.email == array[i].email);
            console.log(ans);
            if (ans) {
                console.log("gfhk");
                array[i].rating = ans.rating
            }
        }
        var flag = this.state.sortRating
        console.log(array[0].rating)
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - (b.rating));
            }
            else {
                return 1;
            }
        });
        for (var i = 0; i < array.length; i++) {
            delete array[i].rating;
        }
        console.log(array[0].rating)
        k.applicant = array;
        this.setState({
            job: k,
            sortRating: !flag
        });
    }
    renderIcon() {

        if (this.state.sortDate) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIcon1() {

        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIcon2() {

        if (this.state.sortRating) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    // componentDidUpdate() {

    //     axios.get("http://localhost:5000/user/").then(res => {

    //         this.setState({
    //             users: res.data
    //         });


    //         //  console.log(this.state.applicants, this.state.positions, this.state.deadline, this.state.id);

    //     }).catch(err => {
    //         alert("Error occur");

    //     })
    // }
    Accept(ind, user) {
        var ans = this.state.users.find(val => val.email == user.email);
        var value = 0;
        for (var i = 0; i < ans.job.length; i++) {
            if (ans.job[i].status == "accepted")
                value++;
        }
        const newvalue = {
            id: this.state.job._id,
            id1: user._id,
            id2: ans._id,
            status: 'accepted',
            email: JSON.parse(localStorage.getItem("currentuser")).email,

        }
        console.log(newvalue);
        console.log("")
        ans = 0;
        for (var i = 0; i < this.state.job.applicant; i++) {
            console.log(this.state.job.applicant[i].status);
            if (this.state.job.applicant[i].status == "accepted")
                ans++;

        }
        console.log(ans)
        console.log(ans, value);
        if (ans < this.state.job.num_positions && !value) {

            axios.all([
                axios.post("http://localhost:5000/user/delete", newvalue),
                axios.post("http://localhost:5000/dashboard/accept", newvalue)
            ]).then((res1, res2) => {
                alert("application accepted");


            }).catch(err => {
                alert("error occured");
            })
            this.hello();
        } else {
            alert("positions Fulls");
        }
        //this.componentDidMount();
        // this.Function1(ind, user);


    }
    hello() {
        const newjob = {
            email: this.state.job._id
        }
        axios.post("http://localhost:5000/dashboard/getjob", newjob).then(res => {
            console.log("adjkw");
            console.log(res.data);
            this.setState({ job: res.data });
            localStorage.setItem("currentjob", JSON.stringify(res.data));
        })
            .catch(err => {
                console.log("you");
            })
        console.log("caller end");
    }
    async Reject(ind, user) {
        const newvalue = {
            id: this.state.job._id,
            id1: user._id,
            status: 'rejected'
        }
        const newjob = {
            email: this.state.job._id
        }
        console.log("wehgkdfj");

        await axios.all([
            axios.post("http://localhost:5000/user/delete", newvalue),
            axios.post("http://localhost:5000/dashboard/accept", newvalue),

        ]).then((res1, res2) => {

            alert("applicant Rejected");




        }).catch(err => {
            alert("error occured");
        })

        console.log("caller");
        this.hello();
        // this.componentDidMount();


    }



    Check(ind, user) {
        return (<TableCell><Button onClick={() => this.Reject(ind, user)}> Reject </Button></TableCell>
        )
    }
    ChekcUser(ind, user) {
        var ans = this.state.users.find(val => val.email == user.email);
        if (ans)
            return (<><TableCell>{ans.name}</TableCell>
                <TableCell>{ans.rating}</TableCell></>)
        else
            return (<><TableCell></TableCell><TableCell></TableCell></>)
    }

    Function1(ind, user) {
        console.log(user.status);
        if (user.status == "accepted") {
            return <TableCell><Button>Accepted</Button></TableCell>
        }
        else {
            return <TableCell><Button onClick={() => this.Accept(ind, user)}>Accept</Button></TableCell>
        }
    }
    Function2(ind, user) {
        console.log(user.status);
        if (user.status == "rejected") {
            return <TableCell><Button>Rejected</Button></TableCell>
        }
        else {
            return <TableCell><Button onClick={() => this.Reject(ind, user)}>Reject</Button></TableCell>
        }
    }
    Function3(ind, user) {
        if (user.status != 'rejected')
            return (<>
                <TableCell>{user.email}</TableCell>
                {
                    this.ChekcUser(ind, user)
                }
                <TableCell>{user.date}</TableCell>
                <TableCell><Button onClick={() => this.ViewProfile(ind, user)}> View</Button></TableCell>

                {
                    this.Function1(ind, user)
                }
                {
                    this.Function2(ind, user)
                }</>)
    }

    render() {
        // console.log(this.state.deadline);
        // console.log("shreyansh");
        // console.log(this.state.job);
        console.log("wjedwek");
        //// console.log(this.state.final.Title);
        //console.log()
        return (
            <div>
                <div>
                    <Grid container>
                        <Grid item xs={12} md={3} lg={3}>
                            {/*}  <List component="nav" aria-label="mailbox folders">
                                <ListItem text>
                                    <h3>Filters</h3>
                                </ListItem>
        </List>*/}
                        </Grid>
                        {/* <Grid item xs={12} md={10} lg={9}>
                            <List component="nav" aria-label="mailbox folders" onChange={this.FuzzySearch1}>
                                <TextField onChange={this.Search}
                                    id="standard-basic"
                                    label="Search"
                                    fullWidth={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment >
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </List>
                        </Grid> */}
                    </Grid>
                    <Grid container>
                        <Grid item xs={1} md={1} lg={1}>
                            <List component="nav" aria-label="mailbox folders">

                                {/*}   <ListItem button >
                                    <form noValidate autoComplete="off">
                                        <label>Salary</label>
                                        <TextField id="standard-basic" label=" Min" fullWidth={true}  />
                                        <TextField id="standard-basic" label=" Max" fullWidth={true}  />
                                        <Button value="submit" >search</Button>
                                    </form>
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.users}
                                        getOptionLabel={(option) => option.Title}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Names" variant="outlined" />}

                                    />
                    </ListItem>*/}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={10} lg={9} justify="space-between">
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Name<Button onClick={this.sortName}>{this.renderIcon1()}</Button></TableCell>
                                            <TableCell>Rating<Button onClick={this.sortRating}>{this.renderIcon2()}</Button></TableCell>
                                            <TableCell>Applied Date<Button onClick={this.sortChange}>{this.renderIcon()}</Button></TableCell>
                                            <TableCell>View full profile</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.job.applicant.map((user, ind) => (

                                            <TableRow key={ind}>
                                                {
                                                    this.Function3(ind, user)
                                                }
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div>
        )
    }
}












