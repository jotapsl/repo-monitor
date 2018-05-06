import React, { Component } from "react";
import classNames from "classnames";

class Alert extends Component {
    render() {
        const { msg, type, onDismiss } = this.props;

        if (!msg || !type) return null;

        const alertClass = classNames('alert d-flex justify-content-between', {
            'alert-danger': type === 'ERROR',
            'alert-success': type === 'SUCCESS'
        });

        const buttonClass = classNames('btn btn-link p-0', {
            'text-danger': type === 'ERROR',
            'text-success': type === 'SUCCESS'
        });

        return (
            <div className={alertClass}>
                <span>
                    <strong>{type === 'ERROR' ? 'Error!' : 'Success!'}</strong> {msg}
                </span>

                <div className={buttonClass} onClick={() => onDismiss()}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        );
    }
}

export default Alert;
