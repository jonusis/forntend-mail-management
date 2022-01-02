import Request from "../request"
import DialogDto, { ResponseDto } from "../response";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const UserLogin = async (username: string,password: string) => {
    const res = await request.Fetch(`${url}/login?username=${username}&password=${password}`,'POST');
    return new ResponseDto(res);
}