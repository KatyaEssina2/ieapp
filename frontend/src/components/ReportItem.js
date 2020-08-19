import React, { Component} from "react";
import {FormControl, Row, Col} from 'react-bootstrap';

class ReportItem extends Component {

    hasError(key) {
        return key in this.props.errors;
    }

    getError(key) {
        return this.props.errors[key];
    }

    render() {
        const {input, sectionType} = this.props;
        const descName = sectionType + '-description-' + input;
        const amountName = sectionType + '-amount-' + input;
        return (
            <Row className="ReportItem">
                <Col>
                    <FormControl name={descName} placeholder="Description"
                        className={
                            this.hasError(descName) ? "form-control is-invalid": "form-control"
                        }/>
                    <div className={this.hasError(descName) ? "invalid-feedback" : "hidden"}>
                        {this.hasError(descName) ? this.getError(descName) : '' }
                    </div>
                </Col>
                <Col>
                    <FormControl name={amountName} placeholder="Amount"
                        className={
                            this.hasError(amountName) ? "form-control is-invalid": "form-control"
                        }/>
                    <div className={this.hasError(amountName) ? "invalid-feedback" : "hidden"}>
                        {this.hasError(amountName) ? this.getError(amountName) : '' }
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ReportItem;