import React, { Component } from "react";
import axiosAPI from "../axiosApi";
import { Button, Navbar } from 'react-bootstrap';
import { isAuthenticated, logout } from '../authenticationApi'
import NewReport from "./NewReport";
import SubmittedReports from "./SubmittedReports";
import moment from 'moment';
import { Redirect } from "react-router-dom";

function getDefaultState() {
    return {
        name: "",
        isAuthed: isAuthenticated(),
        newReport: false,
        errors: {},
        inputs: {
            "Income": ["input-0"],
            "Expenditure": ["input-0"],
            "Debt": ["input-0"]
        },
        submittedReports: []
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = getDefaultState();
    }

    handleLogout = () => {
        try {
           logout();
           this.setState({isAuthed: false});
        } catch (error) {
            throw error;
        }
    }

    getSubmittedReports = async () => {
        const response = await axiosAPI.get('reports/');
        this.setState({submittedReports: response.data});
    }

    submitReport = (event) => {
        event.preventDefault();
        let errors = {};
        let postData = {"items": []};
        let items = {};
        const data = new FormData(event.target);
        if (data.get("month") === "") {
            errors["month"] = "Please select a month";
        } else {
            postData["month"] = moment("01/" + data.get("month")).format('YYYY-MM-DD');
        }
        for (var [key, value] of data.entries()) {
            if (key !== 'month') {
                if (value !== "") {
                    let keyData = key.split('-');
                    let itemType = keyData[0];
                    let valueType = keyData.[1];
                    let itemIndex = keyData[3];

                    let itemKey = `${itemType}-${itemIndex}`;
                    let altValueType = valueType == 'description' ? 'amount' : 'description';
                    if (data.get(`${itemType}-${altValueType}-input-${itemIndex}`) === "") {
                        errors[`${itemType}-${altValueType}-input-${itemIndex}`] = `Please fill the ${valueType}`;
                    } else if (valueType === 'amount' && isNaN(value)) {
                        errors[key] = "Amount must be a number";
                    } else {
                        if (itemKey in items) {
                            items[itemKey][valueType] = value;
                        } else {
                            items[itemKey] = {'item_type': itemType};
                            items[itemKey][valueType] = value
                        }
                    }
                }
            }
        }

        if (Object.keys(errors).length === 0) {
            Object.keys(items).forEach(function(key) {
                postData["items"].push(items[key]);
            });
            this.postReportData(postData);
        } else {
            this.setState({errors: errors});
        }
    }

    postReportData = async (postData) => {
        try {
            const response = await axiosAPI.post('reports/create/', postData);
            if (response.status === 201) {
                this.getSubmittedReports();
                this.setState({
                    inputs: {
                        "Income": ["input-0"],
                        "Expenditure": ["input-0"],
                        "Debt": ["input-0"]
                    },
                    newReport: false,
                    errors: {}
                });
                document.getElementById("report-form").reset();
            } else if (response.status === 400) {
                this.setState({errors: response.errors});
            }
        } catch(error) {
            const status = error.response.status;
            if (status === 400) {
                 this.setState({
                    errors: error.response.data
                });
            } else {
                throw error;
            }
        }
    }

    addItem = (sectionType) => {
        var inputs = this.state.inputs;
        var newInput = `input-${inputs[sectionType].length}`;
        inputs[sectionType] = [ ...inputs[sectionType], newInput ];
        this.setState({
            inputs: inputs,
        });
    }

    removeItem = (input, sectionType) => {
        var inputs = this.state.inputs;
        const index = inputs[sectionType].indexOf(input);
        if (index > -1) {
            inputs[sectionType].splice(index, 1);
        }
        this.setState({
            inputs: inputs,
        });
    }

    newReport = () => {
        this.setState({newReport: true});
    }

    discardReport = () => {
        this.setState({
            newReport: false,
            inputs: {
                "Income": ["input-0"],
                "Expenditure": ["input-0"],
                "Debt": ["input-0"]
            },
        });
    }

    getUserName = async () => {
        const response = await axiosAPI.get('user/name');
        this.setState({name: response.data["name"]});
    }

    componentDidMount = () => {
        this.getSubmittedReports();
        this.getUserName();
    }

    render(){

        const { isAuthed, name, submittedReports, newReport, errors, inputs } = this.state;

        return (
            isAuthed ?
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Text>
                            HELLO {name.toUpperCase()}
                        </Navbar.Text>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            <a href="#" onClick={this.handleLogout}>LOG OUT</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>


                    <div className="Home__container">
                        <Button variant="light" className={
                            newReport ? "hidden" : "visible"
                        } onClick={this.newReport}>New Report</Button>
                    <NewReport
                        removeItem={this.removeItem}
                        discardReport={this.discardReport}
                        inputs={inputs} addItem={this.addItem}
                        submitReport={this.submitReport}
                        errors={errors}
                        newReport={newReport}/>
                    <header className="Home__subheader">Submitted Reports</header>
                    <SubmittedReports submittedReports={submittedReports}/>
                    </div>
                </div> :
                <Redirect to="/login"/>
        );
    }
}

export default Home;