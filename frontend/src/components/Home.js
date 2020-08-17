import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import {Button} from 'react-bootstrap';

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            isAuthed: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.getMessage = this.getMessage.bind(this)
    }

    async getMessage(){
        try {
            let response = await axiosInstance.get('/hello/');
            const message = response.data.user;
            this.setState({
                message: message,
                isAuthed: true
            });
            return message;
        } catch(error){
            if (error.response.status !== 401)  {
                console.log("Error: ", JSON.stringify(error, null, 4));
                throw error;
            }
        }
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            this.setState({isAuthed: false});
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        const messageData1 = this.getMessage();
    }

    render(){

        const isAuthed = this.state.isAuthed;

        return (
            isAuthed ?
            <div>
                <header className="homeHeader">
                    <span>Hello {this.state.message}</span>
                    <Button className="logoutBtn" variant="light" onClick={this.handleLogout}>Logout</Button>
               </header>
            </div> :
            <div className="home-container">
                <header className="home-header">Welcome</header>
                <Button variant="info" size="lg" href="/signup/">Sign Up</Button>
                <Button variant="outline-info" size="lg" href="/login/">Log In</Button>
            </div>
        );
    }
}

export default Hello;