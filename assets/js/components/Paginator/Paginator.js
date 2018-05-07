import React, { Component } from 'react';

class Paginator extends Component {

    click(action) {
        const { onAction, config } = this.props;
        if (action === 'prev') {
            onAction(config.page - 1);
        } else {
            onAction(config.page + 1);
        }
    }

    render() {
        const { hasNext, hasPrev, page } = this.props.config

        const prevButton = hasPrev ? <button type="button" className="btn btn-primary" onClick={() => this.click('prev')}>Prev</button> : null;
        const nextButton = hasNext ? <button type="button" className="btn btn-primary" onClick={() => this.click('next')}>Next</button> : null;

        return (
            <div className="d-flex justify-content-around align-items-center">
                <div>{prevButton}</div>
                <div>{page}</div>
                <div>{nextButton}</div>
            </div>
        );
    }
}

export default Paginator;