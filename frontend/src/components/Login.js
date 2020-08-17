import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", redirectToReferrer: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response.data;
        } catch (error) {
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
                </form>
            </div>
        )
    }
}
export default Login;