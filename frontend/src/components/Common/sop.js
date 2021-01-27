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
            sop: '',
            email: JSON.parse(localStorage.getItem("currentuser")).email,
            name: JSON.parse(localStorage.getItem("currentuser")).name,
            id: '',
            Title: '',
            id1: '',
            status: 'apply',
            value: ''
        };


        this.onChangeSop = this.onChangeSop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({ value: this.props.location.state });
    }

    onChangeSop(e) {
        this.setState({ sop: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.value)
        //console.log(this.state.id);
        const newUser = {
            sop: this.state.sop,
            email: this.state.email,
            id: this.state.value.id,
            name: this.state.name

        }
        const newJob = {
            email: this.state.email,
            Title: this.state.value.Title,
            status: 'apply',
            id: this.state.value.id
        }
        console.log(newUser, newJob);
        axios.all([
            axios.post("http://localhost:5000/dashboard/update", newUser),
            axios.post('http://localhost:5000/user/addjob', newJob)

        ]).then(
            (res, res1) => {
                alert("Apply successfully")
                this.props.history.push({
                    pathname: "/dashboard"

                })
            }
        ).catch(err => {
            alert("not applied")
            this.props.history.push({
                pathname: "/dashboard"

            })
        })

        console.log("hello\n");
    }
    render() {
        // console.log("hello\n");
        // console.log(this.state.deadline);
        // const [startDate, setStartDate] = useState(new Date());
        // console.log(startDate, setStartDate);
        //  var elem = document.getElementById("mybutton1");
        return (
            <div>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group" >
                        <label>Sop:</label>
                        <textarea type="text" className="form-control" value={this.state.sop} onChange={this.onChangeSop} rows="10" >
                            Write your sop   </textarea>
                    </div>
                    <div className="form-control" className="text-center">
                        <input type="submit" value="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
