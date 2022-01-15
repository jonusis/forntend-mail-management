interface BuyBto{
    content: string;
    datetime: string;
    full: number;
    heading: string;
    id: number;
    kind: number;
    location:string;
    numExist: number;
    numNeed: number;
    picture: string;
    postID: string;
    qq: string;
    tel: string;
    time: string;
    wechat: string;
}

export class BuyDto{
    content: string;
    datetime: string;
    full: string;
    heading: string;
    id: number;
    kind: number;
    location:string;
    numExist: number;
    numNeed: number;
    picture: string;
    postID: string;
    qq: string;
    tel: string;
    time: string;
    wechat: string;
    constructor(buy:BuyBto){
        this.content = buy.content;
        this.datetime = buy.datetime;
        this.full = buy.full == 0? '未满':'已满';
        this.heading = buy.heading;
        this.id = buy.id;
        this.kind = buy.kind;
        this.location = buy.location;
        this.numExist = buy.numExist;
        this.numNeed = buy.numNeed;
        this.picture = buy.picture;
        this.postID = buy.postID;
        this.qq = buy.qq;
        this.tel = buy.tel;
        this.time = buy.time;
        this.wechat = buy.wechat;
    }
}
export class BuyResponseDto{
    data: BuyDto
    msg: string
    code: number // 状态码
    constructor(message: BuyResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new BuyDto(message.data);
    }
}
export class BuyDetailResponseDto{
    data: any
    msg: string
    code: number // 状态码
    constructor(message: BuyResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = message.data;
    }
}
export class  BuyResponseArrayDto{
    data: BuyDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: BuyArrayResDto){
        const localData: BuyDto[] = []
        message.data.forEach((item: BuyBto) => localData.push(new BuyDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface BuyResDto{
    code:number
    msg:string
    data: BuyBto
}

interface BuyArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: BuyBto[]
}
