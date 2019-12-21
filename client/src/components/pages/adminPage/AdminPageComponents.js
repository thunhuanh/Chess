import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard'
import User from './User'
import Report from './Report'
import Login from './Login'
import {message} from 'antd';


class AdminPageComponents extends Component {
  render(){
    message.success('You Are Logged In! :D', 1)
    return (
        <Router>
            <Switch>
                <Route exact path="/Dashboard" component={Dashboard} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/User" component={User} />
                <Route path="/Report" component={Report} />
                <Route path="/" component={Login}/>
            </Switch>
        </Router>   
    ); 
  }
}
export default AdminPageComponents;