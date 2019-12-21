import React, { Component } from 'react';
import { Avatar,Descriptions, Button, Icon, message, Popconfirm} from 'antd';
import axios from 'axios';
import config from '../../../config';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.playerId,
            data:[],
            arrpoint:this.props.arrpoint,
        };
        this.token = localStorage.getItem('token_admin')
    }
    liOffClick = () => {
        this.props.liOffClick()
      }

    showPlayer = (token,id,arrpoint) => {
        var headerconfig = {
            headers:{
              "Content-Type": "application/json",
              "Authorization": token
            }
          }
          let url = config.API_URL + '/api/v1/be/account/' + id;
          axios.get(url, headerconfig)
          .then((response) =>{
            // console.log('Success ' + response.data.success)
            let arr = arrpoint.reverse()
            let n
            for(let i = 0 ; i < arr.length; i++){
              if(response.data.data.Point === arr[i]){
                n = i
              }
            }
              if(n === 1)  n += "st";
              else if (n === 2) n += "nd";
              else if (n === 3) n += "rd"
              else n += "th"; 

              let temp = {
                id: response.data.data.id,
                name: response.data.data.name,
                rank: response.data.data.Rank,
                point: response.data.data.Point,
                avatar: response.data.data.Avatar,
                credate: response.data.data.created_at.slice(0,10),
                ranking: n,
              }
            this.setState({
              data: temp,
            })
            console.log(this.state.data)
       
          })
          .catch(function (error) {
            console.log(error)
          });
        
    }

    banAcc = (token, id) => {
      // console.log(id)
      var headerconfig = {
        headers:{
          "Content-Type": "application/json",
          "Authorization": token
        }
      }
      let url = config.API_URL + '/api/v1/be/account/' + id;
      axios.delete(url, headerconfig)
      .then((response) =>{
          message.success('Process Is Complete');     
      })
      .catch(function (error) {
        console.log(error)
      });
     this.liOffClick()
    }

    async componentWillMount(){
      console.log(this.state.arrpoint)
      console.log(this.state.arrpoint.length)

        await this.showPlayer(this.token,this.state.id, this.state.arrpoint)
    }

    render(){
        return(
            <div style={{margin:'30px 0 0 10px' }}>
                <Button type="primary" style={{margin:'0 0 20px 0'}} onClick={this.liOffClick}>
                    <Icon type="left" />
                    Backward
                  </Button>

                <Avatar size={64} icon="user" style={{display:'block', margin:'0 0 10px 0'}}/>

                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="ID" span={2}>{this.state.data.id}</Descriptions.Item>
                    <Descriptions.Item label="Name" span={2}>{this.state.data.name}</Descriptions.Item>

                    <Descriptions.Item label="Rank" span={2}>{this.state.data.rank}</Descriptions.Item>
                    <Descriptions.Item label="Elo" span={2}>{this.state.data.point}</Descriptions.Item>

                  <Descriptions.Item label="Ranking" span={2}>{this.state.data.ranking}</Descriptions.Item>
                    <Descriptions.Item label="Created Date" span={2}>{this.state.data.credate}</Descriptions.Item>
  
                </Descriptions>

                <Popconfirm style={{marginTop:'10px'}} title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => {
                        this.banAcc(this.token, this.state.data.id)
                        }} onCancel={() => {message.error("Process Canceled")}}>
                        <Button style={{marginTop:'10px'}} type="danger">Ban Account</Button>
                </Popconfirm>
            </div>
        );
    }
}
