import React, { Component } from "react";
import { Card, Accordion } from 'react-bootstrap';
import SubmittedReport from './SubmittedReport';


class SubmittedReports extends Component {
    render() {
        const { submittedReports } = this.props;
        return (
            submittedReports.length === 0 ?
            <div>No submitted reports!</div> :
            <Accordion defaultActiveKey="0">
                {submittedReports.map((report, index) => <SubmittedReport key={index} index={index} report={report}/>)}
            </Accordion>
        );
    }
}

export default SubmittedReports;