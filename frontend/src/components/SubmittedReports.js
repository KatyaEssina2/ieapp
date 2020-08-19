import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import SubmittedReport from './SubmittedReport';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class SubmittedReports extends Component {
    render() {
        const { newReport, handleNewReport, submittedReports, displayReport } = this.props;
        console.log(newReport)
        return (
            <div className="SubmittedReports">
                <ul className="SubmittedReports__ul">
                    <li>
                        <span className="SubmittedReports__ul__span">SUBMITTED REPORTS</span>
                        <Button variant="light" className={
                            newReport ? "addButton hidden" : "addButton visible"
                        } onClick={handleNewReport}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </li>
                    {submittedReports.map((report, index) => <SubmittedReport displayReport={displayReport} key={index} index={index} report={report}/>)}
                </ul>
            </div>
        );
    }
}

export default SubmittedReports;