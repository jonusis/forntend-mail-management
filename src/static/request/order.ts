import Request from "../request"
import { OrdersResponseDto, OrdersResponseArrayDto } from "../resType/order";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetOrdersList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryOrdersList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}

export const AddOrders = async (
    body:{
        bid: number,
        end_time: string,
        gid: number,
        introduction: string,
        oid: number,
        start_time: string,
        state: number,
        total_price: number
    }
) => {
    const res = await request.Fetch(`${url}/user/addOrders`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteOrders = async (oid: number) => {
    const res = await request.Fetch(`${url}/user/deleteOrders?bid=${oid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryOrdersByBid = async (bid: number,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryOrdersByBid?bid=${bid}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}
export const QueryOrdersByoid = async (oid: number) => {
    const res = await request.Fetch(`${url}/user/queryOrdersByoid?uid=${oid}`,'GET');
    return new OrdersResponseDto(res);
}
export const QueryOrdersByType = async (type: string,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryOrdersByType?type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new OrdersResponseArrayDto(res);
}

export const UpdateOrders = async (    
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
    const res = await request.Fetch(`${url}/user/updateOrders`,'PUT',body);
    return new ResponseStateDto(res);
}
