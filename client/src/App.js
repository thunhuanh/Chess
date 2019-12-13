import React, { Component } from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import FrontPage from './components/pages/frontPage/FrontPage';
import HomePage from './components/pages/HomePage/HomePage';
import axios from 'axios';
import ChessPageVsBot from './components/pages/chessPage/vsBot/ChessPageVsBot'
import ChessPageVsMan from './components/pages/chessPage/vsMan/ChessPageVsMan'
import adminPage from './components/pages/adminPage/AdminPage'
import AdminPage from './components/pages/adminPage/AdminPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
    }
  }
  UNSAFE_componentWillUnmount(){
    this.setState({
      token:localStorage.getItem('token'),
      isRedirect: false
    })
  }

  componentWillMount() {
    let token = localStorage.getItem("token");
    if (token !== null)
        this.loginWithToken(token);
}

  getToken = (token) => {
    this.setState({
      token: token,
    })
  }

  loginWithToken = (token) => {
    // console.log(token)
    var config = {
        headers: {
            'Authorization': token
        }
    }
    axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',{}, config
    )
        .then((response) => {
            var userData = response.data.data;
            this.setState({
                userData: userData,
                userId: userData.id
            })
        })
        .catch((error) => {
            console.log(error);
        });
  }

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
            render={(props) => <FrontPage {...props} name="FrontPage" />}
          >
          </Route>
          <Route 
            path={"/HomePage"} exact
            render={(props) => localStorage.getItem("loginStatus") !== undefined?<HomePage {...props} passRoomIdToVsMan={this.passRoomIdToVsMan}/>:<Redirect to="/"/>}
          />
          <Route exact path="/HomePage/Bot" component={ChessPageVsBot} />
          <Route 
            path="/HomePage/play" 
            render={(props) => <ChessPageVsMan {...props} roomId={this.state.roomId}/>}
          />
        </Switch>   
      </Router>
   )
  }

  // render(){
  //   return(
  //     <AdminPage></AdminPage>
  //   )
  
  // }
}