import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance } from 'antd';
interface BusinessManageState{
}
interface BusinessManageProps{
    
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
      title: 'Introduction',
      dataIndex: 'introduction',
    },
  ];
  const data: any[] = [];
  for (let i = 0; i < 6; i++) {
    data.push({
      key: i,
      id: i,
      name: `Edward King ${i}`,
      account: `54ngri${i}`,
      introduction: '我是绯闻绯闻分Greger图'
    });
  }
class BusinessManage extends React.Component<BusinessManageProps,BusinessManageState>{
    constructor(props: BusinessManageProps){
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
export default BusinessManage;