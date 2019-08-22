import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css'
import history from '../../store/history';
class HeaderComponent extends Component {
    state = {
        token: undefined,
    }

   componentDidMount() {
        this.getToken();
    }

    async getToken() {
        let token = await localStorage.getItem('token');
        if (token !== null) {
            this.setState({ token });
        }
    }

    handleLogout = () => {
       
        localStorage.removeItem('token');
        history.push('/login');
    }

    render() {
        console.log('token1', this.state.token)
        return (
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="navbar-brand" to="/" exact>Book Inventory Management</Link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        {this.state.token === null || this.state.token === undefined || this.state.token === ''?
                            <Link className="navbar-brand" to="/login" exact>Login</Link>
                        :
                            <Link className="navbar-brand" to="/logout" exact>LogOut</Link>
                        }
                    </li>
                </ul>
            </nav>
        )
    }
}

export default HeaderComponent;
