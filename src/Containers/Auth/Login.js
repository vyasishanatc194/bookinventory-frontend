import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginComponent from "../../Component/Auth/Login";
import * as actions from "../../store/actions/index";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Login: (email, password) => dispatch(actions.Login(email, password)),
        setErrors: (error) => dispatch(actions.setErrors(error)),
        setAuthredirectPath: (path) => dispatch(actions.setAuthredirectPath(path)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent));