import React, { Component } from "react";
import { Card, CardHeader, Button, Col, Row, FormGroup, FormLabel } from 'react-bootstrap';
import ReportSection from './ReportSection'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axiosAPI from '../axiosApi';
import { isAuthenticated } from '../authenticationApi';

class NewReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
        }
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    hasError = (key) => {
        return key in this.props.errors;
    }

    getError = (key) => {
        return this.props.errors[key];
    }

    render() {

        const { submitReport, discardReport, errors, newReport, addItem, removeItem, inputs } = this.props;
        console.log(newReport)
        return (
            <Card className={newReport ? "Report__card" : "Report__card_hidden"}>
                <Card.Body>
                    <header className="Signup__header">
                        <span>NEW REPORT</span>
                    </header>
                    <form id="report-form" onSubmit={submitReport}>
                        <Row>
                            <FormGroup as={Col} md="4">
                                <FormLabel className="block ReportSection__header">
                                    MONTH
                                </FormLabel>
                                    <DatePicker
                                        name="month"
                                        onChange={date => this.handleChange(date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        className="form-control"
                                        selected={this.state.startDate}
                                    />
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col><ReportSection
                                removeItem={removeItem}
                                addItem={addItem}
                                inputs={inputs["Income"]}
                                name="income"
                                sectionType="Income"
                                errors={errors}/>
                            </Col>
                            <Col><ReportSection
                                removeItem={removeItem}
                                addItem={addItem}
                                inputs={inputs["Expenditure"]}
                                name="expenditure"
                                sectionType="Expenditure"
                                errors={errors}/>
                            </Col>
                            <Col><ReportSection
                                removeItem={removeItem}
                                addItem={addItem}
                                inputs={inputs["Debt"]}
                                name="debt"
                                sectionType="Debt"
                                errors={errors}/>
                            </Col>
                        </Row>
                        <Row>
                            <div className={"Report__error"}>
                                {Array.isArray(errors) && errors.length ? errors[0] : '' }
                            </div>
                        </Row>
                        <Row>
                            <Button block size="large" variant="secondary" type="button" onClick={discardReport}>
                                Discard
                            </Button>
                            <Button block size="large" type="submit">
                                Submit
                            </Button>
                        </Row>
                    </form>
                </Card.Body>
            </Card>
        );
    }
}

export default NewReport;