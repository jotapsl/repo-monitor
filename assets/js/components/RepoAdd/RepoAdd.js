import React, { Component } from "react";

class RepoAdd extends Component {
    constructor(props) {
        super(props);

        this.state = { reponame: '' };
        this.repoRegex = /^([a-zA-z0-9.-])+\/([a-zA-z0-9.-])+$/; // Matches 'user/repo'-like strings
    }

    handleValueChange(event) {
        this.setState({ reponame: event.target.value });
    }

    handleFormSubmit(event) {
        const { onAdd, onError, loading } = this.props;
        const { reponame } = this.state;
        
        event.preventDefault();

        if (loading) return;

        if (this.repoRegex.test(reponame)) {
            onAdd(reponame);
        } else {
            onError('Invalid Repository Name!');
        }
    }

    render() {
        const { loading } = this.props;

        const button = loading ? (
            <button className="btn btn-secondary">
                <i className="fas fa-sync fa-spin"></i>
                <span> Loading... </span>
            </button>
        ) : (
            <button className="btn btn-primary">
                <i className="fas fa-plus" />
                <span> Add repository </span>
            </button>
        );

        return (
            <form onSubmit={e => this.handleFormSubmit(e)}>
                <div className="input-group input-group-sm w-auto">
                    <input
                        className="form-control"
                        placeholder="user/repo"
                        value={this.state.reponame}
                        onChange={e => this.handleValueChange(e)}
                    />
                    <div className="input-group-append">
                        {button}
                    </div>
                </div>
            </form>
        );
    }
}

export default RepoAdd;
