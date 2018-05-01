import React, { Component } from "react";
import { Components } from "../..";

class CommitList extends Component {
    render() {
        const { list } = this.props;

        const items = list.map((item, i) => (
            <Components.CommitListItem
                key={item.id}
                item={item}
                isLast={i !== list.length - 1}
            />
        ));

        return <div className="commit-list">{items}</div>;
    }
}

export default CommitList;
