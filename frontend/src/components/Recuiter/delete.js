import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns'
import es from 'date-fns/locale/es';
export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applicants: ''
            , positions: '',
            deadline: new Date().toISOString(),
            final: [], id: '', v: ''
        }
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        //this.onChangeUsertype = this.onChangeUsertype.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeApplication = this.onChangeApplication.bind(this);
        this.onChangeDeadLine = this.onChangeDeadLine.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
    }
    componentDidMount() {

        //  console.log(this.state.applicants, this.state.positions, this.state.deadline, this.state.id);



    }
   





    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            applicants: this.state.applicants,
            positions: this.state.positions,
            deadline: this.state.deadline,
            id: this.state.id

        }
        console.log(newUser);
        axios.post('http://localhost:5000/dashboard/updatejob', newUser)
            .then(res => {
                console.log(res.data);
                console.log(res.data);
                alert("update successfully")
                this.props.history.push({
                    pathname: '/recdashboard/',
                    data: newUser
                });
            }
                // res.redirect('http://localhost:3000/users')
            ).catch(err => {
                alert("error occured");
            })
            ;

        this.setState({
            usertype: 'applicant',

            email: '',
            password: ''

        });
    }

    render() {
        return <div></div>
    }
}