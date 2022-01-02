import Request from "../request"
import DialogDto from "../response";
const request = Request.GetInstance();
const url = Request.GetUrl();

export const PostMessage = async (question: string) => {
    const body = {question:question};
    const res = await request.Fetch(`${url}/PostMessage`,'POST',body);
    return new DialogDto(res);
}