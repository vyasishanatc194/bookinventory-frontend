import React, { Component } from 'react';
import './Auth.css';
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { isValidEmailAddress } from "../../utils/validators";
class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.initialFormData = {
            email: "",
            password: "",
        };
      
        this.initalErrors = {
            email: false,
            password: false,
        };

        this.state = {
            email: "",
            password: "",
            error: "",
            formData: {...this.initialFormData},
            errors: {...this.initalErrors}
        }        
    }

    componentDidMount() {
        this.props.setAuthredirectPath("/");
        this.authenticationCheck();
    }

    authenticationCheck = () => {
        const { history } = this.props;
        const token = localStorage.getItem('token');
    
        if (!token) {
          history.replace('/login');
        } else {
            history.replace('/');
        }
    }

    handleFieldChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: '' });
    };

    componentDidUpdate () {
        if (this.props.isAuthenticated && this.props.auth.authRedirectPath !== '/') {
            this.props.history.replace('/dashboard');
        }
    }

    handleLogin = () => {
        this.props.Login(this.state.formData.email, this.state.formData.password)
        
    }

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
        this.props.setErrors({});

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

    render() {
        console.log(this.props.auth)
        return (
            <div className="container login-container">
                <div className="row card-center">
                    <div className="col-md-6 login-form-1">
                        <h3>Login</h3>
                        
                        <Form onSubmit={this.handleLogin}>
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
                                    Login
                                </Button>
                            </div>
                        </Form>
                        <div className="form-group text-center">
                            <Link className="ForgetPwd" to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;