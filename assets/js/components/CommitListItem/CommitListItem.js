import React, { Component } from "react";

class CommitListItem extends Component {
    render() {
        const { item } = this.props;

        return (
            <tr>
                <td className="w-50" scope="row">{item.message}</td>
                <td><i className="fas fa-book" /> {item.repo}</td>
                <td><i className="fas fa-user" /> {item.author}</td>
                <td><i className="far fa-clock" /> {item.date}</td>
            </tr>
        );
    }
}

export default CommitListItem;
