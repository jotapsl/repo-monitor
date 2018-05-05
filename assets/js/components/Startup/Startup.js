import React, { Component } from "react";
import { connect } from "react-redux";
import { getSessionInfo } from "../../actions/authActions";

class Startup extends Component {
    componentDidMount() {
        this.props.getSessionInfo();
    }

    render() {
        return !this.props.fetchingSession ? this.props.children : <div></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingSession: state.auth.fetchingSession,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSessionInfo: () => dispatch(getSessionInfo())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Startup);