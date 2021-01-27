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
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        var you = (localStorage.getItem("currentuser"));

        if (you == null) {


        }
        else {
            this.props.history.push({
                pathname: "/dashboard"
            })
        }
    }


    onChangeEmail(event) {
        let email = event.target.value;
        let err = '';
        let errors = this.state.errors;
        let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!emailValid) {
            err = <strong>email address is invalid</strong>;
        }
        errors.email1 = err;
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        let pass = event.target.value;
        let err = '';
        let errors = this.state.errors;
        if (pass.length < 5 || pass.length > 8 || isNaN(pass)) {
            err = <strong>check your password <br></br>
            1. password length must be between 5 and 8
            <br></br>
            2. password must contain digits
            </strong>
        }
        errors.password1 = err;
        this.setState({ password: event.target.value });
    }
    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            usertype: this.state.usertype,

            email: this.state.email,
            password: this.state.password

        }
        console.log(newUser);
        axios.post('http://localhost:5000/user/login', newUser)
            .then(res => {
                console.log(res.data);
                console.log(res.data);
                //  localStorage.setItem("curretuser", JSON.stringify(res.data));
                localStorage.setItem("currentuser", JSON.stringify(res.data));
                console.log(res.data)
                if (res.data.usertype == "applicant") {
                    this.props.history.push({
                        pathname: '/dashboard/',
                        state: newUser
                    });
                } else {
                    this.props.history.push({
                        pathname: '/recdashboard/',
                        state: newUser
                    });
                }
                // res.redirect('http://localhost:3000/users')
            })
            ;

        this.setState({
            usertype: 'applicant',

            email: '',
            password: ''

        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Usertype</label>
                        <select
                            value={this.state.usertype} onChange={this.onChangeUsertype}>
                            <option name="applicant">applicant</option>
                            <option name="recuirtor">recuirtor</option>
                        </select>
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
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>

                    <div style={{ color: "red" }}>
                        {this.state.errors.email1}
                        <br>
                        </br>
                        {
                            this.state.errors.password1
                        }
                    </div>
                </form>
            </div>
        )
    }
}