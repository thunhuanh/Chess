import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import 'ant-design-pro/dist/ant-design-pro.css'
import "antd/dist/antd.css";
import Login from './Login';
import AdminPageComponents from './AdminPageComponents';


class AdminPage extends Component {
  constructor(){
    super();
    this.state={
      allow:false
    }
  }

componentDidMount(){
  if(localStorage.getItem('admin_loginStatus') === true){
    this.setState({allow:true})
  } else {
    this.setState({allow:false})
  }
}

Redirect = () => {
  if (this.state.allow === false){
    return <Redirect to="/"/>
  }
}

  render(){ 
    return (
        <Router>
          {this.Redirect()}
          <Route exact path="/" component={Login} />
          <Route path="/Dashboard" component={AdminPageComponents}/>
        </Router>   
         
    );
  }
}
export default AdminPage;