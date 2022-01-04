import Request from "../request"
import { BusinessResponseDto, ResponseStateDto, BusinessResponseArrayDto } from "../response";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetBusinessList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryBusinessList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
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
    const res = await request.Fetch(`${url}/user/addBusiness`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteBusiness = async (bid: number) => {
    const res = await request.Fetch(`${url}/user/deleteBusiness?bid=${bid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryBusinessById = async (bid: number) => {
    const res = await request.Fetch(`${url}/user/queryBusinessById?uid=${bid}`,'GET');
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
    const res = await request.Fetch(`${url}/user/updateBusiness`,'PUT',body);
    return new ResponseStateDto(res);
}
