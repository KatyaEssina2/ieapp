import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import ReportItem from './ReportItem';

class ReportSection extends Component {

    render() {
        const { sectionType, errors, inputs, addItem, removeItem } = this.props;
        return (
            <div className="ReportSection">
                <header className="ReportSection_header">
                    <span>{sectionType}</span>
                    <Button variant="light" type="button" onClick={()=>addItem(sectionType)}>+</Button>
                </header>
               <div>
                   {inputs.map(input => <ReportItem removeItem={removeItem} key={input} input={input} sectionType={sectionType} errors={errors} />)}
               </div>
            </div>
        );
    }
}

export default ReportSection;