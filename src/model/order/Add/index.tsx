import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Modal, Select, Steps, TimePicker, DatePicker, Descriptions } from 'antd';
import {QueryGoodsByGid, AddOrder} from '../../../static/request/order'
import './index.css';
import moment from 'moment';
import { QueryBusinessById } from '../../../static/request/business';
import { GoodsDto } from '../../../static/resType/product';
import { BusinessDto } from '../../../static/resType/business';
const {Option} = Select;
const {Step} = Steps;
const { TextArea,Search } = Input;


interface OrderAddState{
    stepState: number
    submitOrderForm: any
    GoodsData: GoodsDto
    BusinessData: BusinessDto
}
interface OrderAddProps{
    
}

class OrderAdd extends React.Component<OrderAddProps,OrderAddState>{
    FirstStepformRef = React.createRef<FormInstance>();

    constructor(props: OrderAddState){
        super(props);
        this.state = {
            stepState: 0,
            submitOrderForm: {},
            GoodsData:{} as GoodsDto,
            BusinessData: {} as BusinessDto,
        };
    }
    onRenderFirstAddForm = () => {
        return(
        <>
          <Form.Item
              label="订单开始时间"
              name="start_time"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
              label="订单结束时间"
              name="end_time"
          >
            <DatePicker />
          </Form.Item>
            <Form.Item
                label="订单状态"
                name="state"
            >
                <Select style={{ width: 140 }}>
                    <Option value="0">新建拼单</Option>
                    <Option value="1">拼单中</Option>
                    <Option value="2">拼单成功</Option>
                    <Option value="3">拼单失败</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="总价"
                name="total_price"
            >
              <Input style={{width:'30px !important'}}/>
            </Form.Item>
            <Form.Item
                label="订单介绍"
                name="introduction"
            >
                <TextArea rows={4} cols={30}/>
                </Form.Item>
        </>
        )
      }
      onRenderSecondAddForm = () => {
        return <>
        <Form.Item
            label="填写绑定的商品id"
            name="bid"
        >
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => this.onSearch(value)}
            />        
        </Form.Item>
        <Descriptions title="商家信息" style={{marginTop:'20px'}}>
            {}
        </Descriptions>
        <Descriptions title="商品信息" style={{marginTop:'20px'}}>
        </Descriptions>
        </>
      }
      onRenderThirdAddForm = () => {
          
    }
    onSearch= async(value: string) => {
        const res1 = await QueryGoodsByGid(parseInt(value));
        const res2 = await QueryBusinessById(res1.data.bid);
        this.setState({GoodsData: res1.data, BusinessData: res2.data});
    }
    onClickLast = () => {
        const {stepState} = this.state;
        switch(stepState){
            case 1:
                this.setState({stepState: 0})
                break;
            case 2:
                break;
        }
    }
    onClickNext = () => {
        const {stepState} = this.state;
        switch(stepState){
            case 0:
                const value = this.FirstStepformRef.current?.getFieldsValue(true);
                this.setState({stepState: 1})
                break;
            case 1:
                const value1 = this.FirstStepformRef.current?.getFieldsValue(true);
                break;
            case 2:
                break;
        }
    }
    render(){
        const {stepState} = this.state;
        return(
            <div style={{background:'white',padding:'60px 60px'}}>
            <Steps current={stepState}>
                <Step title="新增订单信息" description="填写订单的基本信息" />
                <Step title="绑定商品" description="选择拼单的商品和对应的商家" />
                <Step title="配置用户" description="选择参与拼单的用户" />
            </Steps>
            <div style={{marginTop:'50px',width:"600px",margin:'100px auto'}}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                initialValues={{}}
                autoComplete="off"
                ref={this.FirstStepformRef}
                layout='horizontal'
            >
            {stepState === 0 && this.onRenderFirstAddForm()}
            {stepState === 1 && this.onRenderSecondAddForm()}
            {stepState === 2 && this.onRenderThirdAddForm()}
            </Form>
            </div>
            {stepState > 0 && <Button type="primary" onClick={this.onClickLast}>上一步</Button>}
            <Button type="primary" style={{float:'right'}} onClick={this.onClickNext}>下一步</Button>
            </div>
    )
    }
}
export default OrderAdd;