import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashBoardComponent from "../../Component/DashBoard/DashBoard";
import * as actions from "../../store/actions/index";

const mapStateToProps = state => {
    return {
        dashboard: state.dashboard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBooksData: () => dispatch(actions.getBooksData()),
        getCategory: () => dispatch(actions.getCategory()),
        addBooksData: (title, author, isbn, publisher, publish_date, category, no_of_stock, images) => dispatch(actions.addBooksData(title, author, isbn, publisher, publish_date, category, no_of_stock, images)),
        EditBooksData: (title, author, isbn, publisher, publish_date, category, no_of_stock, image, id) => dispatch(actions.EditBooksData(title, author, isbn, publisher, publish_date, category, no_of_stock, image, id)), 
        deleteBooksData: (id) => dispatch(actions.deleteBooksData(id)),
        getOutOfStockBooksData: () => dispatch(actions.getOutOfStockBooksData())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoardComponent));