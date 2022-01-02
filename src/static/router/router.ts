import Login from '../../model/login/index'
import Detail from '../../model/detail/index'

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
                path: "/detail",
                compoment: Detail,
            }
        ]
    }
]
export default routes;