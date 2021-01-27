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
            finalarray: [],
            finalarray1: [],
            sortedUsers: [],
            sortName: true,
            button: [],
            sortsalary: true,
            sortduration: true,
            sortrating: true,
            sorttitle: true,
            sortdate: true,
            min: '0',
            max: '10000000',
            checker: [],
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
        this.sortName = this.sortName.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
        this.sortTitle = this.sortTitle.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);

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
        await axios.get("http://localhost:5000/user").then(res => {
            this.state.checker = res.data
        })
        console.log("hekkiwhke");
        await axios.post('http://localhost:5000/dashboard/getspecial', newUser).then
            (
                res => {
                    this.state.users = res.data;
                    this.state.flag = true;

                }
            ).catch(err => {
                alert("some error occured");
            });

        var hello = [];
        this.state.users.map((user, ind) => {
            user.applicant.map((job, id) => {
                if (job.status == 'accepted') {
                    var obj = {
                        Title: user.Title,
                        salary: user.salary,
                        jobtype: user.jobtype,
                        name: job.name,
                        date: job.date,
                        rating: job.rating,
                        id: job.email

                    }
                    hello.push(obj);
                }

            })
        })
        console.log(hello);
        this.setState({ finalarray: hello, finalarray1: hello });

    }
    sortName(ind, user) {

        var array = this.state.finalarray1
        var flag = this.state.sortName

        array.sort(function (a, b) {
            if (a.name != undefined && b.name != undefined) {
                var j = String(a.name);
                var o = String(b.name)
                var result = j.localeCompare(o);

                // console.log(a.name, b.name, result);
                return (1 - flag * 2) * result;
            }
            else
                return 1;
        });
        this.setState({
            finalarray: array,
            sortName: !flag
        })
    }
    sortTitle(ind, user) {

        var array = this.state.finalarray1
        var flag = this.state.sorttitle

        array.sort(function (a, b) {
            console.log(typeof (a.Title));
            if (a.Title != undefined && b.Title != undefined) {
                var str1 = String(a.Title);
                var str2 = String(b.Title)
                // console.log(typeof (h), typeof (j));
                var result = str1.localeCompare(str2);
                return (1 - flag * 2) * (result);
            }
            else
                return 1;
        })
        this.setState({
            finalarray: array,
            sorttitle: !flag
        })
    }
    sortDate() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.finalarray1;
        var flag = this.state.sortdate;
        array.sort(function (a, b) {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            }
            else {
                return 1;
            }
        });
        this.setState({
            finalarray: array,
            sortdate: !flag,
        })
    }
    renderIcon2() {

        if (this.state.sortdate) {
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
    renderIcon() {

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
    renderIcon1() {

        if (this.state.sorttitle) {
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

    async Rate(user, e) {
        console.log(user, e);
        var newUser = {
            id: user._id
            , value: e.target.value
        }
        console.log(newUser)
        await axios.post("http://localhost:5000/user/final", newUser).then(res => {
            alert("succedd");
        }).catch(err => {
            alert("Error occured")
        })
    }



    Function(ind, user) {
        console.log("tyu");
        console.log(user);
        console.log("tyu1");
        var newUser = {
            email: user.id,
            name: user.name
        }
        console.log(newUser);
        var you;
        var ans = this.state.checker.find(val => val.email == user.id);
        console.log(ans);

        if (ans.rating == undefined || ans.rating == 0) {
            return <TableCell><Select labelId="demo-multiple-name-label" id="demo-multiple-name" value="jobtype" onClick={this.Rate.bind(this, ans)}>
                <MenuItem value='1'> first</MenuItem>
                <MenuItem value='2'> second</MenuItem>
                <MenuItem value='3'> third</MenuItem>
                <MenuItem value='4'> fourth</MenuItem>
                <MenuItem value='5'> five</MenuItem>
            </Select></TableCell>
        }
        else {
            return <TableCell>{ans.rating}</TableCell>
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
                                                <TableCell>Title <Button onClick={this.sortTitle}>{this.renderIcon1()}</Button></TableCell>
                                                <TableCell>Applicant_name<Button onClick={this.sortName}>{this.renderIcon()}</Button></TableCell>
                                                <TableCell>Date of joining<Button onClick={this.sortDate}>{this.renderIcon2()}</Button></TableCell>
                                                <TableCell>Salary</TableCell>
                                                <TableCell>JobType</TableCell>


                                                <TableCell>Rate</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.finalarray.map((user, ind) => (

                                                <TableRow key={ind}>
                                                    <TableCell>{user.Title}</TableCell>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.date}</TableCell>
                                                    <TableCell>{user.salary}</TableCell>
                                                    <TableCell>{user.jobtype}</TableCell>
                                                    {
                                                        this.Function(ind, user)
                                                    }

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
