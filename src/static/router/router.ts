import Login from '../../model/login/index';
import User from '../../model/user/index';
import Business from '../../model/business/index';
import Address from '../../model/address/index';
import Product from '../../model/product/index'
import OrderList from '../../model/order/List/index';
import OrderDetail from '../../model/order/List/detail';
import OrderAdd from '../../model/order/Add/index';


export interface RouteMoudle{
    path: string,
    children?: RouteMoudle[],
    compoment?: any
}
const routes: RouteMoudle[] = [
    {
        path: "",
        children:[
            {
                path: "/login",
                compoment: Login,
            },
            {
                path: "",
                children:[
                    {
                        path: "/user/manage",
                        compoment: User,
                    },
                    {
                        path: "/business/manage",
                        compoment: Business,
                    },
                    {
                        path: "/order/list",
                        compoment: OrderList,
                    },
                    {
                        path: "/order/detail",
                        compoment: OrderDetail,
                    },
                    {
                        path: "/order/add",
                        compoment: OrderAdd,
                    },
                    {
                        path: "/order/setting",
                        compoment: Business,
                    },
                    {
                        path: "/order/delivery",
                        compoment: Business,
                    },
                    {
                        path: "/goods/manage",
                        compoment: Business,
                    },
                    {
                        path: "/goods/setting",
                        compoment: Business,
                    },
                    {
                        path: "/goods/delivery",
                        compoment: Business,
                    },
                    {
                        path: "/address/list",
                        compoment: Address,
                    },
                    {
                        path: "/product/list",
                        compoment: Product,
                    },
                ]
            },
        ]
    }
]
export default routes;