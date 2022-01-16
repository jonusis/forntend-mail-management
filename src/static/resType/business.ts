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
