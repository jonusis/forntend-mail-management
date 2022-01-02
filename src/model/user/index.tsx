import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance } from 'antd';
import './index.less';
interface UserManageState{
}
interface UserManageProps{
    
}

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
      title: 'Account',
      dataIndex: 'account',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
  ];
  const data: any[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      id: i,
      name: `Edward King ${i}`,
      account: `54ngri${i}`,
      age: 32,
      sex: `${i % 2 === 0? '男' : '女'}`,
    });
  }
class UserManage extends React.Component<UserManageProps,UserManageState>{
    constructor(props: UserManageProps){
        super(props);
        this.state = {
        };
    }
      
    render(){
        return(
        <div>
            
            <Table columns={columns} dataSource={data} />;
        </div>
    )
    }
}
export default UserManage;