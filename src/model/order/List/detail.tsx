import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Card, Menu, Descriptions, PageHeader, Spin } from 'antd';
import {QueryOrderDetailByoid, DeleteOrder, UpdateOrder, AddOrder} from '../../../static/request/order';
import './index.css';
import { withRouter } from '../../../static/compoments/withRouter';
import { NavigateFunction } from 'react-router-dom';
import qs from 'qs';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { BusinessDto, UserDto } from '../../../static/response';
import { OrderDto } from '../../../static/resType/order';
interface OrderDetailState{
    userListInfo: UserDto[],
    BusinessInfo: BusinessDto,
    OrderInfo: OrderDto,
    oid: number,
    isLoading: boolean
}
interface OrderDetailProps{
    navigate: NavigateFunction
    location: Location
}

class OrderDetail extends React.Component<OrderDetailProps,OrderDetailState>{
    formRef = React.createRef<FormInstance>();
    constructor(props: OrderDetailProps){
        super(props);
        this.state = {
            oid: 0,
            userListInfo: [] as UserDto[],
            BusinessInfo: {} as BusinessDto,
            OrderInfo: {} as OrderDto,
            isLoading: false
        };
    }
    
    async componentDidMount(){
        const search = this.props.location.search;
        const query = qs.parse(search.substring(1,search.length));
        let oid: any = query['oid'] ? query['oid'] : '0';
        this.setState({isLoading: true})
        const res = await QueryOrderDetailByoid(parseInt(oid));
        await this.setState({
            userListInfo: res.data.users,
            BusinessInfo: res.data.business,
            OrderInfo: res.data.order
        })
        this.setState({isLoading: false})
    }
    render(){
        const {navigate} = this.props;
        const {userListInfo,BusinessInfo,OrderInfo,isLoading} = this.state;
        console.log(userListInfo);
        return(
        <div style={{background:'white',padding:'10px 30px'}}>
            {isLoading ? <Spin size="large" /> : 
            <PageHeader
            ghost={false}
            onBack={() => navigate('/order/list')}
            title="订单详细信息"
            extra={[
                <>
                <Button key="1">添加关联用户</Button>
                <Button key="2">编辑订单信息</Button>
                </>
            ]}
        >
        <Descriptions title="订单信息" style={{marginTop:'20px'}}>
            <Descriptions.Item label="订单id">{OrderInfo.oid}</Descriptions.Item>
            <Descriptions.Item label="开始时间">{OrderInfo.start_time}</Descriptions.Item>
            <Descriptions.Item label="结束时间">{OrderInfo.end_time}</Descriptions.Item>
            <Descriptions.Item label="总价">{OrderInfo.total_price}</Descriptions.Item>
            <Descriptions.Item label="状态">{OrderInfo.state}</Descriptions.Item>
            <Descriptions.Item label="介绍">{OrderInfo.introduction}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="关联商家信息" style={{marginTop:'20px'}}>
            <Descriptions.Item label="id">{BusinessInfo.bid}</Descriptions.Item>
            <Descriptions.Item label="账户">{BusinessInfo.account}</Descriptions.Item>
            <Descriptions.Item label="名称">{BusinessInfo.name}</Descriptions.Item>
            <Descriptions.Item label="介绍">{BusinessInfo.introduction}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="参与用户信息" style={{marginTop:'20px'}}></Descriptions>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        {userListInfo?.map((item,index) => {
        return(
        <Card title={`User${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="id">{item.uid}</Descriptions.Item>
                <Descriptions.Item label="账户">{item.account}</Descriptions.Item>
                <Descriptions.Item label="名称">{item.name}</Descriptions.Item>
                <Descriptions.Item label="年龄">{item.age}</Descriptions.Item>
                <Descriptions.Item label="性别">{item.sex}</Descriptions.Item>
            </Descriptions>
        </Card>
        )
        })}
        </div>
        </PageHeader>
        }
        </div>
        )
    }
}
export default withRouter(OrderDetail);