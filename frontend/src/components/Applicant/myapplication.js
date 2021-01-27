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

import { Table } from 'react-bootstrap'

import FuzzySearch from 'fuzzy-search';
import Fuse from 'fuse.js'
import { keys } from '@material-ui/core/styles/createBreakpoints';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            users1: [],
            sortedUsers: [],
            sortName: true,
            button: [],
            sortsalary: true,
            sortduration: true,
            sortrating: true,
            min: '0',
            max: '10000000',
            usersalary: [''],
            userduration: [''],
            userjobtype: [''],
            searchvalue: '',
            Apply: {
                backgroundColor: "#0080ff",
                color: "white",
            },
            Applied: {
                backgroundColor: "#26d926",
                color: "white",
            },
            Full: {
                backgroundColor: "red",
                color: "white",
            },
            Accepted: {
                backgroundColor: "brown",
                color: "white"
            },
            Rejected: {
                backgroundColor: "green",
                color: "white"
            },
            flag: false,
            sum: 0,


        };
        this.Rate = this.Rate.bind(this);

    }

    async componentDidMount() {
        var you = (localStorage.getItem("currentuser"));
        if (you == null) {
            this.props.history.push({
                pathname: "/login"
            })
        }
        var newUser = {
            email: JSON.parse(you).email,
            password: JSON.parse(you).password
        }
        console.log("hekkiwhke");
        await axios.post('http://localhost:5000/user/login', newUser).then
            (
                res => {
                    this.setState({ users: res.data })

                }
            ).catch(err => {
                alert("some error occured");
            });

        axios.get("http://localhost:5000/dashboard/").then(res => {
            this.setState({ flag: true, users1: res.data });
        }).catch(err => {
            alert("error");
        })

    }



    async onSubmit(ind, user) {
        console.log(user._id);
        var date = new Date().toISOString();

        //  console.log(user);
        //console.log(date);
        var email = JSON.parse(localStorage.getItem("currentuser")).email;
        var password = JSON.parse(localStorage.getItem("currentuser")).password;
        var newUser = {
            email: email,
            password: password
        };
        var user1;
        console.log(email, password);
        await axios.post("http://localhost:5000/user/login", newUser).then(res => {

            user1 = res.data;
            //console.log("yuio");
            //console.log(res.data);
        }).catch(err => {
            alert("error ocuured");
        })
        //  console.log("dfghghghj");
        console.log(user1);
        var ans = 0;
        console.log(user1.job.length);
        for (var i = 0; i < user1.job.length; i++) {
            console.log(user1.job[i].status);
            if (user1.job[i].status == "applied") {
                ans++;
            }
        }
        console.log("ans");
        console.log(ans);
        var b = 0;
        for (var v = 0; v < user.applicant.length; v++) {
            if (user.applicant[v].email == email) {
                b = 1
            }
        }


        console.log(date <= user.deadline);
        const newJob = {
            id: user._id,
            Title: user.Title
        }
        if (date <= user.deadline && b == 0 && ans <= 10) {
            this.props.history.push(
                {
                    pathname: "/dashboard/sop",
                    state: newJob
                }
            );
        }
        else {
            alert("you all ready applied or deadline exit");
        }

    };


    Buttoncheck(job, ind) {
        var sta = 'apply'
        for (let index = 0; index < job.applicant.length; index++) {
            if (job.applicant[index].email == JSON.parse(localStorage.getItem("currentuser")).email) {
                sta = job.applicant[index].status

            }
        }
        if (sta == 'apply')
            return (<TableCell><Button style={this.state.Apply} onClick={() => this.onSubmit(ind, job)}>{sta}</Button></TableCell>)
        else {
            if (sta == 'applied') {
                return (<TableCell><Button style={this.state.Applied} >{sta}</Button></TableCell>)
            }
            else {
                if (sta == "accepted") {
                    return (<TableCell><Button style={this.state.Accepted} >{sta}</Button></TableCell>)
                }
                else {
                    if (sta == "rejected") {
                        return (<TableCell><Button style={this.state.Rejected} >{sta}</Button></TableCell>)
                    }
                    else {
                        return (<TableCell><Button style={this.state.Full} >Full</Button></TableCell>)
                    }
                }
            }
        }
    }

    Hello(ind, user) {
        // console.log("jfkerh");
        // var newJob = {
        //     email: user._id
        // }
        // var hy = null;
        // console.log(user)
        // console.log(user.email);
        // console.log(this.state.users1);
        // console.log(this.state.users);
        // console.log(this.state.users._id);
        // console.log(newJob);
        var ans = this.state.users1.find(val => val._id == user.id);
        // axios.post("http://localhost:5000/dashboard/getjob", newJob).then(
        //     res => {
        //         hy = res.data;
        //     }
        // ).catch(err => {
        //     alert("error ocured");
        // })
        // console.log(hy);
        //  console.log(ans);
        if (ans == null) {
            return (
                <>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                </>
            )
        }
        else {
            return (
                <>
                    <TableCell>{ans.name}</TableCell>
                    <TableCell>{ans.salary}</TableCell>

                </>
            )
        }
    }
    async Rate(user, e) {
        // console.log(e, user);
        // console.log(user.target.value);
        console.log(user.id);
        this.state.sum = e.target.value
        var ans = this.state.users1.find(val => val._id == user.id);
        var ans1 = 0;
        for (var i = 0; i < ans.applicant.length; i++) {
            if (ans.applicant[i].status == 'accepted')
                ans1++;

        }
        console.log(ans1);
        //console.log(localStorage.getItem("currentuser")
        if (user.rating == undefined) {
            user.rating = 0;
        }
        var rating = (user.rating) / ans1;
        console.log(rating)
        console.log(ans1, e.target.value);
        var newUser = {
            id: user.id,
            rating: (Number(user.rating) + Number(e.target.value)) / ans1,
            id1: JSON.parse(localStorage.getItem("currentuser"))._id,
            email: JSON.parse(localStorage.getItem("currentuser")).email
        }
        console.log(newUser);
        await axios.all([
            axios.post("http://localhost:5000/dashboard/sum", newUser),
            axios.post("http://localhost:5000/user/sum1", newUser),

        ]).then(res => {
            alert("rating given");
        }).catch(err => {
            console.log("error occured");
        })
    }
    Special(ind, user) {
        console.log(user);
        console.log(user.status, user.Rated);
        if (user.status == 'accepted' && user.Rated == 0) {
            return <TableCell><Select labelId="demo-multiple-name-label" id="demo-multiple-name" value="jobtype" onClick={this.Rate.bind(this, user)}>
                <MenuItem value='1'> first</MenuItem>
                <MenuItem value='2'> second</MenuItem>
                <MenuItem value='3'> third</MenuItem>
                <MenuItem value='4'> fourth</MenuItem>
                <MenuItem value='5'> five</MenuItem>
            </Select></TableCell>
        }
        else {
            return <TableCell>{user.Rated}</TableCell>
        }
    }


    render() {
        console.log(this.state.users)
        // console.log("hello\n");
        // console.log(this.state.deadline);
        // const [startDate, setStartDate] = useState(new Date());
        // console.log(startDate, setStartDate);
        //  var elem = document.getElementById("mybutton1");
        if (this.state.flag) {
            return (
                <div>
                    <div>
                        <Grid container>
                            {/* <Grid item xs={12} md={3} lg={3}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem text>
                                    <h3>Filters</h3>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={1} md={9} lg={9}>
                            <List component="nav" aria-label="mailbox folders" >
                                <TextField 
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
                            <Grid item xs={2} md={2} lg={1}>
                                {/* <List component="nav" aria-label="mailbox folders">

                                <ListItem button >
                                    <form noValidate autoComplete="off">
                                        <label>Salary</label>
                                        <TextField id="standard-basic" label=" Min" fullWidth={true} />
                                        <TextField id="standard-basic" label=" Max" fullWidth={true}  />
                                        <Button value="submit" onClick={this.onSearchSalary}>search</Button>
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
                                </ListItem>
                            </List> */}
                            </Grid>
                            <Grid item xs={1} md={9} lg={9} >
                                <Paper>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Recuitor_name</TableCell>
                                                <TableCell>Salary</TableCell>
                                                <TableCell>Date of joining</TableCell>
                                                <TableCell>Status</TableCell>

                                                <TableCell>Rate</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.users.job.map((user, ind) => (

                                                <TableRow key={ind}>

                                                    <TableCell>{user.Title}</TableCell>
                                                    {
                                                        this.Hello(ind, user)
                                                    }
                                                    <TableCell>{user.date}</TableCell>
                                                    <TableCell>{user.status}</TableCell>

                                                    {
                                                        this.Special(ind, user)
                                                    }
                                                    <div>
                                                        {


                                                        }
                                                    </div>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <div>

                    </div >


                </div>
            );
        }
        else {
            return <p>fetching results.....</p>
        }
    }
}
