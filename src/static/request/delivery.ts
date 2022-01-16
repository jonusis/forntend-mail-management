import Request from "../request"
import { DeliveryResponseDto, DeliveryResponseArrayDto } from "../resType/delivery";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetDeliveryList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/delivery/queryDeliveryList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new DeliveryResponseArrayDto(res);
}

export const AddDelivery = async (
    body:{
        did: number;
        oid: number;
        state: number;
        uid: number;
    }
) => {
    const res = await request.Fetch(`${url}/delivery/addDelivery`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteDelivery = async (did: number) => {
    const res = await request.Fetch(`${url}/delivery/deleteDelivery?did=${did}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryDeliveryById = async (bid: number) => {
    const res = await request.Fetch(`${url}/delivery/queryDeliveryById?bid=${bid}`,'GET');
    return new DeliveryResponseDto(res);
}

export const UpdateDelivery = async (    
    body:{
        did: number;
        oid: number;
        state: number;
        uid: number;
    }
) => {
    const res = await request.Fetch(`${url}/delivery/updateDelivery`,'PUT',body);
    return new ResponseStateDto(res);
}
