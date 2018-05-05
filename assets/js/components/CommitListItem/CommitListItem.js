import React, { Component } from "react";
import classNames from "classnames";

class CommitListItem extends Component {
    render() {
        const { item, isLast } = this.props;

        const itemClass = classNames("commit-list-item border p-1", {
            "border-bottom-0": isLast
        });

        return (
            <div className={itemClass}>
                <div>{item.message}</div>
                <div className="text-muted"><i className="fas fa-book" /> {item.repo}</div>
                <div className="text-muted"><i className="fas fa-user" /> {item.author}</div>
            </div>
        );
    }
}

export default CommitListItem;
