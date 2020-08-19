import React, { Component } from "react";
import axiosAPI from "../axiosApi";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { obtainToken, isAuthenticated } from '../authenticationApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    hasError = (key) => {
        return key in this.state.errors;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await obtainToken (
                this.state.username,
                this.state.password
            );
            if (isAuthenticated()) {
                this.props.history.push('/');
            }
        } catch (error) {
            const status = error.response.status;
            if (status === 400) {
                 this.setState({
                    errors: error.response.data
                });
            } else if (status === 401) {
                 this.setState({
                    errors: {
                        "username": "Incorrect username or password",
                        "password": "Incorrect username or password",
                    }
                });
            } else {
                throw error;
            }
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="Login">
                <div className="Login__logo_container">
                    <img className="Login__logo" src="../../static/images/main_logo.png"/>
                </div>
                <header className="Login__header">LOG IN</header>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup size="large">
                        <label>Username</label>
                        <FormControl name="username" autoFocus value={this.state.username} onChange={this.handleChange}
                                className={
                                    this.hasError("username") ? "form-control is-invalid": "form-control"
                                }/>
                            <div className={this.hasError("username") ? "invalid-feedback" : "hidden"}>
                                {this.hasError("username") ? errors.username : '' }
                            </div>
                    </FormGroup>
                    <FormGroup size="large">
                        <label>Password</label>
                        <FormControl name="password" value={this.state.password} onChange={this.handleChange} type="password"
                                className={
                                    this.hasError("password") ? "form-control is-invalid": "form-control"
                                }/>
                            <div className={this.hasError("password") ? "invalid-feedback" : "hidden"}>
                                {this.hasError("password") ? errors.password : '' }
                            </div>
                    </FormGroup>
                    <Button block size="large" type="submit">
                        Login
                    </Button>
                    <div className="form_footer">
                        <label>Need an account?</label>
                        <Button variant="link" type="button" href="/signup/">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;