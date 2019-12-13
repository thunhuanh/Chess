import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom'
import Chat from './chat'

class GeneralChat extends Component {
  constructor(){
    super();
    this.state = {
        name: "",
        redirect: false
    };
  }
    
  onSubmit = (e) => {
    e.preventDefault();
    var name = this.refs.userName.value;
    this.setState({
      name: name,
      redirect: true
    });
    this.refs.userName.value = "";
  }
    
  redirect = () => {
    if (this.state.redirect) {
      if (/\S/.test(this.state.name)) {
        return <Redirect to="/chat"/>
      }
      window.alert("name must not contains only white space :))")
    }   
  }

  render(){
    const {name} = this.state

    return(
      <BrowserRouter>
        <Route exact path="/">
          <form onSubmit={this.onSubmit}>
              {this.redirect()}
              <input type="text" ref="userName" placeholder="enter your name"/>
              <input type="submit" value="submit" className="home-submit-btn"/>
          </form>
        </Route>

        <Route path="/chat">
          <Chat name={name}/>
        </Route>
      </BrowserRouter>
    )    
  }
}

export default GeneralChat;