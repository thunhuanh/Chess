import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { faChessQueen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Slider extends Component {   
  onClick() {
    localStorage.clear();
    window.location.href = '/';
}
    render() {   
      return (
        <div>
            <div/> 
            {this.props.collapsed === false
            ? <p style={{fontFamily: 'cursive',
                          color: 'white',
                          textAlign: 'center',
                          fontSize:'1.8em',
                          marginBottom:'0.5em'}}>
                          ChessOnline
              </p>
            : <FontAwesomeIcon style={{
                                      color: 'white',
                                      marginLeft:'1.1em',
                                      fontSize:'1.8em',
                                      marginBottom:'0.5em',
                                      marginTop:'0.4em'}}
                                      icon={faChessQueen} />
            }
           
            <Menu theme="dark" defaultSelectedKeys={[this.props.var]} mode="inline">
              <Menu.Item key="1">
              <Icon type="area-chart" />
                <span>Dashboard</span>
                <NavLink to="/Dashboard"></NavLink>
              </Menu.Item>
  
              <Menu.Item key="2">
              <Icon type="user" />
                <span>User</span>
                <NavLink to="/User"></NavLink>
              </Menu.Item>
  
              <Menu.Item key="3">
              <Icon type="audit" />
                <span>Report</span>
                <NavLink to="/Report"></NavLink>
              </Menu.Item>
  
              <Menu.Item key="4">
                <Icon type="logout" />
                <span>Log out</span>
                 <NavLink to="/" onClick={this.onClick} ></NavLink>
              </Menu.Item>
            </Menu>
          </div>
        );
    }
}