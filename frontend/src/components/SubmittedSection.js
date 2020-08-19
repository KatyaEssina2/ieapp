import React, { Component} from "react";

class SubmittedSection extends Component {

    render() {
        const { sectionType, items } = this.props;
        return (
            <div className="ReportSection">
                <header className="ReportSection_header">
                    <span>{sectionType}</span>
                </header>
               <div>
                    {items.map((item, index) => <div key={index}>{item.description + " - £" + item.amount}</div>)}
               </div>
            </div>
        );
    }
}

export default SubmittedSection;