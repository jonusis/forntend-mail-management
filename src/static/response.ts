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
interface UserBto{
    name: string;
    uid: number;
    account: string;
    password?: string;
    age: number;
    sex: number;
}
export class UserDto{
    name: string;
    uid: number;
    account: string;
    password?: string;
    age: number;
    sex: string;
    key: number;
    constructor(user: UserBto){
        this.name = user.name;
        this.key = user.uid;
        this.uid = user.uid;
        this.account = user.account;
        this.age = user.age;
        this.sex = user.sex === 0 ? '女' : '男';
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