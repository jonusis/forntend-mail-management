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
            title="订单详细信息"
            extra={[
                <>
                <Button key="1">编辑订单信息</Button>
                </>
            ]}
        >
        <Descriptions title="订单信息" style={{marginTop:'20px'}}>
            <Descriptions.Item label="订单id">{orderbuyInfo.id}</Descriptions.Item>
            <Descriptions.Item label="类型">{orderbuyInfo.kind === 1 ? "网购" : orderbuyInfo.kind === 2 ? "会员账号":orderbuyInfo.kind === 3 ? "其他": "外卖"}</Descriptions.Item>
            <Descriptions.Item label="标题">{orderbuyInfo.heading}</Descriptions.Item>
            <Descriptions.Item label="内容">{orderbuyInfo.content}</Descriptions.Item>
            <Descriptions.Item label="发起时间">{orderbuyInfo.datetime}</Descriptions.Item>
            <Descriptions.Item label="已经拼单人数">{orderbuyInfo.numExist}</Descriptions.Item>
            <Descriptions.Item label="需要拼单人数">{orderbuyInfo.numNeed}</Descriptions.Item>
            <Descriptions.Item label="是否拼满">{orderbuyInfo.full}</Descriptions.Item>
            <Descriptions.Item label="发起人id">{orderbuyInfo.postID}</Descriptions.Item>
            <Descriptions.Item label="联系qq">{orderbuyInfo.qq}</Descriptions.Item>
            <Descriptions.Item label="联系微信">{orderbuyInfo.wechat}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{orderbuyInfo.tel}</Descriptions.Item>
            <Descriptions.Item label="图片">{orderbuyInfo.picture? <Avatar shape="square" size={64} icon={<Image src={orderbuyInfo.picture}></Image>} /> : "图片未设置"}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="评论信息" style={{marginTop:'20px'}}></Descriptions>
        {commentsInfo?.map((item: any,index: number) => {
            return (
            <Card title={`Comments${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="评论用户名">{item.username}</Descriptions.Item>
                <Descriptions.Item label="评论用户头像">{item.headpicture? <Avatar shape="square" size={64} icon={<Image src={item.headpicture}></Image>} /> : "头像未设置" }</Descriptions.Item>
                <Descriptions.Item label="时间">{item.datatime}</Descriptions.Item>
                <Descriptions.Item label="内容">{item.content}</Descriptions.Item>
            </Descriptions>
             </Card>
        )
        })
        }
        <Descriptions title="参与用户信息" style={{marginTop:'20px'}}></Descriptions>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        {userListInfo?.map((item,index) => {
            if(item === null) return <></>
        return(
        <Card title={`User${index}`} bordered={true} style={{width:'500px',marginTop:'20px',marginLeft:'10px'}}>
            <Descriptions>
                <Descriptions.Item label="id">{item?.uid}</Descriptions.Item>
                <Descriptions.Item label="账户">{item?.account}</Descriptions.Item>
                <Descriptions.Item label="名称">{item?.name}</Descriptions.Item>
                <Descriptions.Item label="年龄">{item?.age}</Descriptions.Item>
                <Descriptions.Item label="性别">{item?.sex}</Descriptions.Item>
                <Descriptions.Item label="头像">{item.headPicture? <Avatar shape="square" size={64} icon={<Image src={item.headPicture}></Image>} /> : "头像未设置" }</Descriptions.Item>
                <Descriptions.Item label="电话">{item?.tel}</Descriptions.Item>
                <Descriptions.Item label="微信">{item?.wechat}</Descriptions.Item>
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