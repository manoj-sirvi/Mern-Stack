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
        console.log(this.state.deadline);
        var ty = this.props.location.state;

        console.log(ty);
        var hu = {
            email: ty
        }
        console.log(ty);

        axios.post("http://localhost:5000/dashboard/getjob", hu).then(res => {
            console.log(res.data);

            console.log(res.data.num_applications);
            this.setState({
                applicants: res.data.num_applications,
                positions: res.data.num_positions,
                deadline: res.data.deadline,
                id: res.data._id,
            });


            //  console.log(this.state.applicants, this.state.positions, this.state.deadline, this.state.id);

        }).catch(err => {
            alert("Error occur");

        })

    }
    onChangeApplication(e) {
        this.setState({ applicants: e.target.value })
    }
    onChangeDeadLine(date) {
        console.log(date);
        this.setState({ deadline: date.toISOString() })

    }
    onChangePosition(e) {
        this.setState({ positions: e.target.value })

    }





    async onSubmit(e) {
        e.preventDefault();

        const newUser = {
            applicants: this.state.applicants,
            positions: this.state.positions,
            deadline: this.state.deadline,
            id: this.state.id

        }
        console.log(this.state.id);
        var ans;
        var value = {
            email: this.state.id
        }
        await axios.post("http://localhost:5000/dashboard/getjob", value).then(res => {
            ans = res.data
        });
        var a1 = 0, a2 = 0;
        for (var i = 0; i < ans.applicant.length; i++) {
            if (ans.applicant[i].status == 'applied') {
                a1++;
            }
            if (ans.applicant[i].status == 'accepted') {
                a2++;
            }
        }
        var date = new Date().toISOString();
        console.log(this.state.deadline >= date);
        console.log(this.state.num_positions >= a2, this.state.num_applications >= a1);
        if (Number(this.state.applicants) >= Number(this.state.positions) && this.state.deadline >= date && Number(this.state.positions) >= a2 && Number(this.state.applicants) >= a1) {


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
        else {
            alert("invalid credientals")
        }
    }

    render() {
        console.log(this.state.deadline);
        //// console.log(this.state.final.Title);
        console.log()
        return (
            <div>
                <div className="box">
                    <form onSubmit={this.onSubmit}>



                        <div className="form-group">
                            <label>num_applications:</label>
                            <input type="text" className="form-control" value={this.state.applicants} onChange={this.onChangeApplication} />

                        </div>
                        <div className="form-group">
                            <label>num_positions:</label>
                            <input type="text" className="form-control" value={this.state.positions} onChange={this.onChangePosition} />

                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <DatePicker
                                selected={parseISO(this.state.deadline)}
                                onChange={this.onChangeDeadLine}
                                showTimeSelect
                                timeFormat="HH:mm:ss"
                                timeIntervals={20}
                                timeCaption="time"

                                dateFormat="dd/MM/yyyy hh:mm:ss aa "
                            // locale="es"
                            />
                            <br></br>
                            {/* <button className="btn btn-primary">show Date</button> */}

                        </div>

                        <div className="form-group" className="text-center">
                            <input type="submit" value="submit" className="btn btn-primary" />
                        </div>

                    </form>
                </div>

            </div>
        )
    }
}