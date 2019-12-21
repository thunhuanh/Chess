import React, { Component } from 'react';
import { Statistic, Card, Layout, Breadcrumb, Icon,  Row, Col } from 'antd';
import { ChartCard, MiniArea } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';
import Slider from './Slider.js';
import axios from 'axios';
import config from '../../../config';


const { Header, Content, Sider } = Layout;
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}


export default class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      collapsed: false,
      totalplayer: 0,
    };
    this.token = localStorage.getItem('token_admin')
  }
 
  fetchData = (token) => {
    var headerconfig = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    let url = config.API_URL + '/api/v1/be/account/accounts';
    axios.get(url,headerconfig)
    .then((response) => {
      this.setState({
        totalplayer : response.data.data.length,
      })
    })
  .catch(function (error) {
    console.log(error)
    })
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount(){
    this.fetchData(this.token)
  }
  render() {
 
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
         <Slider var="1" collapsed={this.state.collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />

          <Content style={{margin:'0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            
                <ChartCard title="Analyze Through Out Month" total={numeral(8846).format('0,0')} contentHeight={260} class="chart">
                  <NumberInfo
                    subTitle={<span>Gain From Previous Month</span>}
                    total={numeral(123).format('0,0')}
                    status="down"
                    subTotal={0}
                  />
                  <MiniArea line height={160} data={visitData} />
                </ChartCard>
        

            <div style={{background: '#002140', padding: '30px'}}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Total"
                      value={this.state.totalplayer}
                      precision={0}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<Icon type="arrow-up" />}
                      suffix="Players"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Peak"
                      value={2}
                      precision={0}
                      suffix="Players"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
         
        </Layout>
      </Layout>
    );
  }
}


