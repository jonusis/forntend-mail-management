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


interface BusinessBto{
    account: number;
	bid: number;
	introduction: string;
	name: string;
	password: number;
}

export class BusinessDto{
    account: number;
	bid: number;
	introduction: string;
	name: string;
	password: number;
    constructor(business:BusinessBto){
        this.account = business.account;
        this.bid = business.bid;
        this.introduction = business.introduction;
        this.name = business.name;
        this.password = business.password;
    }
}
export class BusinessResponseDto{
    data: BusinessDto
    msg: string
    code: number // 状态码
    constructor(message: BusinessResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new BusinessDto(message.data);
    }
}
export class  BusinessResponseArrayDto{
    data: BusinessDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: BusinessArrayResDto){
        const localData: BusinessDto[] = []
        message.data.forEach((item: BusinessBto) => localData.push(new BusinessDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface BusinessResDto{
    code:number
    msg:string
    data: BusinessBto
}

interface BusinessArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: BusinessBto[]
}