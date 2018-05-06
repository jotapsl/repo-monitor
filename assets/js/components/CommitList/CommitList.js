import React, { Component } from "react";
import { CommitListItem } from "../../components";

class CommitList extends Component {
    render() {
        const { list } = this.props;

        if (!list || list.length === 0)
            return (
                <div>No commits found! Add a repository or clear filter.</div>
            );

        const items = list.map((item, i) => (
            <CommitListItem
                key={item.id}
                item={item}
            />
        ));

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Message</th>
                        <th scope="col">Repository</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
}

export default CommitList;
