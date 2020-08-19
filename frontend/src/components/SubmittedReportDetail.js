import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import SubmittedSection from './SubmittedSection';


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

class SubmittedReportDetail extends Component {

    constructor(props) {
        super(props);
    }

    formatMonth = (dateString) => {
        const dateArr = dateString.split('-');
        return `${dateArr[2]}/${dateArr[0]}`;
    }

    render() {
        const { viewingReport } = this.props;
        const grouped_report = groupBy(viewingReport.items, item => item.item_type);

        return (
            <Card className="Report__card">
                <Card.Body>
                    <header className="Signup__header">
                        <span>{this.formatMonth(viewingReport.month)} REPORT</span>
                    </header>
                    <Col>
                        <Row>
                            <SubmittedSection sectionType="Income" items={grouped_report.get("Income") || []}/>
                        </Row>
                        <Row>
                            <SubmittedSection sectionType="Expenditure" items={grouped_report.get("Expenditure") || []}/>
                        </Row>
                        <Row>
                            <SubmittedSection sectionType="Debt" items={grouped_report.get("Debt") || []}/>
                        </Row>
                    </Col>
                 </Card.Body>
            </Card>
        );
    }
}

export default SubmittedReportDetail;