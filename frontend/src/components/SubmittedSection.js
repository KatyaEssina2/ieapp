import React, { Component} from "react";

class SubmittedSection extends Component {

    render() {
        const { sectionType, items } = this.props;
        return (
            <div className="ReportSection SubmittedSection">
                <header className="ReportSection__header">
                    <span>{sectionType.toUpperCase()}</span>
                </header>
               <div>
                    {items.length ?
                        items.map((item, index) =>
                            <div className="SubmittedSection__item" key={index}>{item.description + " - £" + item.amount}</div>) :
                        <div className="SubmittedSection__item">No Items</div>
                    }
               </div>
            </div>
        );
    }
}

export default SubmittedSection;