import React, { Component } from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import FrontPage from './components/pages/FrontPage/FrontPage';
import HomePage from './components/pages/HomePage/HomePage';
import ChessPageVsBot from './components/pages/chessPage/vsBot/ChessPageVsBot'
import ChessPageVsMan from './components/pages/chessPage/vsMan/ChessPageVsMan'
// import adminPage from './components/pages/adminPage/AdminPage'
// import AdminPage from './components/pages/adminPage/AdminPage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      // userName:"",
      // userPass:""
    }
  }

  // passDataToHP = (name, pass) => {
  //   this.setState({
  //     userName: name,
  //     userPass: pass
  //   })
  // }

  passRoomIdToVsMan = (id) => {
    this.setState({
      roomId: id
    })
  }

  render() { 
    return (
      <Router>
        <Switch>
          <Route 
            path="/" exact
            render={(props) => <FrontPage passDataToHP={this.passDataToHP} {...props} name="FrontPage" />}
          >
          </Route>
          <Route 
            path={"/Home"} exact
            render={(props) => localStorage.getItem("loginStatus") !== undefined?<HomePage {...props} passRoomIdToVsMan={this.passRoomIdToVsMan} userName={this.state.userName} userPass={this.state.userPass}/>:<Redirect to="/"/>}
          />
          <Route exact path="/Home/Bot" component={ChessPageVsBot} />
          <Route 
            path="/Home/play" 
            render={(props) => <ChessPageVsMan {...props} roomId={this.state.roomId}/>}
          />
          {/* <Route
            exact
            path="/Admin"
            render={(props) => <AdminPage {...props}/>}
          /> */}
        </Switch>   
      </Router>
   )
  }
}