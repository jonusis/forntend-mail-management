interface DeliveryBto{
    did: number;
	oid: number;
	state: number;
	uid: number;
}

export class DeliveryDto{
    did: number;
	oid: number;
	state: string;
	uid: number;
    constructor(Delivery:DeliveryBto){
        this.did = Delivery.did;
        this.oid = Delivery.oid;
        this.state = Delivery.state === 0 ? '未发货' : Delivery.state === 1 ? '已发货' :  Delivery.state === 2 ? '已签收' : '已完成'
        this.uid = Delivery.uid;
    }
}
export class DeliveryResponseDto{
    data: DeliveryDto
    msg: string
    code: number // 状态码
    constructor(message: DeliveryResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new DeliveryDto(message.data);
    }
}
export class  DeliveryResponseArrayDto{
    data: DeliveryDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: DeliveryArrayResDto){
        const localData: DeliveryDto[] = []
        message.data.forEach((item: DeliveryBto) => localData.push(new DeliveryDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface DeliveryResDto{
    code:number
    msg:string
    data: DeliveryBto
}

interface DeliveryArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: DeliveryBto[]
}
