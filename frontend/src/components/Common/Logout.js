import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usertype: 'applicant',
            email: '',
            password: '',
            errors: {
                email1: '',
                password1: ''
            }

        }
        this.Logout = this.Logout.bind(this);
        this.NO = this.NO.bind(this);

    }
    Logout(e) {
        localStorage.clear();
        this.props.history.push({
            pathname: "/login"
        })
    }



    render() {
        return (
            <div>
                <h3>Are you really want to logout</h3>
                <button value="logout" onChange={this.Logout} > Yes</button>
                <button value="no" onChange={this.NO}>NO</button>

            </div>
        )
    }
}