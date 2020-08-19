import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import ReportItem from './ReportItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class ReportSection extends Component {

    render() {
        const { sectionType, errors, inputs, addItem, removeItem } = this.props;
        return (
            <div className="ReportSection">
                <header className="ReportSection_header">
                    <span className="ReportSection__header">{sectionType.toUpperCase()}</span>
                    <Button variant="light" type="button" className="addButton" onClick={()=>addItem(sectionType)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </header>
               <div>
                   {inputs.map(input => <ReportItem removeItem={removeItem} key={input} input={input} sectionType={sectionType} errors={errors} />)}
               </div>
            </div>
        );
    }
}

export default ReportSection;