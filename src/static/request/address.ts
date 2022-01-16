import Request from "../request"
import { AddressResponseDto, AddressResponseArrayDto } from "../resType/address";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetAddressList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/address/queryAddressList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new AddressResponseArrayDto(res);
}

export const AddAddress = async (
    body:{
        aid: number;
        city: string;
        detailedAddress: string;
        province: string;
        receivierName: string;
        telephone: number;
        uid: number;
    }
) => {
    const res = await request.Fetch(`${url}/address/addAddress`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteAddress = async (aid: number) => {
    const res = await request.Fetch(`${url}/address/deleteAddress?aid=${aid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryAddressByAid = async (aid: number) => {
    const res = await request.Fetch(`${url}/address/queryAddressByAid?aid=${aid}`,'GET');
    return new AddressResponseDto(res);
}

export const UpdateAddress = async (    
    body:{
        aid: number;
        city: string;
        detailedAddress: string;
        province: string;
        receivierName: string;
        telephone: number;
        uid: number;
    }
) => {
    const res = await request.Fetch(`${url}/address/updateAddress`,'PUT',body);
    return new ResponseStateDto(res);
}
