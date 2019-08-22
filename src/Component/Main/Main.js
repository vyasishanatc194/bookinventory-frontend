import React from 'react';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';


import DashboardContainers from '../../Containers/DashBoard/DashBoard';
import LogOut from '../Auth/LogOut';
import HeaderComponent from '../../Component/Header/Header';

class MainPage extends React.Component {

  componentDidMount() {
    this.authenticationCheck();
  }

  componentDidUpdate(prevProps) {
    this.authenticationCheck();
  }

  authenticationCheck = () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.replace('/login');
    }
  }

  render() {
    return (
      <div>
          <header>
            <HeaderComponent />
          </header>
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
              <Route path="/dashboard" component={DashboardContainers} />
              <Route path="/logout" component={LogOut}/>
              <Redirect to="/dashboard" />
            </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);
