import Request from "../request"
import { OrdersResponseDto, OrdersResponseArrayDto,OrdersResponseDetailDto } from "../resType/order";
import {ResponseStateDto} from '../response'
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