import React, { Component } from "react";
import axiosAPI from "../axiosApi";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {obtainToken, isAuthenticated} from '../authenticationApi'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", redirectToReferrer: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        errors: {}
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await obtainToken (
                this.state.username,
                this.state.password
            );
            if (isAuthenticated()) {
                this.setState({redirectToReferrer: true});
            }
        } catch (error) {
             this.setState({
                errors: error.response.data
            });
            console.log(this.state.errors)
            throw error;
        }
    }
    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/hello/" />
        }
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup size="large">
                        <label>Username</label>
                        <FormControl name="username" autoFocus value={this.state.username} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup size="large">
                        <label>Password</label>
                        <FormControl name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                    </FormGroup>
                    <Button block size="large" type="submit">
                        Login
                    </Button>
                    <label>Need an account?</label>
                    <Button variant="link" type="button" href="/signup/">
                        Sign Up
                    </Button>
                </form>
            </div>
        )
    }
}
export default Login;