import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Card, Menu, Descriptions, PageHeader, Spin } from 'antd';
import {QueryOrderDetailByoid, UpdateOrder, QueryPay_goodsByOid, QueryDeliveryByOid} from '../../../static/request/order';
import {QueryGoodsByGid } from '../../../static/request/product';
import './index.css';
import { withRouter } from '../../../static/compoments/withRouter';
import { NavigateFunction } from 'react-router-dom';
import qs from 'qs';
import { UserDto } from '../../../static/response';
import { OrderDto } from '../../../static/resType/order';
import { BusinessDto } from '../../../static/resType/business';
interface OrderDetailState{
    userListInfo: UserDto[],
    BusinessInfo: BusinessDto,
    OrderInfo: OrderDto,
    DeliveryInfo: DeliveryDto[],
    Pay_goodsInfo: PayGoodsDto[],
    GoodsInfo: any,
    oid: number,
    isLoading: boolean
}
interface DeliveryDto{
    state: number,
    uid: number
}
interface PayGoodsDto{
    state: number,
    uid: number,
    gcount: number
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
            DeliveryInfo: [] as DeliveryDto[],
            Pay_goodsInfo: [] as PayGoodsDto[],
            GoodsInfo: {},
            isLoading: false
        };
    }
    
    async componentDidMount(){
        const search = this.props.location.search;
        const query = qs.parse(search.substring(1,search.length));
        let oid: any = query['oid'] ? query['oid'] : '0';
        this.setState({isLoading: true})
        const res = await QueryOrderDetailByoid(parseInt(oid));
        const res1 = await QueryPay_goodsByOid(parseInt(oid));
        const res2 = await QueryDeliveryByOid(parseInt(oid));
        const res3 = await QueryGoodsByGid(res.data.order.gid);
        const Parray = res1.data.sort((a,b) => {
            return a.uid - b.uid;
        })
        const Darray = res2.data.sort((a,b) => {
            return a.uid - b.uid;
        })
        this.setState({
            userListInfo: res.data.users,
            BusinessInfo: res.data.business,
            OrderInfo: res.data.order,
            Pay_goodsInfo: Parray,
            DeliveryInfo: Darray,
            GoodsInfo: res3.data,
        })
        this.setState({isLoading: false})
    }
    render(){
        const {navigate} = this.props;
        const {userListInfo,BusinessInfo,OrderInfo,DeliveryInfo,Pay_goodsInfo,isLoading,GoodsInfo} = this.state;
        console.log(userListInfo);
        return(
        <div style={{background:'white',padding:'10px 30px'}}>
            {isLoading ? <Spin size="large" /> : 
            <PageHeader
            ghost={false}
            onBack={() => navigate('/order/list')}
            title="??????????????????"
            extra={[
                <>
                <Button key="1">??????????????????</Button>
                </>
            ]}
        >
        <Descriptions title="????????????" style={{marginTop:'20px'}}>
            <Descriptions.Item label="??????id">{OrderInfo.oid}</Descriptions.Item>
            <Descriptions.Item label="????????????">{OrderInfo.start_time}</Descriptions.Item>
            <Descriptions.Item label="????????????">{OrderInfo.end_time}</Descriptions.Item>
            <Descriptions.Item label="??????">{OrderInfo.total_price}</Descriptions.Item>
            <Descriptions.Item label="??????">{OrderInfo.state}</Descriptions.Item>
            <Descriptions.Item label="??????">{OrderInfo.introduction}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="??????????????????" style={{marginTop:'20px'}}>
            <Descriptions.Item label="id">{BusinessInfo.bid}</Descriptions.Item>
            <Descriptions.Item label="??????">{BusinessInfo.account}</Descriptions.Item>
            <Descriptions.Item label="??????">{BusinessInfo.name}</Descriptions.Item>
            <Descriptions.Item label="??????">{BusinessInfo.introduction}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="??????????????????" style={{marginTop:'20px'}}>
            <Descriptions.Item label="id">{GoodsInfo.gid}</Descriptions.Item>
            <Descriptions.Item label="??????">{GoodsInfo.name}</Descriptions.Item>
            <Descriptions.Item label="??????">{GoodsInfo.price}</Descriptions.Item>
            <Descriptions.Item label="??????">{GoodsInfo.type}</Descriptions.Item>
            <Descriptions.Item label="??????">{GoodsInfo.introduction}</Descriptions.Item>
            <Descriptions.Item label="??????">{GoodsInfo.count}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="??????????????????" style={{marginTop:'20px'}}></Descriptions>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        {userListInfo?.map((item,index) => {
        return(
        <Card title={`User${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="id">{item.uid}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.account}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.name}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.age}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.sex}</Descriptions.Item>
                <Descriptions.Item label="????????????">{DeliveryInfo[index]?.state === 0 ? '?????????' : DeliveryInfo[index]?.state === 1 ? '?????????' :  DeliveryInfo[index]?.state === 2 ? '?????????' : '?????????'}</Descriptions.Item>
                <Descriptions.Item label="????????????">{Pay_goodsInfo[index].gcount}</Descriptions.Item>
                <Descriptions.Item label="????????????">{Pay_goodsInfo[index].state === 0 ? '?????????' : '?????????'}</Descriptions.Item>
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