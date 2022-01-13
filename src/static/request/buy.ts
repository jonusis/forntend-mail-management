import qs from "qs";
import Request from "../request"
import { BuyResponseDto, BuyResponseArrayDto } from "../resType/buy";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetBuyList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/order/buy/list?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
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
    const res = await request.Fetch(`${url}/Buy/addBuy`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteBuy = async (uid: number) => {
    const res = await request.Fetch(`${url}/Buy/deleteBuy?uid=${uid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryBuyById = async (uid: number) => {
    const res = await request.Fetch(`${url}/Buy/queryBuyById?uid=${uid}`,'GET');
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
    const res = await request.Fetch(`${url}/Buy/updateBuy`,'PUT',body);
    return new ResponseStateDto(res);
}

export const SearchBuyList = async (
    param:{
    id?: number,
    }
    ) => {
    const res = await request.Fetch(`${url}/Buy/searchBuy?${qs.stringify(param)}`,'GET');
    return new BuyResponseArrayDto(res);
}