import React, { Component } from "react";
import {FormControl, Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class ReportItem extends Component {

    hasError = (key) => {
        return key in this.props.errors;
    }

    getError = (key) => {
        return this.props.errors[key];
    }

    handleRemove = () => {
        if (this.props.input !== 'input-0') {
            this.props.removeItem(this.props.input, this.props.sectionType);
        } else {
            this.refs.description.value = "";
            this.refs.amount.value = "";
        }
    }

    render() {
        const {input, sectionType, removeItem} = this.props;
        const descName = sectionType + '-description-' + input;
        const amountName = sectionType + '-amount-' + input;
        return (
            <Row className="ReportItem">
                <Col>
                    <FormControl name={descName} placeholder="Description"
                        className={
                            this.hasError(descName) ? "form-control is-invalid": "form-control"
                        } ref="description"/>
                    <div className={this.hasError(descName) ? "invalid-feedback" : "hidden"}>
                        {this.hasError(descName) ? this.getError(descName) : '' }
                    </div>
                </Col>
                <Col>
                    <FormControl name={amountName} placeholder="Amount"
                        className={
                            this.hasError(amountName) ? "form-control is-invalid": "form-control"
                        } ref="amount"/>
                    <div className={this.hasError(amountName) ? "invalid-feedback" : "hidden"}>
                        {this.hasError(amountName) ? this.getError(amountName) : '' }
                    </div>
                </Col>
                <Col md="1" className="ReportItem__remove_col">
                    <Button variant="link" onClick={this.handleRemove} className="ReportItem__remove">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default ReportItem;