import React, { Component} from "react";
import { Card, Accordion, Col, Row, Alert } from 'react-bootstrap';
import SubmittedSection from './SubmittedSection';
import moment from 'moment';

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

class SubmittedReport extends Component {

    constructor(props) {
        super(props);
        this.formatMonth = this.formatMonth.bind(this);
    }

    formatMonth(dateString) {
        const dateArr = dateString.split('-');
        return `${dateArr[2]}/${dateArr[0]}`;
    }

    render() {
        const { report, index } = this.props;
        const grouped_report = groupBy(report.items, item => item.item_type);
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} variant="light" eventKey={String(index)}>
                    {this.formatMonth(report.month)}
                    <span className={'SubmittedReport__span grade_'+report.grade}>{report.grade}</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={String(index)}>
                    <Card.Body>
                        <Alert variant="info">
                            <span className="SubmittedReport__alert_span">I&E Rating: {report.rating}%</span>
                            <span className="SubmittedReport__alert_span">Disposable Income: £{report.disposable_income}</span>
                        </Alert>
                        <Row>
                            <Col><SubmittedSection sectionType="Income" items={grouped_report.get("Income") || []}/></Col>
                            <Col><SubmittedSection sectionType="Expenditure" items={grouped_report.get("Expenditure") || []}/></Col>
                            <Col><SubmittedSection sectionType="Debt" items={grouped_report.get("Debt") || []}/></Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

export default SubmittedReport;




