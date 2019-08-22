import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RegisterComponent from "../../Component/Auth/Register";
import * as actions from "../../store/actions/index";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Register: (firstName,lastName,email, password) => dispatch(actions.Register(firstName,lastName,email, password)),
        setErrors: (error) => dispatch(actions.setErrors(error)),
        setAuthredirectPath: (path) => dispatch(actions.setAuthredirectPath(path)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterComponent));