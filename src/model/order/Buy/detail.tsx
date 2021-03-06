import React from 'react';
import { Form, Input, Button, Checkbox, Divider, FormInstance, Card, Menu, Descriptions, PageHeader, Spin, Avatar,Image } from 'antd';
import {QueryOrderDetailByoid, UpdateOrder, QueryPay_goodsByOid, QueryDeliveryByOid} from '../../../static/request/order';
import {QueryGoodsByGid } from '../../../static/request/product';
import './index.css';
import { withRouter } from '../../../static/compoments/withRouter';
import { NavigateFunction } from 'react-router-dom';
import qs from 'qs';
import { UserDto } from '../../../static/response';
import { OrderDto } from '../../../static/resType/order';
import { BusinessDto } from '../../../static/resType/business';
import { BuyDto } from '../../../static/resType/buy';
import { getOrderbuyDetailByid } from '../../../static/request/buy';
interface OrderDetailState{
    userListInfo: UserDto[],
    commentsInfo: any,
    orderbuyInfo: BuyDto,
    oid: number,
    isLoading: boolean
}
interface OrderDetailProps{
    navigate: NavigateFunction
    location: Location
}

class BuyDetail extends React.Component<OrderDetailProps,OrderDetailState>{
    formRef = React.createRef<FormInstance>();
    constructor(props: OrderDetailProps){
        super(props);
        this.state = {
            oid: 0,
            userListInfo: [] as UserDto[],
            commentsInfo: [],
            orderbuyInfo: {} as BuyDto,
            isLoading: false
        };
    }
    
    async componentDidMount(){
        const search = this.props.location.search;
        const query = qs.parse(search.substring(1,search.length));
        let oid: any = query['oid'] ? query['oid'] : '0';
        this.setState({isLoading: true})
        const res = await getOrderbuyDetailByid({orderID: parseInt(oid)});
        this.setState({
            userListInfo: res.data.userInfo,
            commentsInfo: res.data.comments,
            orderbuyInfo: res.data.orderbuy,
        })
        this.setState({isLoading: false})
    }
    render(){
        const {navigate} = this.props;
        const {userListInfo,commentsInfo,orderbuyInfo,isLoading} = this.state;
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
            <Descriptions.Item label="??????id">{orderbuyInfo.id}</Descriptions.Item>
            <Descriptions.Item label="??????">{orderbuyInfo.kind === 1 ? "??????" : orderbuyInfo.kind === 2 ? "????????????":orderbuyInfo.kind === 3 ? "??????": "??????"}</Descriptions.Item>
            <Descriptions.Item label="??????">{orderbuyInfo.heading}</Descriptions.Item>
            <Descriptions.Item label="??????">{orderbuyInfo.content}</Descriptions.Item>
            <Descriptions.Item label="????????????">{orderbuyInfo.datetime}</Descriptions.Item>
            <Descriptions.Item label="??????????????????">{orderbuyInfo.numExist}</Descriptions.Item>
            <Descriptions.Item label="??????????????????">{orderbuyInfo.numNeed}</Descriptions.Item>
            <Descriptions.Item label="????????????">{orderbuyInfo.full}</Descriptions.Item>
            <Descriptions.Item label="?????????id">{orderbuyInfo.postID}</Descriptions.Item>
            <Descriptions.Item label="??????qq">{orderbuyInfo.qq}</Descriptions.Item>
            <Descriptions.Item label="????????????">{orderbuyInfo.wechat}</Descriptions.Item>
            <Descriptions.Item label="????????????">{orderbuyInfo.tel}</Descriptions.Item>
            <Descriptions.Item label="??????">{orderbuyInfo.picture? <Avatar shape="square" size={64} icon={<Image src={orderbuyInfo.picture}></Image>} /> : "???????????????"}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="????????????" style={{marginTop:'20px'}}></Descriptions>
        {commentsInfo?.map((item: any,index: number) => {
            return (
            <Card title={`Comments${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="???????????????">{item.username}</Descriptions.Item>
                <Descriptions.Item label="??????????????????">{item.headpicture? <Avatar shape="square" size={64} icon={<Image src={item.headpicture}></Image>} /> : "???????????????" }</Descriptions.Item>
                <Descriptions.Item label="??????">{item.datatime}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.content}</Descriptions.Item>
            </Descriptions>
             </Card>
        )
        })
        }
        <Descriptions title="??????????????????" style={{marginTop:'20px'}}></Descriptions>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        {userListInfo?.map((item,index) => {
            if(item === null) return <></>
        return(
        <Card title={`User${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="id">{item?.uid}</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.account}</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.name}</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.age}</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.sex}</Descriptions.Item>
                <Descriptions.Item label="??????">{item.headPicture? <Avatar shape="square" size={64} icon={<Image src={item.headPicture}></Image>} /> : "???????????????" }</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.tel}</Descriptions.Item>
                <Descriptions.Item label="??????">{item?.wechat}</Descriptions.Item>
                <Descriptions.Item label="qq">{item?.qq}</Descriptions.Item>
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
export default withRouter(BuyDetail);