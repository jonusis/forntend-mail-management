import Request from "../request"
import { BusinessResponseDto, BusinessResponseArrayDto } from "../resType/business";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetBusinessList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/business/queryBusinessList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new BusinessResponseArrayDto(res);
}

export const AddBusiness = async (
    body:{
        account: number;
        bid: number;
        introduction: string;
        name: string;
        password: number;
    }
) => {
    const res = await request.Fetch(`${url}/business/addBusiness`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteBusiness = async (bid: number) => {
    const res = await request.Fetch(`${url}/business/deleteBusiness?bid=${bid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryBusinessById = async (bid: number) => {
    const res = await request.Fetch(`${url}/business/queryBusinessById?bid=${bid}`,'GET');
    return new BusinessResponseDto(res);
}

export const UpdateBusiness = async (    
    body:{
        account: number;
        bid: number;
        introduction: string;
        name: string;
        password: number;
    }
) => {
    const res = await request.Fetch(`${url}/business/updateBusiness`,'PUT',body);
    return new ResponseStateDto(res);
}
