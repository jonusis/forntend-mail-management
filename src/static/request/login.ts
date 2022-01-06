import Request from "../request"
import { UserResponseDto } from "../response";
import {BusinessResponseDto} from '../resType/business'
const request = Request.GetInstance();
const url = Request.GetUrl();

export const UserLogin = async (username: string,password: string) => {
    const res = await request.Fetch(`${url}/login?username=${username}&password=${password}`,'POST');
    return new UserResponseDto(res);
}

export const BusinessLogin = async (account: string,password: string) => {
    const res = await request.Fetch(`${url}/BusinessLogin?username=${account}&password=${password}`,'POST');
    return new BusinessResponseDto(res);
}