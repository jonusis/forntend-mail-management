export class UserResponseDto{
    data: UserDto
    msg: string
    code: number // 状态码
    constructor(message: UserResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new UserDto(message.data);
    }
}
export class UserResponseArrayDto{
    data: UserDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: UserArrayResDto){
        const localData: UserDto[] = []
        message.data.forEach((item: UserBto) => localData.push(new UserDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}
export class ResponseStateDto{
    data: string
    msg: string
    code: number // 状态码
    constructor(message: ResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = message.data;
    }
}
export interface UserBto{
    account : string;
    age : number;
    uid: number;
    sex: number;
    name: string;
    password:string;
    userPicture: string;
    stNum: string;
    headPicture: string;
    tel: string;
    qq: string;
    wechat: string;
}
export class UserDto{
    account : string;
    age : number;
    uid: number;
    sex: string;
    name: string;
    password:string;
    userPicture: string;
    stNum: string;
    headPicture: string;
    tel: string;
    qq: string;
    wechat: string;
    constructor(user: UserBto){
        this.uid = user.uid;
        this.account = user.account;
        this.name = user.name;
        this.userPicture = user.userPicture;
        this.stNum = user.stNum;
        this.tel = user.tel;
        this.headPicture = user.headPicture;
        this.qq = user.qq;
        this.wechat = user.wechat;
        this.age  = user.age;
        this.password = user.password;
        this.sex = user.sex === 1? '男':'女' ; 
    }
}
interface UserResDto{
    code:number
    msg:string
    data: UserBto
}
interface UserArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: UserBto[]
}
interface ResDto{
    code:number
    msg:string
    data: string
}