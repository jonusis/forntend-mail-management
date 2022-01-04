import Request from "../request"
import { GoodsResponseDto, ResponseStateDto, GoodsResponseArrayDto } from "../response";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetGoodsList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryGoodsList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new GoodsResponseArrayDto(res);
}

export const AddGoods = async (
    body:{
        bid: number;
        count: number;
        gid: number;
        introduction: string;
        name: string;
        price: number;
        type: string;
    }
) => {
    const res = await request.Fetch(`${url}/user/addGoods`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteGoods = async (gid: number) => {
    const res = await request.Fetch(`${url}/user/deleteGoods?bid=${gid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryGoodsByBid = async (bid: number,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryGoodsByBid?bid=${bid}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new GoodsResponseArrayDto(res);
}
export const QueryGoodsByGid = async (gid: number) => {
    const res = await request.Fetch(`${url}/user/queryGoodsByGid?uid=${gid}`,'GET');
    return new GoodsResponseDto(res);
}
export const QueryGoodsByType = async (type: string,pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryGoodsByType?type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new GoodsResponseArrayDto(res);
}

export const UpdateGoods = async (    
    body:{
        bid: number;
        count: number;
        gid: number;
        introduction: string;
        name: string;
        price: number;
        type: string;
    }
) => {
    const res = await request.Fetch(`${url}/user/updateGoods`,'PUT',body);
    return new ResponseStateDto(res);
}
