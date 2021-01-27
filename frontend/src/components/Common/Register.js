import React, { Component } from 'react';
import axios from 'axios';
import handleValidator from 'react-joi-validation';
import reactJoiValidation from 'react-joi-validation';
import { SwitchCamera } from '@material-ui/icons';
import './Register.css'
const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usertype: 'applicant',
            name: '',
            email: '',
            password: '',
            date: null,
            contact: '',
            bio: '',
            education: [

                {
                    institute_name: '',
                    startyear: '',
                    endyear: ''

                }
            ],
            skill: [],
            errors: {
                name1: 'name not be empty',
                email1: 'email not be empty',
                password1: 'password not be empty',
                contact1: 'contact number not be empty',
                bio: '',
                startyear1: '',
                endyear1: ''
            }
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeEducation = this.onChangeEducation(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.addclg = this.addclg.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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

    onChangeUsername(event) {
        let name = event.target.value;
        let err = '';
        let errors = this.state.errors;
        if (name.length == 0) {
            err = <strong>name not be empty</strong>
        }
        else if (/\d/.test(name)) {
            err = <strong>name should not contain digits </strong>;
        }
        errors.name1 = err;

        //  this.setState({ errors.["name1"]: err });
        this.setState({ name: event.target.value });

    }
    onChangeEducation(event) {

    }
    onChangeContact(event) {
        let contact = event.target.value;
        let err = '';
        let errors = this.state.errors;
        // console.log(contact);
        var phoneno = /^\d{10}$/;
        // console.log(contact.length);
        // contact=Number(contact);
        if (contact.length == 0) {
            err = <strong>contact not be empty</strong>
        }
        else {
            if (phoneno.test(contact)) { }
            else {
                //console.log("hello\n");
                err = <strong>contact should contain 10 digits</strong>
            }
        }
        errors.contact1 = err;
        //  console.log(errors.contact1)
        this.setState({ contact: event.target.value });
    }
    onChangeBio(event) {
        var s = event.target.value;
        let err = '';
        s = s.replace(/(^\s*)|(\s*$)/gi, "");
        s = s.replace(/[ ]{2,}/gi, " ");
        s = s.replace(/\n /, "\n");
        var length = s.split(' ').length;
        console.log(length);
        if (length > 250) {
            err = <strong>bio have more than 250 words</strong>
        }
        this.state.errors.bio = err;
        this.setState({ bio: event.target.value });
    }


    onChangeEmail(event) {
        let email = event.target.value;
        let err = '';
        let errors = this.state.errors;
        let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (email.length == 0) {
            err = <strong>email not be empty</strong>
        } else
            if (!emailValid) {
                err = <strong>email address is invalid</strong>;
            }
        errors.email1 = err;

        this.setState({ email: event.target.value });

    }

    createUI() {
        return this.state.skill.map((el, i) =>
            <div key={i}>
                {<input type="text" value={el} onChange={this.handleChange.bind(this, i)} />}
                {this.state.skill.length != 1 && <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />}
            </div>
        )
    }
    handleChange(i, event) {
        let skill = [...this.state.skill];
        // console.log("hiii" + event.target.value);
        skill[i] = event.target.value;

        this.setState({ skill });
    }
    handleInputChange = (index, e) => {
        let err = '';
        //  console.log(e.target.value);
        const { name, value } = e.target;
        const education = [...this.state.education];
        if (name == "startyear") {
            // console.log("checked")
            var a = Number(value);
            //console.log(a);
            //console.log((1800 <= a && 2021 >= a));
            if (!(1800 <= a && 2021 >= a) || !value.length) {
                // console.log("yes");
                err = <strong>invalid start year</strong>
            }
            this.state.errors.startyear1 = err;

        }
        if (name == "endyear") {
            //console.log("checked")
            // console.log(value.length)
            var a = Number(value);
            // console.log(a);


            if (!(1800 <= a && 2021 >= a) || !value.length) {
                //  console.log("yes");
                err = <strong>invalid end year</strong>
            }
            if (value.length == 0) {
                err = <strong></strong>
            }
            this.state.errors.endyear1 = err;

        }
        education[index][name] = value;
        this.setState({ education });
    }
    handleAddRow = () => {
        const item = {
            institute_name: '',
            startyear: '',
            endyear: ''

        }
        this.setState({
            education: [...this.state.education, item]
        });
    }
    handleRemoveRow = (id) => {
        let education = [...this.state.education]
        education.splice(id, 1);
        this.setState({
            education
        });
    }
    addClick() {
        this.setState(prevState => ({ skill: [...prevState.skill, ''] }))
    }
    removeClick(i) {
        let skill = [...this.state.skill];
        skill.splice(i, 1);
        this.setState({ skill });
    }

    // handleSubmit(event) {
    //     // alert('A name was submitted: ' + this.state.skill.join(', '));
    //     event.preventDefault();
    // }
    onChangePassword(event) {
        let pass = event.target.value;
        let err = '';
        let errors = this.state.errors;
        if (pass.length == 0) {
            err = <strong>password not be empty</strong>
        }
        else
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
        //  console.log("tyuioj" + this.state.skill + "yujgdf");
        const newUser = {
            usertype: this.state.usertype,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            date: Date.now(),
            skill: this.state.skill,
            education: this.state.education,
            bio: this.state.bio,
            contact: this.state.contact

        }
        console.log(newUser);
        axios.post('http://localhost:5000/user/register', newUser)
            .then(res => {

                if (res.data == "1")
                    alert("user Exist")
                else {
                    alert("Register successfully");
                    console.log(res.data);
                    // window.location.href = './users';
                    localStorage.setItem("currentuser", JSON.stringify(res.data));
                    localStorage.setItem("currentuser", JSON.stringify(res.data));
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
                }
            }).catch(res => {
                alert("invalid credientals")
            })

        this.setState({
            usertype: 'applicant',
            name: '',
            email: '',
            password: '',
            date: null, contact: '',
            bio: '',
            education: [

                {
                    institute_name: '',
                    startyear: '',
                    endyear: ''

                }
            ],
            skill: []
        });
    }

    render() {
        // console.log("hello\n");
        // for (var i = 0; i < this.state.education.length; i++) {
        //     console.log(this.state.education[i]);
        // }
        if (this.state.usertype == "applicant") {
            return (

                <div className="box">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype </label>
                            <br></br>
                            <select
                                value={this.state.usertype} onChange={this.onChangeUsertype}>
                                <option name="applicant"> applicant </option>
                                <option name="recuirtor">recuirtor </option>
                            </select>
                            {/* <p>{this.state.usertype}</p> */}
                        </div>
                        <div checker={this.state} className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeUsername}
                            />
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
                        <label>Education:</label>
                        <div>
                            {
                                this.state.education.map((x, i) => {
                                    return (
                                        <div className="box">
                                            <input name="institute_name" placeholder="institute_name" value={x.institute_name} onChange={this.handleInputChange.bind(this, i)} />
                                            <input name="startyear" placeholder="startyear" value={x.startyear} onChange={this.handleInputChange.bind(this, i)} />
                                            <input name="endyear" placeholder="endyear" value={x.endyear} onChange={this.handleInputChange.bind(this, i)} />

                                            {this.state.education.length !== 1 && <input type='button' value='remove' onClick={this.handleRemoveRow.bind(this, i)} />}
                                            <div className="btn-box">
                                                {this.state.education.length - 1 === i && <input type='button' value='add more' onClick={this.handleAddRow.bind(this)} style={{ marginLeft: 8 }} />}
                                            </div>

                                        </div>
                                    );
                                })
                            }

                        </div>
                        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.education)}</div> */}
                        <br></br>

                        <div >
                            <label>Skill:</label>
                            {
                                this.createUI()
                            }
                            <br></br>
                            <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                        </div>


                        <br></br><br></br>
                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                        <div style={{ color: "red", }}>
                            <b>
                                {this.state.errors.email1}
                                <br></br>
                                {
                                    this.state.errors.name1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.password1
                                }
                                <br>
                                </br>
                                <br></br>
                                {this.state.errors.startyear1}
                                <br></br>
                                {
                                    this.state.errors.endyear1
                                }


                            </b>
                        </div>
                    </form>
                </div >
            )
        }
        else {
            return (

                <div className="box">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usertype </label>
                            <br></br>
                            <select
                                value={this.state.usertype} onChange={this.onChangeUsertype}>
                                <option name="applicant"> applicant </option>
                                <option name="recuirtor">recuirtor </option>
                            </select>
                        </div>
                        <div checker={this.state} className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeUsername}
                            />
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
                            <label>contact_no: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.contact}
                                onChange={this.onChangeContact}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bio: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.bio}
                                onChange={this.onChangeBio}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                        <div style={{ color: "red", }}>
                            <b>
                                {this.state.errors.email1}
                                <br></br>
                                {
                                    this.state.errors.name1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.password1
                                }
                                <br>
                                </br>
                                {
                                    this.state.errors.contact1
                                }
                                <br></br>
                                {
                                    this.state.errors.bio
                                }
                            </b>
                        </div>
                    </form>
                </div>
            )
        }
    }


}