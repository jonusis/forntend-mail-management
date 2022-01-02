import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import routes,{RouteMoudle} from './static/router/router';


interface LoginState{
}
interface LoginProps{
}

class App extends React.Component<LoginState,LoginProps>{
    constructor(props: LoginProps){
        super(props);
    }
    GetRoute = (routes: RouteMoudle[],path:string, index: number):any => {
      let self = this;
      return routes.map(item => {
        let url = path + item.path;
        if(item.children && item.children.length > 0){
          return self.GetRoute(item.children,url,index);
        }else{
          index++;
          return(
            <Route key={index} path={url} element={<item.compoment/>}/>
          )
        }
      })
    }
    render(){
      const route = this.GetRoute(routes,"",0);
      console.log(route);
        return <BrowserRouter>
          <Routes>
            {route}
          </Routes>
        </BrowserRouter>
    }
}
export default App;