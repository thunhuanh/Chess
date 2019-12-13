import React, { Component } from 'react';
import { Layout, Breadcrumb,Input } from 'antd';
import Slider from'./Slider.js'
import List from './List.js'
import Profile from './Profile'
const { Header, Content, Sider } = Layout;

export default class User extends Component {
  constructor(){
    super();
    this.state = {
      collapsed: false,
      isProfile:false,
      id:0,
      arrpoint:[],
    };
  }
  
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  liOnClick = (id,arrpoint) => {
    this.setState({
      isProfile: true,
      id:id,
      arrpoint:arrpoint,
    })
    console.log(this.state.id)
    console.log(this.state.arrpoint)
  }

  liOffClick = () => {
    this.setState ({
      isProfile:false
    })
  }
  

  render(){
      let profile = <Profile liOffClick = {this.liOffClick}
                              playerId = {this.state.id}
                              arrpoint = {this.state.arrpoint}
                    />;
      let list = <List liOnClick = {this.liOnClick}/>;
      return (<div>
          
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <Slider var = "2" collapsed={this.state.collapsed}/>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{margin:'0 16px'}}>
                <Breadcrumb style={{ margin: '6px 0' }}>
                  <Breadcrumb.Item>Admin</Breadcrumb.Item>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item> {this.state.isProfile?"Profile":"List"}</Breadcrumb.Item>
                </Breadcrumb>
                  <div>
                      {this.state.isProfile?profile:list}
                  </div>

              </Content>
              
            </Layout>
          </Layout>
      </div>
          
        );
  }
}