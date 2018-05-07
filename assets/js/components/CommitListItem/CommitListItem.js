import React, { Component } from "react";

class CommitListItem extends Component {
    repoSelect(e) {
        e.preventDefault();

        const { item, onRepoSelect } = this.props;
        onRepoSelect(item.repo);
    }

    render() {
        const { item, onRepoSelect } = this.props;

        return (
            <tr>
                <td className="w-50" scope="row">{item.message}</td>
                <td>
                    <i className="fas fa-book" />
                    <a href="" className="text-secondary" onClick={(e) => this.repoSelect(e)} title={`Filter by ${item.repo}`}> {item.repo}</a>
                </td>
                <td><i className="fas fa-user" /> {item.author}</td>
                <td><i className="far fa-clock" /> {item.date}</td>
            </tr>
        );
    }
}

export default CommitListItem;
