import qs from "qs";
import Request from "../request"
import { BuyResponseDto, BuyResponseArrayDto } from "../resType/buy";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetBuyList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/orderbuy/getOrderBuyList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new BuyResponseArrayDto(res);
}

export const AddBuy = async (
    body:{
        content: string;
        datetime: string;
        full: number;
        heading: string;
        id: number;
        kind: number;
        location:string;
        numExist: number;
        numNeed: number;
        picture: string;
        postID: string;
        qq: string;
        tel: string;
        time: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/orderbuy/addOrderBuy`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteBuy = async (orderbuyID: number) => {
    const res = await request.Fetch(`${url}/orderbuy/deleteOrderBuy?orderbuyID=${orderbuyID}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryBuyById = async (uid: number) => {
    const res = await request.Fetch(`${url}/orderbuy/queryOrderBuyListById?uid=${uid}`,'GET');
    return new BuyResponseDto(res);
}

export const UpdateBuy = async (    
    body:{
        content: string;
        datetime: string;
        full: number;
        heading: string;
        id: number;
        kind: number;
        location:string;
        numExist: number;
        numNeed: number;
        picture: string;
        postID: string;
        qq: string;
        tel: string;
        time: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/orderbuy/updateOrderBuy`,'PUT',body);
    return new ResponseStateDto(res);
}

export const SearchBuyList = async (
    param:{
    userID?: string,
    }
    ) => {
    const res = await request.Fetch(`${url}/orderbuy/queryOrderBuyListById?${qs.stringify(param)}`,'GET');
    return new BuyResponseArrayDto(res);
}