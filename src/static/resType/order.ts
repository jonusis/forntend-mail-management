import { BusinessDto, UserBto, UserDto } from "../response";

interface OrderBto{
    oid: number,
    bid: number,
    gid: number,
    introduction: string,
    start_time: string,
    end_time: string,
    state: number,
    total_price: number
}
enum OrderState{
    Start = 0,
    Pandding = 1,
    Success = 2,
    Failed = 3
}
export class OrderDto{
    oid: number;
    bid: number;
    gid: number;
    introduction: string;
    start_time: string;
    end_time: string;
    state: OrderState; //0为订单已发起 1为订单进行中 2为订单拼单成功 3为拼单失败
    total_price: number;
    constructor(Orders:OrderBto){
        this.oid = Orders.oid;
        this.bid = Orders.bid;
        this.gid = Orders.gid;
        this.introduction = Orders.introduction;
        this.start_time = Orders.start_time;
        this.end_time = Orders.end_time;
        this.state = Orders.state;
        this.total_price = Orders.total_price;
    }
}
export class OrdersResponseDto{
    data: OrderDto
    msg: string
    code: number // 状态码
    constructor(message: OrderResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new OrderDto(message.data);
    }
}
export class OrdersResponseDetailDto{
    data: OrdersDetailDto
    msg: string
    code: number // 状态码
    constructor(message: any){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new OrdersDetailDto(message.data);
    }
}
export class OrdersDetailDto{
    business: BusinessDto
    order: OrderDto
    users: UserDto[]
    constructor(message: OrderDetailResBto){
        const localData: UserDto[] = []
        message.users.forEach((item: UserBto) => localData.push(new UserDto(item)))
        this.business = message.business;
        this.order = message.order;
        this.users = localData;
    }
}
interface OrderDetailResBto{
    business: BusinessDto
    order: OrderDto
    users: UserBto[]
}
export class OrdersResponseArrayDto{
    data: OrderDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: OrderArrayResDto){
        const localData: OrderDto[] = []
        message.data.forEach((item: OrderBto) => localData.push(new OrderDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface OrderResDto{
    code:number
    msg:string
    data: OrderBto
}

interface OrderArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: OrderBto[]
}