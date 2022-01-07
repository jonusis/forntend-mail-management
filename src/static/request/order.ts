import Request from "../request"
import { OrdersResponseDto, OrdersResponseArrayDto,OrdersResponseDetailDto, OrdersPay_GoodsDto, OrdersDeliveryDto } from "../resType/order";
import {ResponseStateDto} from '../response'
import { GoodsResponseArrayDto, GoodsResponseDto } from "../resType/product";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetOrderList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/orders/queryOrderList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}

export const AddOrder = async (
    body:{
        oid: number,
        bid: number,
        gid: number,
        introduction: string,
        start_time: string,
        end_time: string,
        state: number,
        total_price: number
    }
) => {
    const res = await request.Fetch(`${url}/orders/addOrder`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteOrder = async (oid: number) => {
    const res = await request.Fetch(`${url}/orders/deleteOrder?oid=${oid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryOrderByBid = async (bid: number,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/orders/queryOrderByBid?bid=${bid}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}
export const QueryOrderByoid = async (oid: number) => {
    const res = await request.Fetch(`${url}/orders/queryOrderByoid?oid=${oid}`,'GET');
    return new OrdersResponseDto(res);
}
export const QueryOrderByType = async (type: string,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/orders/queryOrderByType?type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}

export const UpdateOrder = async (    
    body:{
        oid: number,
        bid: number,
        gid: number,
        introduction: string,
        start_time: string,
        end_time: string,
        state: number,
        total_price: number
    }
) => {
    const res = await request.Fetch(`${url}/orders/updateOrder`,'PUT',body);
    return new ResponseStateDto(res);
}

export const QueryOrderDetailByoid = async (oid: number) => {
    const res = await request.Fetch(`${url}/orders/queryOrderDetailByOid?oid=${oid}`,'GET');
    return new OrdersResponseDetailDto(res);
}

export const QueryPay_goodsByOid = async (oid: number) => {
    const res = await request.Fetch(`${url}/pay_goods/queryPay_goodsByOid?oid=${oid}`,'GET');
    return new OrdersPay_GoodsDto(res);
}

export const QueryDeliveryByOid = async (oid: number) => {
    const res = await request.Fetch(`${url}/delivery/queryDeliveryByOid?oid=${oid}`,'GET');
    return new OrdersDeliveryDto(res);
}

export const QueryGoodsByGid = async (gid: number) => {
    const res = await request.Fetch(`${url}/goods/queryGoodsByGid?gid=${gid}`,'GET');
    return new GoodsResponseDto(res);
}
