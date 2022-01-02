export default class DialogDto{
    id: string
    type: number // 1表示我自己发送的 2表示其他人发送的
    content: string
    code: number // 状态码
    constructor(message: DialogResDto){
        this.id = message.data.id;
        this.type = message.data.type;
        this.content = message.data.content;
        this.code = message.code;
    }
}
interface DialogResDto{
    code:number
    msg:string
    data: message
}
interface message{
    id: string
    type: number // 1表示我自己发送的 2表示其他人发送的
    content: string 
}

export class ResponseDto{
    data: any
    msg: string
    code: number // 状态码
    constructor(message: DialogResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = message.data;
    }
}