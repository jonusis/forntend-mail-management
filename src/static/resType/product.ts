interface GoodsBto{
	bid: number;
    count: number;
    gid: number;
	introduction: string;
	name: string;
	price: number;
    type: string;
    category:string;
    cid:number;
}
export class GoodsDto{
    bid: number;
    count: number;
    gid: number;
	introduction: string;
	name: string;
	price: number;
    type: string;
    category:string;
    cid:number;
    constructor(goods:GoodsBto){
        this.count = goods.count;
        this.bid = goods.bid;
        this.introduction = goods.introduction;
        this.name = goods.name;
        this.price = goods.price;
        this.gid = goods.gid;
        this.type = goods.type;
        this.category = goods.category;
        this.cid = goods.cid;
    }
}
export class GoodsResponseDto{
    data: GoodsDto
    msg: string
    code: number // 状态码
    constructor(message: GoodsResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new GoodsDto(message.data);
    }
}
export class GoodsResponseArrayDto{
    data: GoodsDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: GoodsArrayResDto){
        const localData: GoodsDto[] = []
        message.data.forEach((item: GoodsBto) => localData.push(new GoodsDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface GoodsResDto{
    code:number
    msg:string
    data: GoodsBto
}

interface GoodsArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: GoodsBto[]
}