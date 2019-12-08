// import React from 'react'
// 
// import RightSide from './components/pages/HomePage/RightSide'
// import LeftSide from './components/pages/HomePage/LeftSide'
// import HomeChatBox from './components/pages/HomePage/HomeChatBox'
// import Play_Mode from './components/pages/HomePage/PlayMode'



// export default function App() {
//   let frontPage = <FrontPage token={this.getToken}></FrontPage>
//   return (
//     <Router>
//     <Route path="/" exact component={FrontPage}></Route>
//     <Route path="/ChessPage" component={ChessPage}></Route>
//     <Route path="/HomePage" component={HomePage}></Route>
//     </Router>
//   )
// }

import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import FrontPage from './components/pages/frontPage/FrontPage'
import ChessPage from './components/pages/chessPage/ChessPage'
import HomePage from './components/pages/HomePage/HomePage'



export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         token:"",
         isRedirect: false,
         nextPage: "",
         curPage: "/"
    }
    
  }
  UNSAFE_componentWillUnmount(){
    this.setState({
      token:localStorage.getItem('token')
    })
    console.log(this.state.token)
  }
  getToken = (token) => {
    this.setState({
      token: token,
    })
  }

  getConfirm = (confirm, name) =>{
      this.setState({
        isRedirect: confirm,
        nextPage: name
      })
  }

  redirect = () =>{
    console.log(this.state.nextPage)
    if (this.state.isRedirect)
    return <Redirect from="/" to={this.state.nextPage}></Redirect>
  }

  render() { 
    return (
      <div>
      <Router>
      {this.redirect()}
      <Route path="/" exact>
        <FrontPage name="FrontPage" getConfirm={this.getConfirm}></FrontPage>
      </Route>
      <Route path={"/ChessPage"}>
        <ChessPage></ChessPage>
      </Route>
      <Route path={"/HomePage"}>
        {localStorage.getItem("loginStatus") !== null?<HomePage></HomePage>:""}
      </Route>
      </Router>   
      </div>
   )
  }
}
