import React, { Component } from 'react';
import './Auth.css';
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { isValidEmailAddress } from "../../utils/validators";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.initialFormData = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
      
        this.initalErrors = {
            firstName: false,
            lastName: false,
            email: false,
            password: false,
        };

        this.state = {
            title : '',
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            error: "",
            formData: {...this.initialFormData},
            errors: {...this.initalErrors}
        }        
    }

    handleFieldChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: '' });
    };

    validateInput = (name, value) => {
        const trimmedValue = value.trim();
        if ((name === "email") && value.length !== 0) {
            return isValidEmailAddress(trimmedValue);
        } else if (name === "password" && value.length !== 0) {
            return true;
        }
      return true;
    }


    handleInputChange = (e, {name, value}) => {
      //  this.props.setErrors({});

        const isError = !this.validateInput(name, value);
    
        this.setState((prevState) => {
          let formData = {...prevState.formData};
          formData[name] = value;
    
          const errors = {...prevState.errors};
          errors[name] = isError;
    
          return {formData: formData, errors: errors};
        });
    }

    isFormValid = () => {
        for (let key in this.state.formData) {
            if (this.state.errors.hasOwnProperty(key) && this.state.errors[key]) {
                return false;
            }
            if (this.state.formData.hasOwnProperty(key) && (this.state.formData[key] === "")) {
                return false;
            }
        }
        return true;
    }

    componentDidMount() {
        this.props.setAuthredirectPath("/");
        this.authenticationCheck();
    }


    authenticationCheck = () => {
        const { history } = this.props;
        const token = localStorage.getItem('token');
    
        if (!token) {
          history.replace('/register');
        } else {
            history.replace('/');
        }
    }

    componentDidUpdate () {
        if (this.props.auth.authRedirectPath !== '/') {
            this.props.history.replace('/login');
        }
    }

    
    handleLogin = () => {
        const { firstName, lastName, email, password } = this.state.formData;
        // const { history } = this.props;
        this.props.Register(firstName, lastName, email, password);
        // const token = localStorage.getItem('token');
        // history.replace('/login');
        // if (!token) {
        // } else {
        //     history.replace('/');
        // }
    }

    render() {
        return (
            <div className="container login-container">
                <div className="row card-center">
                    <div className="col-md-6 login-form-1">
                        <h3>Register</h3>
                        <Form onSubmit={this.handleLogin}>
                        <Form.Input label="First Name"
                                        placeholder="First Name"
                                        onChange={this.handleInputChange}
                                        name="firstName"
                                        value={this.state.formData.firstName}
                                        error={this.state.errors.firstName}
                                        type="text"/>
                        <Form.Input label="Last Name"
                                        placeholder="Last Name"
                                        onChange={this.handleInputChange}
                                        name="lastName"
                                        value={this.state.formData.lastName}
                                        error={this.state.errors.lastName}
                                        type="text"/>
                            <Form.Input label="Email"
                                        placeholder="Email"
                                        onChange={this.handleInputChange}
                                        name="email"
                                        value={this.state.formData.email}
                                        error={this.state.errors.email}
                                        type="email"/>
                            <Form.Input label="Password"
                                        placeholder="Password"
                                        onChange={this.handleInputChange}
                                        name="password"
                                        value={this.state.formData.password}
                                        error={this.state.errors.password}
                                        type="password"/>
                            <div className="clearfix">
                                {
                                    this.props.auth.errors.hasOwnProperty('non_field_errors')
                                    ? <span className="text-red float-left">{this.props.auth.errors.non_field_errors}</span>
                                    : ''
                                }
                            </div>
                            <div className="clearfix">
                                <Button type="submit" primary className="btnSubmit"
                                    disabled={!this.isFormValid()}>
                                    Register
                                </Button>
                            </div>
                        </Form>
                        {/* <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your First Name *" value="" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Last Name *" value="" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <div className="form-group text-center">
                            <button className="btnSubmit">Register</button>
                        </div> */}
                        <div className="form-group text-center">
                            <Link className="ForgetPwd" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;