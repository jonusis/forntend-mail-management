import qs from "qs";
import Request from "../request"
import { UserResponseDto, ResponseStateDto, UserResponseArrayDto } from "../response";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const GetUserList = async (pageNum?: number,pageSize?: number) => {
    const res = await request.Fetch(`${url}/user/queryUserList?pageNum=${pageNum}&pageSize=${pageSize}`,'GET');
    return new UserResponseArrayDto(res);
}

export const AddUser = async (
    body:{
        account : string;
        age : number;
        uid: number;
        sex: string;
        name: string;
        password:string;
        stNum: string;
        headPicture: string;
        tel: string;
        qq: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/user/addUser`,'POST',body);
    return new ResponseStateDto(res);
}

export const DeleteUser = async (uid: number) => {
    const res = await request.Fetch(`${url}/user/deleteUser?uid=${uid}`,'DELETE');
    return new ResponseStateDto(res);
}

export const QueryUserById = async (uid: number) => {
    const res = await request.Fetch(`${url}/user/queryUserById?uid=${uid}`,'GET');
    return new UserResponseDto(res);
}

export const UpdateUser = async (    
    body:{
        account : string;
        age : number;
        uid: number;
        sex: string;
        name: string;
        password:string;
        stNum: string;
        headPicture: string;
        tel: string;
        qq: string;
        wechat: string;
    }
) => {
    const res = await request.Fetch(`${url}/user/updateUser`,'PUT',body);
    return new ResponseStateDto(res);
}

export const SearchUserList = async (
    param:{
    username?: string,
    id?: number,
    age?:string,
    sex?:string
    }
    ) => {
    const res = await request.Fetch(`${url}/user/searchUser?${qs.stringify(param)}`,'GET');
    return new UserResponseArrayDto(res);
}