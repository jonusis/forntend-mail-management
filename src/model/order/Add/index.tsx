import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Modal, Select } from 'antd';
import './index.css';
const {Option} = Select;
interface OrderDetailState{
}
interface OrderDetailProps{
    
}

class OrderAdd extends React.Component<OrderDetailProps,OrderDetailState>{
    AddformRef = React.createRef<FormInstance>();
    constructor(props: OrderDetailState){
        super(props);
        this.state = {
        };
    }
    onRenderAddForm = () => {
        return(
          <Form
          name="basic"
          labelCol={{ span: 7 }}
          initialValues={{}}
          autoComplete="off"
          ref={this.AddformRef}
        >
          <Form.Item
              label="Start_time"
              name="start_time"
            >
              <Input width="30px"/>
            </Form.Item>
            <Form.Item
                label="End_time"
                name="end_time"
            >
              <Input width="30px"/>
            </Form.Item>
            <Form.Item
                label="State"
                name="state"
            >
              <Input width="30px"/>
            </Form.Item>
            <Form.Item
                label="Total_price"
                name="total_price"
            >
              <Input width="30px"/>
            </Form.Item>
            <Form.Item
                label="Introduction"
                name="introduction"
            >
            <Select style={{ width: 120 }}>
            <Option value="0">女</Option>
            <Option value="1">男</Option>
                </Select>
                </Form.Item>
        </Form>
        )
      }
    render(){
        return(
        <div className="LoginForm">
            {this.onRenderAddForm()}
        </div>
    )
    }
}
export default OrderAdd;