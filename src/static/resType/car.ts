interface CarBto{
    content: string;
    full: number;
    heading: string;
    id: number;
    placeA: string;
    placeB:string;
    numExist: number;
    numNeed: number;
    postID: string;
    qq: string;
    tel: string;
    time: string;
    wechat: string;
}

export class CarDto{
    content: string;
    full: string;
    heading: string;
    id: number;
    placeA: string;
    placeB:string;
    numExist: number;
    numNeed: number;
    postID: string;
    qq: string;
    tel: string;
    time: string;
    wechat: string;
    constructor(Car:CarBto){
        this.content = Car.content;
        this.full = Car.full == 0? '未满':'已满';
        this.heading = Car.heading;
        this.id = Car.id;
        this.placeA = Car.placeA;
        this.placeB = Car.placeB;
        this.numExist = Car.numExist;
        this.numNeed = Car.numNeed;
        this.postID = Car.postID;
        this.qq = Car.qq;
        this.tel = Car.tel;
        this.time = Car.time;
        this.wechat = Car.wechat;
    }
}
export class CarResponseDto{
    data: CarDto
    msg: string
    code: number // 状态码
    constructor(message: CarResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new CarDto(message.data);
    }
}
export class  CarResponseArrayDto{
    data: CarDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: CarArrayResDto){
        const localData: CarDto[] = []
        message.data.forEach((item: CarBto) => localData.push(new CarDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface CarResDto{
    code:number
    msg:string
    data: CarBto
}

interface CarArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: CarBto[]
}
