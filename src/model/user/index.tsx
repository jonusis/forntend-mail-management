import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal } from 'antd';
import {GetUserList} from '../../static/request/user';
import {UserDto} from '../../static/response';
import './index.css';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
const { confirm } = Modal;
interface UserManageState{
  formData: UserDto[]
  selectedRowKeys:any[]
}
interface UserManageProps{
    
}
const { Option } = Select;

class UserManage extends React.Component<UserManageProps,UserManageState>{
    constructor(props: UserManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : []
        };
    }
    columns = [
      {
          title: 'uid',
          dataIndex: 'uid',
      },
      {
          title: 'Name',
          dataIndex: 'name',
          width: '300px'
  
      },
      {
        title: 'Account',
        dataIndex: 'account',
        width: '300px'
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
      },
      {
        title: 'Action',
        key: 'action',
        width: '300px',
        render: () => (
          <Space size="middle">
            <Button><EditOutlined />edit</Button>
            <Button onClick={() => this.showConfirm()}><DeleteOutlined />Delete</Button>
          </Space>
        ),
      },
    ];
    async componentDidMount(){
      const res = await GetUserList(1,8);
      this.setState({
        formData: res.data
      })
    }
    showConfirm = () => {
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          //执行删除语句
        },
        onCancel() {
        },
      });
    }
    
    onSelectChange = (selectedRowKeys: any) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    };
    render(){
      const {formData, selectedRowKeys} = this.state;
      const rowSelection = {
        selectedRowKeys,
        onchange: this.onSelectChange
      }
        return(
        <div style={{background:'white',padding:'10px 30px'}}>
          <div className="searchForm">
          <Form
            name="basic"
            layout="inline"
            autoComplete="off"
          >
          <Form.Item
            label="Name"
            name="Name"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Account"
              name="account"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Age"
              name="age"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Sex"
              name="sex"
          >
          <Select style={{ width: 120 }}>
          <Option value="0">女</Option>
          <Option value="1">男</Option>
              </Select>
              </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
          <Button style={{float:'right'}}><UserAddOutlined />add user</Button>
          </div>
            <Table columns={this.columns} dataSource={formData } />
        </div>
    )
    }
}
export default UserManage;