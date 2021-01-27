import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
export default class dashnavbar extends Component {

    constructor(props) {
        super(props);
        this.Logout = this.Logout.bind(this);
    }
    Logout(e) {
        e.preventDefault();
        localStorage.clear();
        console.log("clear");
        window.location.href = "/login";
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/recdashboard" className="navbar-brand">Dashboard</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/recdashboard/profile" className="nav-link">My Profile</Link>
                                {/* <Link className="nav-link" onClick={this.Logout}>Logout</Link> */}
                            </li>
                            <li className="navbar-item">
                                <Link to="/recdashboard/myapplication" className="nav-link">My Application</Link>
                                {/* <Link className="nav-link" onClick={this.Logout}>Logout</Link> */}
                            </li>
                            <li className="navbar-item">
                                {/* <Link to="/dashboard/profile" className="nav-link">My Profile</Link> */}
                                <Link className="nav-link" onClick={this.Logout}>Logout</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}