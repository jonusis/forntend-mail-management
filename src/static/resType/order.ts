interface OrdersBto{
	bid: number;
    count: number;
    gid: number;
	introduction: string;
	name: string;
	price: number;
    type: string;
}
export class OrdersDto{
    bid: number;
    count: number;
    gid: number;
	introduction: string;
	name: string;
	price: number;
    type: string;
    constructor(Orders:OrdersBto){
        this.count = Orders.count;
        this.bid = Orders.bid;
        this.introduction = Orders.introduction;
        this.name = Orders.name;
        this.price = Orders.price;
        this.gid = Orders.gid;
        this.type = Orders.type;
    }
}
export class OrdersResponseDto{
    data: OrdersDto
    msg: string
    code: number // 状态码
    constructor(message: OrdersResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new OrdersDto(message.data);
    }
}
export class OrdersResponseArrayDto{
    data: OrdersDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: OrdersArrayResDto){
        const localData: OrdersDto[] = []
        message.data.forEach((item: OrdersBto) => localData.push(new OrdersDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface OrdersResDto{
    code:number
    msg:string
    data: OrdersBto
}

interface OrdersArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: OrdersBto[]
}