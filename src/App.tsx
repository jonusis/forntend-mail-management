import React from 'react';
import {BrowserRouter, Link, Routes, Route, Navigate} from 'react-router-dom';
import routes,{RouteMoudle} from './static/router/router';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined, ShoppingCartOutlined, LineChartOutlined } from '@ant-design/icons';
import Breadcrumbss from './static/compoments/breadcrumb/index';
import Login from './model/login/index';
import './App.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface AppState{
  hasLogin: boolean
}
interface AppProps{
}

class App extends React.Component<AppProps,AppState>{
    constructor(props: AppProps){
        super(props);
        this.state = {
          hasLogin: false,
        }
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
      const {hasLogin} = this.state;
        return <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
        <Layout style={{ minHeight: '100vh' }}>
            <div className="header">
              <div className="loginMessage1">
                <ShoppingCartOutlined />
                Mall后台管理系统
              </div>
              <div className="loginMessage2">
                <Link to={`/login`} style={{ cursor: 'pointer' }}>注销</Link>
                <span> ｜ 欢迎你，管理员</span>
              </div>
            </div>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="用户">
                    <Menu.Item key="1-1">
                      <Link to={`/user/manage`}>用户管理</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<UserOutlined />} title="商家">
                    <Menu.Item key="2-1">
                      <Link to={`/business/manage`}>商家管理</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" icon={<NotificationOutlined />} title="订单">
                    <Menu.Item key="3-1">
                      <Link to={`/order/list`}>订单列表</Link>
                    </Menu.Item>
                    <Menu.Item key="3-2">
                      <Link to={`/order/add`}>新建订单</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub4" icon={<LaptopOutlined />} title="商品">
                    <Menu.Item key="4-1">
                      <Link to={`/product/list`}>商品列表</Link>
                    </Menu.Item>
                    <Menu.Item key="4-3">
                      <Link to={`/product/type`}>商品分类</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub5" icon={<LaptopOutlined />} title="地址">
                    <Menu.Item key="5-1">
                      <Link to={`/address/list`}>地址列表</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub6" icon={<LaptopOutlined />} title="物流">
                    <Menu.Item key="6-1">
                      <Link to={`/delivery/Statelist`}>物流状态列表</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub7" icon={<LineChartOutlined />} title="权限">
                    <Menu.Item key="7-1">
                      <Link to={`/admin/manage`}>后台账户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="7-2">
                      <Link to={`/admin/setting`}>系统设置</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumbss/>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Routes>
                    {route}
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </BrowserRouter>
    }
}
export default App;