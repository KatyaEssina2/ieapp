import React, { Component} from "react";
import { Card, Col, Row } from 'react-bootstrap';
import SubmittedSection from './SubmittedSection';
import moment from 'moment';

class SubmittedReport extends Component {

    constructor(props) {
        super(props);
    }

    formatMonth = (dateString) => {
        const dateArr = dateString.split('-');
        return `${dateArr[2]}/${dateArr[0]}`;
    }

    render() {
        const { report, index, displayReport } = this.props;
        return (
            <li>
                <Card className="SubmittedReport" onClick={()=>displayReport(report)}>
                    <Card.Header className="SubmittedReport__header">
                        {this.formatMonth(report.month)}
                        <span className={'SubmittedReport__span grade_'+report.grade}>{report.grade}</span>
                    </Card.Header>
                    <Card.Body>
                        <div>I&E Rating: {report.rating}%</div>
                        <div>Disposable Income: {report.disposable_income}</div>
                    </Card.Body>
                </Card>
            </li>
        );
    }
}

export default SubmittedReport;


