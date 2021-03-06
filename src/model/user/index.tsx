import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination ,Image, Avatar, Upload} from 'antd';
import {GetUserList, DeleteUser, UpdateUser, AddUser, SearchUserList} from '../../static/request/user';
import {UserDto} from '../../static/response';
import './index.css';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
const { confirm } = Modal;
interface UserManageState{
  formData: UserDto[]
  selectedRowKeys:any[]
  isEditData: UserDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  currentPage: number
  totalPage: number
  pageSize: number
  updateUrl: string
}
interface UserManageProps{
    
}
const { Option } = Select;

class UserManage extends React.Component<UserManageProps,UserManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    SearchformRef = React.createRef<FormInstance>();
    constructor(props: UserManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : [],
          isEditData: {} as UserDto,
          isLoading: false,
          isshowEditModel: false,
          isshowAddModel: false,
          currentPage: 0,
          totalPage: 50,
          pageSize: 6,
          updateUrl: ""
        };
    }
    columns = [
      {
          title: 'uid',
          dataIndex: 'uid',
      },
      {
          title: '名字',
          dataIndex: 'name',
          width: '300px'
  
      },
      {
        title: '账户',
        dataIndex: 'account',
        width: '300px'
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
      },
      {
        title: 'Tel',
        dataIndex: 'tel',
      },
      {
        title: 'Wechat',
        dataIndex: 'wechat',
      },
      {
        title: '头像',
        width: '300px',
        key: 'headpicture',
        render: (line: UserDto) => {
          return(
          <Space size="middle">
            <Avatar shape="square" size={64} icon={<Image src={line.headPicture}></Image>} /> 
          </Space>
        )
      },
      },
      {
        title: '操作',
        key: 'action',
        width: '300px',
        render: (line: UserDto) => {
              return(
              <Space size="middle">
                <Button onClick={async () => {
                  await this.setState({isEditData:line}); 
                  this.showEditConfirm();
                  }}><EditOutlined />编辑</Button>
                <Button onClick={() => this.showDeleteConfirm(line)}><DeleteOutlined />删除</Button>
              </Space>
            )
          },
      },
    ];
    async componentDidMount(){
      const res = await GetUserList(1,8);
      this.setState({
        formData: res.data,
        currentPage: res.currentpage,
        totalPage: res.maxPageSize*8,
        pageSize: 8,
      })
    }
    async componentDidUpdate(){
      await this.EditformRef.current?.resetFields();
      await this.AddformRef.current?.resetFields();
    }
    async updateFormList(){
      const res = await GetUserList(1,8);
      this.setState({
        formData: res.data,
        currentPage: 1
      })
    }
    showDeleteConfirm = (line: UserDto) => {
      const that = this;
      this.setState({isEditData:line});
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await that.setState({isLoading: true});
          const res = await DeleteUser(line.uid);
          if(res.code == 200){
            that.updateFormList();
            message.info('Delete success');
          }else{
            message.info('Delete failed');
          }
          that.setState({isLoading: false});
        },
        onCancel() {
        },
      });
    }
    showEditConfirm() {
      this.setState({isshowEditModel: true});
    }
    onConfirmEditModel = async () => {
      const data = this.EditformRef.current?.getFieldsValue(true);
      data.headPicture = data.headPicture.file ? data.headPicture.file.response.data : null;
      data.sex = data.sex === '男' ? '1' : '0';
      this.setState({isshowEditModel: false,isLoading: true});
      const res = await UpdateUser(data);
      if(res.code == 200){
        this.updateFormList();
        message.info('Update success');
      }else{
        message.info('Update failed');
      }
      this.setState({isLoading: false});
    }
    onCancelEditModel = () => {
      this.setState({isshowEditModel: false});
    }
    onConfirmAddModel = async () => {
      const data = this.AddformRef.current?.getFieldsValue(true);
      data.sex = data.sex === '男' ? '1' : '0';
      this.setState({isshowAddModel: false,isLoading: true});
      const res = await AddUser(data);
      if(res.code == 200){
        this.updateFormList();
        message.info('add success');
      }else{
        message.info('add failed');
      }
      this.setState({isLoading: false});
    }
    onCancelAddModel = () => {
      this.setState({isshowAddModel: false});
    }
    onRenderEditForm = () => {
      const {isEditData} = this.state;
      return(
        <Form
        name="basic"
        labelCol={{ span: 4 }}
        initialValues={isEditData}
        autoComplete="off"
        ref={this.EditformRef}
      >
        <Form.Item
            label="Name"
            name="name"
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
              label="Tel"
              name="tel"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="QQ"
              name="qq"
          ><Input width="30px"/>
          </Form.Item>
           <Form.Item
              label="Wechat"
              name="wechat"
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
        <Form.Item
              label="HeadPicture"
              name="headPicture"
          >
            <Upload
            action="http://10.189.1.135:8080/file/"
            listType="picture"
            headers={{"mode":"cors"}}
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
      )
    }
    onRenderAddForm = () => {
      return(
        <Form
        name="basic"
        labelCol={{ span: 4 }}
        initialValues={{}}
        autoComplete="off"
        ref={this.AddformRef}
      >
        <Form.Item
            label="名字"
            name="name"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="账户"
              name="account"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="密码"
              name="password"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="年龄"
              name="age"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Tel"
              name="tel"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="QQ"
              name="qq"
          >
            <Input width="30px"/>
          </Form.Item>
           <Form.Item
              label="Wechat"
              name="wechat"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="性别"
              name="sex"
          >
          <Select style={{ width: 120 }}>
          <Option value="0">女</Option>
          <Option value="1">男</Option>
              </Select>
          </Form.Item>
          <Form.Item
              label="HeadPicture"
              name="headPicture"
          >
            <Upload
            action="http://10.189.1.135:8080/file/"
            listType="picture"
            headers={{"mode":"cors"}}
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
      )
    }
    onConfirmSearch = async () => {
      const value = this.SearchformRef.current?.getFieldsValue(true);
      const param = {name:value.Name,account:value.account,age:value.age,sex:value.sex};
      const res = await SearchUserList(param);
      this.setState({
          formData: res.data,
          currentPage: res.currentpage,
          totalPage: res.maxPageSize*8,
          pageSize: 8,
      })
    }
    onClickAddUser = () => {
      this.setState({isshowAddModel: true})
    }
    onChangePageSize = async (page: number, pageSize: number) => {
      this.setState({isLoading:true});
      const res = await GetUserList(page,pageSize);
      this.setState({
        formData: res.data,
        currentPage: res.currentpage,
        isLoading: false,
      })
    }
    render(){
      const {formData, isLoading,isshowEditModel,isshowAddModel,totalPage,currentPage,pageSize} = this.state;
        return(
        <div style={{background:'white',padding:'10px 30px'}}>
          <div className="searchForm">
          <Form
            name="basic"
            layout="inline"
            autoComplete="off"
            ref= {this.SearchformRef}
          >
          <Form.Item
            label="名字"
            name="Name"
          >
            <Input allowClear width="30px"/>
          </Form.Item>
          <Form.Item
              label="账户"
              name="account"
          >
            <Input allowClear width="30px"/>
          </Form.Item>
          <Form.Item
              label="年龄"
              name="age"
          >
            <Input allowClear width="30px"/>
          </Form.Item>
          <Form.Item
              label="性别"
              name="sex"
          >
          <Select allowClear style={{ width: 120 }}>
            <Option value="0">女</Option>
            <Option value="1">男</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                搜索
              </Button>
            </Form.Item>
      </Form>
          <Button style={{float:'right'}} onClick={this.onClickAddUser}><UserAddOutlined />添加用户</Button>
        </div>
          <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
          <Modal title="Edit" visible={isshowEditModel} onOk={this.onConfirmEditModel} onCancel={this.onCancelEditModel} width="500px">
            {this.onRenderEditForm()}
          </Modal>
          <Modal title="Add User" visible={isshowAddModel} onOk={this.onConfirmAddModel} onCancel={this.onCancelAddModel} width="500px">
            {this.onRenderAddForm()}
          </Modal>
          <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
      </div>
      )
    }
}
export default UserManage;