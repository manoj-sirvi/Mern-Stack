import React, { Component } from 'react';
import axios from 'axios';
import handleValidator from 'react-joi-validation';
import reactJoiValidation from 'react-joi-validation';
import { SwitchCamera } from '@material-ui/icons';
import './Register.css'

export default class Job extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recuiter: JSON.parse(localStorage.getItem("currentuser"))
            

        }
    }

}