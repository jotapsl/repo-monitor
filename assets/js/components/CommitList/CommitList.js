import React, { Component } from "react";
import { CommitListItem } from "../../components";

class CommitList extends Component {
    onRepoSelect(reponame) {
        const { onRepoSelect } = this.props;
        onRepoSelect(reponame);
    }

    render() {
        const { list } = this.props;

        const items = list.map((item, i) => (
            <CommitListItem
                key={item.id}
                item={item}
                onRepoSelect={(reponame) => this.onRepoSelect(reponame)}
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
