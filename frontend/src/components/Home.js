import React, { Component } from "react";
import axiosAPI from "../axiosApi";
import {Button} from 'react-bootstrap';
import {isAuthenticated, logout} from '../authenticationApi'
import Report from "./Report";
import SubmittedReports from "./SubmittedReports";
import moment from 'moment';

const defaultInputs = {
    "Income": ["input-0"],
    "Expenditure": ["input-0"],
    "Debt": ["input-0"]
}

function getDefaultState() {
    return {
        message: "",
        isAuthed: isAuthenticated(),
        newReport: false,
        errors: {},
        inputs: defaultInputs,
        submittedReports: []
    }
}

class Hello extends Component {

    constructor(props) {
        super(props);
        this.state = getDefaultState();
        this.handleLogout = this.handleLogout.bind(this);
        this.addItem = this.addItem.bind(this);
        this.submitReport = this.submitReport.bind(this);
        this.newReport = this.newReport.bind(this);
        this.discardReport = this.discardReport.bind(this);
    }

    handleLogout() {
        try {
           logout();
           this.setState({isAuthed: false});
        } catch (error) {
            throw error;
        }
    }

    async getSubmittedReports() {
        const response = await axiosAPI.get('reports/');
        this.setState({submittedReports: response.data});
    }

    submitReport(event) {
        event.preventDefault();
        let errors = {};
        let postData = {"items": []};
        let items = {};
        const data = new FormData(event.target);
        if (data.get("month") === "") {
            errors["month"] = "Please select a month";
        } else {
            postData["month"] = moment("01/" + data.get("month")).format('YYYY-MM-DD');;
        }
        for (var [key, value] of data.entries()) {
            if (key !== 'month') {
                if (value !== "") {
                    let keyData = key.split('-');
                    console.log(key)
                    let itemType = keyData[0];
                    let valueType = keyData.[1];
                    let itemIndex = keyData[3];

                    let itemKey = `${itemType}-${itemIndex}`
                    let altValueType = valueType == 'description' ? 'amount' : 'description';

                    if (data.get(`${itemType}-${altValueType}-{itemIndex}`) === "") {
                        errors[`${itemType}-${altValueType}-{itemIndex}`] = `Please fill the ${valueType}`
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
            this.setState({newReport: false});

        } else {
            this.setState({errors: errors});
        }
    }

    async postReportData(postData) {
        const response = await axiosAPI.post('reports/create/', postData);
        if (response.status === 201) {
            this.getSubmittedReports();
        };
        this.setState({newReport: false});
    }

    addItem(sectionType) {
        var inputs = this.state.inputs;
        var newInput = `input-${inputs[sectionType].length}`;
        inputs[sectionType] = [ ...inputs[sectionType], newInput ];
        this.setState({
            inputs: inputs,
        });
    }

    newReport() {
        this.setState({newReport: true});
    }

    discardReport() {
        this.setState({
            newReport: false,
            inputs: defaultInputs
        });
    }

    componentDidMount() {
        this.getSubmittedReports();
    }

    render(){

        const {isAuthed, message, submittedReports, newReport, errors, inputs} = this.state;

        return (
            isAuthed ?
            <div>
                <header className="Home__header">
                    <span>
                        Hello  {message}
                    </span>
                    <Button className="logoutBtn" variant="light" onClick={this.handleLogout}>Logout</Button>
               </header>
                <div className="Home__container">
                   <Button variant="light" className={
                        newReport ? "hidden" : "visible"
                   } onClick={this.newReport}>New Report</Button>
                   <Report discardReport={this.discardReport} inputs={inputs} addItem={this.addItem} submitReport={this.submitReport} errors={errors} newReport={newReport}/>
                    <header className="Home__subheader">Submitted Reports</header>
                   <SubmittedReports submittedReports={submittedReports}/>
                </div>
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