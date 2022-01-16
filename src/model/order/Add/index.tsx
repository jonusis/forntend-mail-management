import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Modal, Select, Steps, TimePicker, DatePicker, Descriptions } from 'antd';
import {QueryGoodsByGid, AddOrder} from '../../../static/request/order'
import './index.css';
import { QueryBusinessById } from '../../../static/request/business';
import { GoodsDto } from '../../../static/resType/product';
import { BusinessDto } from '../../../static/resType/business';
import { withRouter } from '../../../static/compoments/withRouter';
import { NavigateFunction } from 'react-router';
const {Option} = Select;
const {Step} = Steps;
const { TextArea,Search } = Input;


interface OrderAddState{
    stepState: number
    submitOrderForm: any
    GoodsData: any
    BusinessData: any
    UserData: any
}
interface OrderAddProps{
    navigate: NavigateFunction
}

class OrderAdd extends React.Component<OrderAddProps,OrderAddState>{
    FirstStepformRef = React.createRef<FormInstance>();

    constructor(props: OrderAddProps){
        super(props);
        this.state = {
            stepState: 0,
            submitOrderForm: {},
            GoodsData:{} as GoodsDto,
            BusinessData: {} as BusinessDto,
            UserData: [],
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
          const {GoodsData,BusinessData} = this.state;
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
            {Object.keys(BusinessData).map((item) => {
                return <Descriptions.Item label={item}>{BusinessData[item]}</Descriptions.Item>
            })}
        </Descriptions>
        <Descriptions title="商品信息" style={{marginTop:'20px'}}>
        {Object.keys(GoodsData).map((item) => {
            return <Descriptions.Item label={item}>{GoodsData[item]}</Descriptions.Item>
        })}
        </Descriptions>
        </>
      }
    onSearch= async(value: string) => {
        const res1 = await QueryGoodsByGid(parseInt(value));
        const res2 = await QueryBusinessById(res1.data.bid);
        await this.setState({GoodsData: res1.data, BusinessData: res2.data});
    }
    onClickLast = () => {
        const {stepState} = this.state;
        switch(stepState){
            case 1:
                this.setState({stepState: 0})
                break;
            case 2:
                this.setState({stepState: 1})
                break;
        }
    }
    onClickNext = async () => {
        const {stepState,BusinessData,GoodsData} = this.state;
        const {navigate} = this.props;
        switch(stepState){
            case 0:
                this.setState({stepState: 1})
                break;
            case 1:
                const value = {...this.FirstStepformRef.current?.getFieldsValue(true),bid: BusinessData['bid'],gid: GoodsData['gid']};
                value.start_time = value.start_time.format('YYYY-MM-DD');
                value.end_time = value.end_time.format('YYYY-MM-DD');
                const res = await AddOrder(value);
                if(res.code === 200){
                    navigate('/order/list');
                }
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
            </Form>
            </div>
            {stepState > 0 && <Button type="primary" onClick={this.onClickLast}>上一步</Button>}
            <Button type="primary" style={{float:'right'}} onClick={this.onClickNext}>{stepState === 0 ? '下一步' : '提交'}</Button>
            </div>
    )
    }
}
export default withRouter(OrderAdd);