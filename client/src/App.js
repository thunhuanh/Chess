import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import FrontPage from './components/pages/frontPage/FrontPage';
import HomePage from './components/pages/HomePage/HomePage';
import axios from 'axios';
import ChessPage from './components/pages/chessPage/ChessPage';

export default class App extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //        token:"",
  //        isRedirect: false,
  //        nextPage: "",
  //        curPage: "/"
  //   }
    
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

  render() { 
    return (
        <Switch>
          <Route path="/" exact>
            <FrontPage name="FrontPage"></FrontPage>
          </Route>
          <Route path={"/HomePage"} exact>
            {localStorage.getItem("loginStatus") !== undefined?<HomePage/>:<Redirect to="/"/>}
          </Route>
          <Route path={"/HomePage/bot"} exact>
            {localStorage.getItem("loginStatus") !== undefined?<ChessPage/>:<Redirect to="/" />}
          </Route>
          <Route path={"/HomePage/play"} exact>
            {localStorage.getItem("loginStatus") !== undefined?<ChessPage/>:<Redirect to="/" />}
          </Route>
        </Switch>   
   )
  }
}
