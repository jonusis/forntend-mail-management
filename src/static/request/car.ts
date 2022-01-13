import qs from "qs";
import Request from "../request"
import { CarResponseDto, CarResponseArrayDto } from "../resType/car";
import {ResponseStateDto} from '../response'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetCarList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/order/Car/list?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new CarResponseArrayDto(res);
}

export const AddCar = async (
    body:{
        content: string;
        full: number;
        heading: string;
        id: number;
        placeA: string;
        placeB:string;
        numExist: number;
        numNeed: number;
        postID: string;
        qq: string;
        tel: string;
        time: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/Car/addCar`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteCar = async (uid: number) => {
    const res = await request.Fetch(`${url}/Car/deleteCar?uid=${uid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryCarById = async (uid: number) => {
    const res = await request.Fetch(`${url}/Car/queryCarById?uid=${uid}`,'GET');
    return new CarResponseDto(res);
}

export const UpdateCar = async (    
    body:{
        content: string;
        full: number;
        heading: string;
        id: number;
        placeA: string;
        placeB:string;
        numExist: number;
        numNeed: number;
        postID: string;
        qq: string;
        tel: string;
        time: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/Car/updateCar`,'PUT',body);
    return new ResponseStateDto(res);
}

export const SearchCarList = async (
    param:{
    id?: number,
    }
    ) => {
    const res = await request.Fetch(`${url}/Car/searchCar?${qs.stringify(param)}`,'GET');
    return new CarResponseArrayDto(res);
}