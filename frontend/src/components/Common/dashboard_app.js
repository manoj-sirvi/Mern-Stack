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
import "./dahsboard.css"
import { Table } from 'react-bootstrap'
import "./Register.css"
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
            }

        };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sortChangeSalary = this.sortChangeSalary.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.sortChangeDuration = this.sortChangeDuration.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.sortChangeRating = this.sortChangeRating.bind(this);
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.FilterJob = this.FilterJob.bind(this);
        this.FilterDuration = this.FilterDuration.bind(this);
        this.onSearchSalary = this.onSearchSalary.bind(this);
        this.onChangeMin = this.onChangeMin.bind(this);
        this.onChangeMax = this.onChangeMax.bind(this);
        this.Finalfilter = this.Finalfilter.bind(this);
        this.FuzzySearch1 = this.FuzzySearch1.bind(this);
        this.Search = this.Search.bind(this);

    }
    onChangeMax(e) {
        console.log(this.state.max, e.target.value)
        this.setState({ max: e.target.value });
    }
    onChangeMin(e) {
        console.log(this.state.min, e.target.value)
        this.setState({ min: e.target.value });
    }
    FuzzySearch1(e) {
        //console.log("search");
        // console.log(this.state.users1)
        const fuse = new Fuse(this.state.users1, {
            keys:
                ['Title']
            , includeScore: true

        })
        // console.log(e.target.value);
        this.state.searchvalue = e.target.value;
        // console.log(this.state.searchvalue);
        const results = fuse.search(this.state.searchvalue);

        const ans = this.state.searchvalue ? results.map(result => result.item) : this.state.users1;
        this.setState({ users: ans });
        // this.Search();
    }
    Search(e) {
        // console.log("hello");
        const searcher = new FuzzySearch(this.state.users, ['Title'], { caseSensitive: false });
        const result = searcher.search(this.state.searchvalue);
        //this.setState({ users: result });
    }


    componentDidMount() {
        var you = (localStorage.getItem("currentuser"));
        if (you == null) {
            this.props.history.push({
                pathname: "/login"
            })
        }
        axios.get('http://localhost:5000/dashboard/').then
            (
                res => {
                    this.setState({ users: res.data, sortedUsers: res.data, users1: res.data })
                    console.log("rechecking");
                    console.log(this.state.users);
                    this.setState({ userduration: res.data, userjobtype: res.data, usersalary: res.data });
                }
            ).catch(err => {
                alert("some error occured");
            });

    }
    Finalfilter() {
        var arr = [this.state.userduration, this.state.userjobtype, this.state.usersalary];
        console.log(arr);
        var result = arr.shift().filter(function (v) {
            return arr.every(function (a) {
                return a.indexOf(v) !== -1;
            });
        });
        this.setState({ users: result });


    }
    FilterJob(e) {
        var array = this.state.users1;
        console.log(e.target);
        const { name, value } = e.target;

        console.log(value);
        var filt = []
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].jobtype[0], e.target.value[0]);
            if ((array[i].jobtype[0]) === (e.target.value[0])) {
                filt.push(array[i]);
            }
        }
        console.log(filt);
        if (value == "") {
            //console.log("hello");
            this.state.userjobtype = array;
        }
        else {
            this.state.userjobtype = filt;

        };

        this.Finalfilter();

    }
    FilterDuration(event) {
        var array = this.state.users1;
        console.log(event);
        const { name, value } = event.target;
        console.log(name, value);
        var filt = []
        for (var i = 0; i < array.length; i++) {
            if (Number(array[i].duration) < Number(value)) {
                filt.push(array[i]);
            }
        }
        this.state.userduration = filt;
        this.Finalfilter();

    }
    onSearchSalary(e) {
        //  c//onsole.log(value, name);
        var array = this.state.users1;
        //  const { value } = e.target.value;
        console.log("hello");
        var filt = [];
        console.log(Number(this.state.min), Number(this.state.max));
        if (this.state.min.length == 0) {
            this.state.min = 0;
        }
        if (this.state.max.length == 0) {
            this.state.max = 1000000;
        }
        for (var i = 0; i < array.length; i++) {
            console.log()
            if (Number(this.state.min) <= Number(array[i].salary) && Number(array[i].salary) <= Number(this.state.max)) {
                filt.push(array[i]);
            }
        }
        this.state.usersalary = filt;

        this.Finalfilter();


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
        var ans1 = 0;
        console.log(user1.job.length);
        for (var i = 0; i < user1.job.length; i++) {
            // console.log(user1.job[i].status);
            if (user1.job[i].status === "applied") {
                ans++;
            }
            if (user1.job[i].status === "accepted") {
                ans1++;
            }

        }
        console.log("ans");
        console.log(ans);
        var b = 0;
        var p = "applied"
        console.log(user.applicant.length);
        for (var v = 0; v < user.applicant.length; v++) {
            if (user.applicant[v].email == email) {
                b = 1
            }
            console.log(typeof (user.applicant[v].status));

        }


        console.log(date <= user.deadline);
        const newJob = {
            id: user._id,
            Title: user.Title
        }
        console.log(ans, ans1, user.num_applications, user.num_positions);
        if (date <= user.deadline && b == 0 && ans <= 10 && ans1 == 0 && user.num_positions > ans1 && ans < user.num_applications) {
            this.props.history.push(
                {
                    pathname: "/dashboard/sop",
                    state: newJob
                }
            );
        }

        else {
            console.log("enter")
            if (date > user.deadline) {
                alert("deadline exit");
            }
            else {
                if (b != 0) {
                    alert("you all ready apply")
                }
                else {
                    if (ans > 10) {
                        alert("you already applied at 10 jobs")
                    }
                    else {
                        alert("seats full");
                    }
                }
            }
        }

    };
    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.users;
        var flag = this.state.sortName;
        array.sort(function (a, b) {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            }
            else {
                return 1;
            }
        });
        this.setState({
            users: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangeSalary() {
        var array = this.state.users;
        var flag = this.state.sortsalary;
        array.sort(function (a, b) {
            if (a.salary != undefined && b.salary != undefined) {
                return (1 - flag * 2) * (a.salary - b.salary)
            }
            else {
                return 1;
            }
        });
        this.setState({
            users: array,
            sortsalary: !this.state.sortsalary
        });
    }
    sortChangeDuration() {
        var array = this.state.users;
        var flag = this.state.sortduration;
        array.sort(function (a, b) {
            if (a.duration != undefined && b.duration != undefined) {
                return (1 - flag * 2) * (a.duration - b.duration)
            }
            else {
                return 1;
            }
        });
        this.setState({
            users: array,
            sortduration: !this.state.sortduration
        });

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
        if (this.state.sortsalary) {
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
        if (this.state.sortduration) {
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
    renderIcon3() {
        if (this.state.sortrating) {
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
    sortChangeRating() {
        var array = this.state.users;
        var flag = this.state.sortrating;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating)
            }
            else {
                return 1;
            }
        });
        this.setState({
            users: array,
            sortrating: !this.state.sortrating
        });

    }
    Buttoncheck(job, ind) {
        var sta = 'apply'
        var ty;
        var ans = 0, ans2 = 0;
        for (let index = 0; index < job.applicant.length; index++) {
            if (job.applicant[index].email == JSON.parse(localStorage.getItem("currentuser")).email) {
                sta = job.applicant[index].status
                if (job.applicant[index].status == "accepted") {
                    ans++;
                }
                if (job.applicant[index].status == "applied") {
                    ans2++;
                }



            }
        }
        if (ans == job.num_positions || ans2 == job.num_applications) {
            sta = "full"
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




    render() {
        // console.log("hello\n");
        // console.log(this.state.deadline);
        // const [startDate, setStartDate] = useState(new Date());
        // console.log(startDate, setStartDate);
        //  var elem = document.getElementById("mybutton1");
        return (
            <div>
                <div>
                    <Grid container>
                        <Grid item xs={12} md={3} lg={3}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem text>
                                    <h3>Filters</h3>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={1} md={9} lg={9}>
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
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} md={3} lg={3}>
                            <List component="nav" aria-label="mailbox folders">

                                <ListItem button >
                                    <form noValidate autoComplete="off">
                                        <label>Salary</label>
                                        <TextField id="standard-basic" label=" Min" fullWidth={true} onChange={this.onChangeMin} />
                                        <TextField id="standard-basic" label=" Max" fullWidth={true} onChange={this.onChangeMax} />
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
                            </List>
                        </Grid>
                        <Grid item xs={1} md={9} lg={9} >
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Title</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Dealine</TableCell>
                                            <TableCell><Button onClick={this.sortChangeSalary}>{this.renderIcon1()}</Button>salary</TableCell>
                                            <TableCell><Select labelId="demo-multiple-name-label" id="demo-multiple-name" value="jobtype" onClick={this.FilterJob}>
                                                <MenuItem value="">
                                                    All
                                                </MenuItem>
                                                <MenuItem value="Part-time">part-time</MenuItem>
                                                <MenuItem value="Full-time">full-time</MenuItem>
                                                <MenuItem value="work from home">work from home</MenuItem>

                                            </Select>JobType</TableCell>
                                            <TableCell><Button onClick={this.sortChangeRating}>{this.renderIcon3()}</Button>Rating</TableCell>
                                            <TableCell>
                                                <Select labelId="demo-multiple-name-label" id="demo-multiple-name" value="duration" onClick={this.FilterDuration}>
                                                    <MenuItem value="7">
                                                        seven
                                                </MenuItem>
                                                    <MenuItem value="6">six</MenuItem>
                                                    <MenuItem value="5">five</MenuItem>
                                                    <MenuItem value="4">four</MenuItem>
                                                    <MenuItem value="3">three</MenuItem>
                                                    <MenuItem value="2">two</MenuItem>
                                                    <MenuItem value="1">one</MenuItem>

                                                </Select>Duration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.users.map((user, ind) => (

                                            <TableRow key={ind}>

                                                <TableCell>{user.Title}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.deadline}</TableCell>
                                                <TableCell>{user.salary}</TableCell>
                                                <TableCell>{user.jobtype}</TableCell>
                                                <TableCell>{user.rating}</TableCell>
                                                <TableCell>{user.duration}</TableCell>

                                                {
                                                    this.Buttoncheck(user, ind)
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
}

// function Fun(this.state) {
//     const createjob = this.state.createjob;
//     if (createjob) {
//         return (
//             <div className="box">
//                 <form onSubmit={this.state.onSubmit}>
//                     <div className="form-group">
//                         <label>Title:</label>
//                         <input type="text" className="form-control" value={this.state.job.Title} onChange={Home.onTitle(this.state)} />
//                         <div className="form-group">
//                             <label>Title:</label>
//                             <input type="text" className="form-control" value={this.state.job.Title} />

//                         </div>
//                     </div>
//                     <div className="forn-group">
//                         <label>num_applications:</label>
//                         <input type="text" className="form-control" value={this.state.job.num_applications} />

//                     </div>
//                     <div className="form-group">
//                         <label>num_positions:</label>
//                         <input type="text" className="form-control" value={this.state.job.num_positions} />

//                     </div>
//                     <div className="form-group">
//                         <label>Deadline:</label>
//                         <input className="form-control" type="text" value={this.state.job.deadline} />

//                     </div>
//                     <div className="form-group">
//                         <label>Language:</label>
//                         <input className="form-control" type="text" value={this.state.job.language} />

//                     </div>
//                     <div className="form-group">
//                         <label>JobType:</label>
//                         <input className="form-control" type="text" value={this.state.job.jobtype} />

//                     </div>
//                     <div className="form-group">
//                         <label>Duration:</label>
//                         <input className="form-control" type="text" value={this.state.job.duration} />

//                     </div>
//                     <div className="form-group">
//                         <label>Salary:</label>
//                         <input className="form-control" type="text" value={this.state.job.salary} />

//                     </div>
//                     <div className="form-group">
//                         <label>rating:</label>
//                         <input className="form-control" type="text" value={this.state.job.rating} />

//                     </div>

//                 </form>
//             </div>
//         )
//     }
//     else {
//         return <div></div>
//     }
// }