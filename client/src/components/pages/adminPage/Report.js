import React, { Component } from 'react';
import { Table, Divider, Layout, Breadcrumb, Button, message, Popconfirm } from 'antd';
import axios from "axios";
import Slider from './Slider.js';
import config from '../../../config';

const { Column } = Table;
const { Header, Content, Sider } = Layout;

export default class Dashboard extends Component {
 constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      confirm : false,
      data: [],
    } 
    this.token = localStorage.getItem('token_admin')
  }

  cancel = () => {
    message.error('Cancel The Process');
  };

  banAcc = (token, data) => {
    // console.log(data.IdReported)
    var headerconfig = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    let url = config.API_URL + '/api/v1/be/account/' + data.IdReported;
    axios.delete(url, headerconfig)
    .then((response) =>{
        message.success('Process Is Complete');     
    })
    .catch(function (error) {
      console.log(error)
    });
    this.deleteReport(token,data)
  }

  deleteReport = (token, data) => {
    var headerconfig = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    let url = config.API_URL + '/api/v1/be/report/reports/' + data.Key;
    axios.delete(url, headerconfig)
    .then((response) =>{
        message.success('Process Is Complete');  
        this.fetchWithToken(this.token);  
    })
    .catch(function (error) {
      console.log(error)
    });

    console.log(data)
  }

  fetchWithToken = (token) =>{
    var headerconfig = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    let url = config.API_URL + '/api/v1/be/report/reports/all';
    axios.get(url, headerconfig)
    .then((response) => {
        let data = [];
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++){
          let temp = {
            Key: response.data.data[i].id,
            IdReported :  response.data.data[i].reported.id,
            ReportedName : response.data.data[i].reporter.name,
            ReportedAccountName: response.data.data[i].reported.name,
            Message : response.data.data[i].message
          }
          data.push(temp);
        }

        this.setState({
          data: data,
        })
        console.log(this.state.data)

      })
    .catch(function (error) {
      console.log(error)
    });
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount(){
    this.fetchWithToken(this.token); 
  }

  render() {
    return(
      <Layout style={{ minHeight: '100vh' }}>

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Slider var = "3" collapsed={this.state.collapsed}/>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />

          <Content style={{margin:'0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Report</Breadcrumb.Item>
            </Breadcrumb>
            
            <Table dataSource={this.state.data}>
              <Column title="Reporter" dataIndex="ReportedName" key="ReportedName" />
              <Column title="Target" dataIndex="ReportedAccountName" key="ReportedAccountName" />
              <Column title="Message" dataIndex="Message" key="Message" />
              <Column
                title="Action"
                key="action"
                render={(record) => (
                  <span>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => {
                        this.banAcc(this.token, record)
                        }} onCancel={this.cancel}>
                        <Button  type="danger">Ban Target</Button>
                    </Popconfirm>

                    <Divider type="vertical" />

                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => {
                      this.deleteReport(this.token, record)
                        }} onCancel={this.cancel}>
                        <Button>Delete</Button>
                    </Popconfirm>
                    
                  </span>
                )}
              />
            </Table>
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}
