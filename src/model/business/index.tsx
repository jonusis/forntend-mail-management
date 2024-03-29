import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination } from 'antd';
import { BusinessDto } from '../../static/resType/business';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {GetBusinessList, DeleteBusiness, UpdateBusiness, AddBusiness} from '../../static/request/business';
import './index.css'
const { confirm } = Modal;

interface BusinessManageState{
  formData: BusinessDto[]
  selectedRowKeys:any[]
  isEditData: BusinessDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  currentPage: number
  totalPage: number
  pageSize: number
}
interface BusinessManageProps{
    
}
class BusinessManage extends React.Component<BusinessManageProps,BusinessManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    constructor(props: BusinessManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : [],
          isEditData: {} as BusinessDto,
          isLoading: false,
          isshowEditModel: false,
          isshowAddModel: false,
          currentPage: 0,
          totalPage: 50,
          pageSize: 6
        };
    }
    columns = [
      {
          title: 'bid',
          dataIndex: 'bid',
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
      {
        title: 'Action',
        key: 'action',
        width: '300px',
        render: (line: BusinessDto) => {
              return(
              <Space size="middle">
                <Button onClick={async () => {
                  await this.setState({isEditData:line}); 
                  this.showEditConfirm();
                  }}><EditOutlined />edit</Button>
                <Button onClick={() => this.showDeleteConfirm(line)}><DeleteOutlined />Delete</Button>
              </Space>
            )
          },
      },
    ];
    async componentDidMount(){
      const res = await GetBusinessList(1,8);
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
      const res = await GetBusinessList(1,8);
      this.setState({
        formData: res.data
      })
    }
    showDeleteConfirm = (line: BusinessDto) => {
      const that = this;
      this.setState({isEditData:line});
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await that.setState({isLoading: true});
          const res = await DeleteBusiness(line.bid);
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
      this.setState({isshowEditModel: false,isLoading: true});
      const res = await UpdateBusiness(data);
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
      this.setState({isshowAddModel: false,isLoading: true});
      const res = await AddBusiness(data);
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
              label="Introduction"
              name="introduction"
          >
            <Input width="30px"/>
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
              label="Password"
              name="password"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Introduction"
              name="introduction"
          >
            <Input width="30px"/>
          </Form.Item>
      </Form>
      )
    }
    onConfirmSearch = () => {

    }
    onClickAddUser = () => {
      this.setState({isshowAddModel: true})
    }
    onChangePageSize = async (page: number, pageSize: number) => {
      this.setState({isLoading:true});
      const res = await GetBusinessList(page,pageSize);
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
          >
          <Form.Item
            label="Name"
            name="name"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Account"
              name="Account"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Introduction"
              name="introduction"
          >
            <Input width="30px"/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                Search
              </Button>
            </Form.Item>
        </Form>
            <Button style={{float:'right'}} onClick={this.onClickAddUser}><UserAddOutlined />add business</Button>
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
export default BusinessManage;