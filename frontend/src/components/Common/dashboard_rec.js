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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from 'react-datepicker';
import "./dahsboard.css"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            jobs: [],
            sortjobs: [],
            sorttype: true,
            createjob: false,
            buttontype: "createjob",

            email: JSON.parse(localStorage.getItem("currentuser")).email,
            Title: '',
            num_applications: '',
            num_positions: '',
            date: 'null',
            deadline: new Date(),
            language: [''],
            jobtype: 'Full-time',
            duration: '',
            salary: '',
            rating: '0',
            users: [],



        }
        this.createJob = this.createJob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTitle = this.onTitle.bind(this);
        this.onChangeJobType = this.onChangeJobType.bind(this);
        this.onChangeDeadLine = this.onChangeDeadLine.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeApplication = this.onChangeApplication.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangePosotion = this.onChangePosotion.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.EditJob = this.EditJob.bind(this);
        this.DeleteJob = this.DeleteJob.bind(this);
        this.ViewJob = this.ViewJob.bind(this);
    }
    EditJob(ind, user) {
        console.log("checking for edit");
        console.log(user._id);
        this.props.history.push({
            pathname: '/recdashboard/edit',
            state: user._id
        })
    }

    ViewJob(ind, user) {
        localStorage.setItem("currentjob", JSON.stringify(user));
        console.log(user);
        this.props.history.push({
            pathname: "/recdashboard/view"
        })
    }
    DeleteJob(ind, user) {
        const newvalue = {
            id: user._id,
            status: 'rejected'
        }
        console.log("error");
        axios.all([
            axios.post("http://localhost:5000/dashboard/delete", newvalue),
            axios.post("http://localhost:5000/user/delete", newvalue)
        ]).then((res1, res2) => {
            console.log(res1, res2)
            alert("deleted successfully");
            window.location.href = "/recdashboard";
            console.log("erfuger");
        }).catch(err => {
            console.log(err);
            alert("some error occur");
            window.location.href = "/recdashboard";
        })



    }

    componentDidMount() {
        var you = localStorage.getItem("currentuser");
        if (you == null) {
            this.props.history.push({
                pathname: "/login"
            });
        }
        you = JSON.parse(you).email;
        console.log(you);
        var email1 = {
            email: you
        }
        axios.post("http://localhost:5000/dashboard/getspecial", email1).then(res => {
            this.setState({ users: res.data });
        }
        ).catch(err => {
            alert("Error occur");
        })

    }
    createJob(event) {
        const { name, value } = event.target;
        console.log(value);
        if (value == "createjob") {
            this.state.buttontype = "cancel job"
            this.setState({ createjob: true });
        }
        else {
            this.state.buttontype = "createjob"
            this.setState({ createjob: false });
        }

    }
    onTitle(event) {
        const { value, name } = event.target;
        //console.log(name, value);
        this.setState({ Title: value });
        //this.job.Title = value;

    }
    onChangeJobType(e) {
        this.setState({ jobtype: e.target.value });
    }

    onChangeDeadLine(date) {
        // console.log(e.target.value);
        console.log(date);
        this.setState({ deadline: date });
    }

    onSubmit(event) {
        event.preventDefault();

        const Job = {
            email: JSON.parse(localStorage.getItem("currentuser")).email,
            name: JSON.parse(localStorage.getItem("currentuser")).name,
            Title: this.state.Title,
            num_applications: this.state.num_applications,
            num_positions: this.state.num_positions,
            date: new Date(),
            deadline: this.state.deadline,
            language: this.state.language,
            jobtype: this.state.jobtype,
            duration: this.state.duration,
            salary: this.state.salary,
            rating: this.state.rating

        }
        console.log(Job);
        var date = new Date().toISOString();
        console.log(this.state.deadline >= date);
        console.log(Number(this.state.num_applications) >= Number(this.state.num_positions))
        if (Number(this.state.num_applications) >= Number(this.state.num_positions) && new Date(this.state.deadline) >= new Date(date)) {
            axios.post("http://localhost:5000/dashboard/createjob", Job).then(
                res => {
                    alert("Job created");
                    console.log("success");
                    window.location.href = "/recdashboard";
                }
            ).catch(err => {
                alert(" credientals")
            });
        } else {
            alert("invalid  credientals");
        }



    }

    createUI() {
        return this.state.language.map((el, i) =>
            <div key={i}>
                <input type="text" value={el} onChange={this.onChangeLanguage.bind(this, i)} />
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }
    onChangeLanguage(i, e) {
        let language = [...this.state.language];
        language[i] = e.target.value;
        this.setState({ language });
    }
    addClick() {
        this.setState(prevState => ({ language: [...prevState.language, ''] }))
    }
    removeClick(i) {
        let language = [...this.state.language];
        language.splice(i, 1);
        this.setState({ language });
    }
    onChangeDuration(e) {
        this.setState({ duration: e.target.value });
    }
    onChangeSalary(e) {
        this.setState({ salary: e.target.value });
    }
    onChangeApplication(e) {
        this.setState({ num_applications: e.target.value });
    }
    onChangePosotion(e) {
        this.setState({ num_positions: e.target.value });
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
                                            <TableCell>Title</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Dealine</TableCell>
                                            <TableCell>salary</TableCell>
                                            <TableCell>JobType</TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell>
                                                Duration</TableCell>
                                            <TableCell>EditJob</TableCell>
                                            <TableCell>DeleteJob</TableCell>
                                            <TableCell>ViewJob</TableCell>
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
                                                <TableCell className="operation"> <Button onClick={() => this.EditJob(ind, user)}>Edit </Button> </TableCell>
                                                <TableCell className="operation"><Button onClick={() => { this.DeleteJob(ind, user) }}>DELETE</Button> </TableCell>
                                                <TableCell className="operation"><Button onClick={() => this.ViewJob(ind, user)}>View </Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <br></br><br></br><br></br><br></br><br></br>
                <div>
                    {
                        //console.log(elem.value)
                    }<div className="text-center">
                        <input onClick={this.createJob} className="text-center" type="button" value={this.state.buttontype} id="mybutton1" />
                    </div> {
                        //console.log(this.state.createjob)
                    }
                    < div > {

                        //console.log("ktutu")




                        (() => {
                            console.log(this.state.createjob)
                            if (this.state.createjob) {
                                return (
                                    <div className="box">
                                        <form onSubmit={this.onSubmit}>

                                            <div className="form-group">
                                                <label>Title:</label>
                                                <input type="text" className="form-control" value={this.state.Title} onChange={this.onTitle} />

                                            </div>

                                            <div className="form-group">
                                                <label>num_applications:</label>
                                                <input type="text" className="form-control" value={this.state.num_applications} onChange={this.onChangeApplication} />

                                            </div>
                                            <div className="form-group">
                                                <label>num_positions:</label>
                                                <input type="text" className="form-control" value={this.state.num_positions} onChange={this.onChangePosotion} />

                                            </div>
                                            <div className="form-group">
                                                <label>Deadline:</label>
                                                <DatePicker
                                                    selected={this.state.deadline}
                                                    onChange={this.onChangeDeadLine}
                                                    showTimeSelect
                                                    timeFormat="HH:mm:ss"
                                                    timeIntervals={20}
                                                    timeCaption="time"
                                                    dateFormat="dd/MM/yyyy hh:mm:ss aa"
                                                />
                                                <br></br>
                                                {/* <button className="btn btn-primary">show Date</button> */}

                                            </div>
                                            <div className="form-group">
                                                <label>Language:</label>
                                                {
                                                    this.createUI()
                                                }
                                                <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                                            </div>
                                            <div className="form-group">
                                                <label>JobType:</label>
                                                <select value={this.state.jobtype} onChange={this.onChangeJobType}>
                                                    <option name="full-time"> Full-time</option>
                                                    <option name="part-time"> Part-time</option>
                                                    <option name="work at home">work at home</option>

                                                </select>

                                            </div>
                                            <div className="form-group">
                                                <label>Duration:</label>
                                                <input className="form-control" type="text" value={this.state.duration} onChange={this.onChangeDuration} />

                                            </div>
                                            <div className="form-group">
                                                <label>Salary:</label>
                                                <input className="form-control" type="text" value={this.state.salary} onChange={this.onChangeSalary} />

                                            </div>
                                            <br></br>
                                            <div className="form-group">
                                                <label>rating:</label>
                                                <input className="form-control" type="text" value={this.state.rating} />

                                            </div>
                                            <div className="form-group" className="text-center">
                                                <input type="submit" value="submit" className="btn btn-primary" />
                                            </div>

                                        </form>
                                    </div>
                                )
                            }
                        })()

                    }
                    </div>
                </div>
            </div >
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