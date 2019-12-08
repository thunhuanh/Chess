import React from 'react'
import FrontPage from './components/pages/frontPage/FrontPage'
import HomePage from './components/pages/HomePage/HomePage'
// import HomePageAuxComponents from './components/pages/HomePage/HomePageAuxComponents'
// import LeftSide from './components/pages/HomePage/LeftSide'
// import HomeChatBox from './components/pages/HomePage/HomeChatBox'
// import Play_Mode from './components/pages/HomePage/PlayMode'
import ChessPage from './components/pages/chessPage/ChessPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import RightSide from './components/pages/HomePage/RightSide'
import LeftSide from './components/pages/HomePage/LeftSide'
import ChatBox from './components/pages/HomePage/ChatBox'
import Play_Mode from './components/pages/HomePage/PlayMode'






export default function App() {
  return (
    <Router>
    <Route path="/" exact component={FrontPage}></Route>
    <Route path="/ChessPage" component={ChessPage}></Route>
    <Route path="/HomePage" component={HomePage}></Route>
    </Router>
  )
}
