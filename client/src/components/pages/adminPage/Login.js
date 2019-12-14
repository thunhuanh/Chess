import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios";
import { Form, Icon, Input, message} from 'antd';
import './styles/login.css'


class NormalLoginForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        token:"",
        loginStatus:localStorage.getItem('admin_loginStatus'), 
        
    }
  }

   componentWillMount() {
     this.loginWithToken(localStorage.getItem('token_admin'))
  }
  
  loginWithToken = (token) =>{
    var config = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
      axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',{}, config)
    .then((response) =>{
      localStorage.setItem('admin_loginStatus',response.data.success)
    })
    .catch(function (error) {
    });
  }
 
  login = (userName, password) =>{
    axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
    name: userName, // Dữ liệu được gửi lên endpoint '/user'
    password: password
    })
    .then((response) =>{
      this.setState({
          token: response.data.token,
          loginStatus: response.data.success   
      }) // Xử lý dữ liệu được trả về từ API
      localStorage.setItem('token_admin',response.data.token)
      localStorage.setItem('admin_loginStatus',response.data.success)
      if(response.data.success === false){
        message.error('You Are Not Allow!')
      }
    })
    .catch(function (error) {
    });
  }
 
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(values.username !== "admin"){
        message.error('You Are Not Allow!')
        return ""
      }
      if(!err){
          this.login(values.username, values.password)
      } else {
        message.warning('Please Fill In Admin Account!')
      }

      setTimeout(() => {
        if (localStorage.getItem('admin_loginStatus') === null) message.error('No Response From Sever')
        else return 0;
      }, 7000);
    });
  };
  
  
  render() {
    if(this.state.loginStatus){
      return (
        <Redirect to = '/Dashboard'/>
      );
    }
       
    const { getFieldDecorator } = this.props.form;

    return (
       <div className="lg-body">
        <Form onSubmit={this.handleSubmit} className="lg-login-form" >
              <h1>AdminPage</h1>
              <div className="line"></div>
              <Form.Item  className="lg-input">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  
                  />,
                )}
              </Form.Item>
              <Form.Item  className="lg-input">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  
                  />,
                )}
              </Form.Item>

              <Form.Item className="input">
               
                <button htmlType="submit" className="login-btn">
                Login
                </button>
                
              </Form.Item>
          </Form>
      
        </div>
      );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login