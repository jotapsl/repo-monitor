import React, { Component } from "react";
import { CommitListItem } from "../../components";

class CommitList extends Component {
    render() {
        const { list } = this.props;

        const items = list.map((item, i) => (
            <CommitListItem
                key={item.id}
                item={item}
                isLast={i !== list.length - 1}
            />
        ));

        return <div className="commit-list">{items}</div>;
    }
}

export default CommitList;
