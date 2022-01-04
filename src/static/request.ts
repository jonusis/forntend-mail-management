export default class Request{
    private static Instance:Request = new Request();
    private static url:string = 'http://10.189.27.254:8080/v1';
    public static GetInstance = ():Request => {
        return this.Instance;
    }
    public static GetUrl = ():string => {
        return this.url;
    }
    Fetch = (url:string,method:string,body?:any): Promise<any> => {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'mode':'cors'
            },
            body:JSON.stringify(body)
        }).then((res) => {
            return new Promise((resolve) => {
                resolve(res.json());
            })
        });
    }
}







// 请求样例： 
// POST  'https://localhost:8080/v1/DialogMessage/'
// body:{
//     question:'今天星期几'
// }
// 返回样例
// {
//     data:{
//         id: utfvsed314fcvert54gvresdgv
//         type: 2
//         content: '今天星期5' 
//     }
//     state: {
//         code:200
//         text:'请求成功'
//     }
// }