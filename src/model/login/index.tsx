import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance } from 'antd';
import './index.css';
import {MailOutlined} from '@ant-design/icons';
import {UserLogin} from '../../static/request/login'
interface LoginState{
}
interface LoginProps{
    
}

class Login extends React.Component<LoginProps,LoginState>{
    formRef = React.createRef<FormInstance>();
    constructor(props: LoginProps){
        super(props);
        this.state = {
        };
    }
    onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    onSubmitForm = async () => {
        this.formRef.current?.validateFields().then(async () => {
            const username = this.formRef.current?.getFieldValue('username');
            const password = this.formRef.current?.getFieldValue('password');
            const res = await UserLogin(username,password);
            this.formRef.current?.setFieldsValue({username:"",password:""});
            if(res.code === 200){
                //路由跳转
            }else{
                window.alert("登陆失败，请输入正确的账户密码");
            }
        }).catch(() => {
            window.alert("登陆失败，请检查账户或密码是否为空");
        })
    }
    render(){
        return(
        <div className="LoginForm">
            <div className="Header">
            <MailOutlined />
                Mail后台管理系统
            </div>
            <div className="title-line">
                <span className="tit">登陆</span>
            </div>
            <div className="Login">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
                ref={this.formRef}
                validateMessages={{default:"请检查账户和密码是否为空"}}
            >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={this.onSubmitForm}>
                提交
                </Button>
            </Form.Item>
            </Form>
            </div>
        </div>
    )
    }
}
export default Login;