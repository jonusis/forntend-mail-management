interface AddressBto{
	aid: number;
    city: string;
    detailedAddress: string;
	province: string;
	receivierName: string;
	telephone: number;
    uid: number;
}
export class AddressDto{
	aid: number;
    city: string;
    detailedAddress: string;
	province: string;
	receivierName: string;
	telephone: number;
    uid: number;
    constructor(address:AddressBto){
        this.aid = address.aid;
        this.city = address.city;
        this.detailedAddress = address.detailedAddress;
        this.province = address.province;
        this.receivierName = address.receivierName;
        this.telephone = address.telephone;
        this.uid = address.uid;
    }
}
export class AddressResponseDto{
    data: AddressDto
    msg: string
    code: number // 状态码
    constructor(message: AddressResDto){
        this.code = message.code;
        this.msg = message.msg;
        this.data = new AddressDto(message.data);
    }
}
export class AddressResponseArrayDto{
    data: AddressDto[]
    msg: string
    code: number // 状态码
    currentpage: number
    maxPageSize: number
    constructor(message: AddressArrayResDto){
        const localData: AddressDto[] = []
        message.data.forEach((item: AddressBto) => localData.push(new AddressDto(item)))
        this.code = message.code;
        this.msg = message.msg; 
        this.data = localData;
        this.currentpage = message.pageNum;
        this.maxPageSize = message.pageMaxSize;
    }
}

interface AddressResDto{
    code:number
    msg:string
    data: AddressBto
}

interface AddressArrayResDto{
    pageNum: number;
    pageMaxSize: number;
    code:number
    msg:string
    data: AddressBto[]
}