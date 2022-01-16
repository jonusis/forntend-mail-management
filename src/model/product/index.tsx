import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination } from 'antd';
import { GoodsDto } from '../../static/resType/product';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {GetGoodsList, DeleteGoods, UpdateGoods, AddGoods} from '../../static/request/product';
import './index.css'
const { confirm } = Modal;

interface GoodsManageState{
  formData: GoodsDto[]
  selectedRowKeys:any[]
  isEditData: GoodsDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  currentPage: number
  totalPage: number
  pageSize: number
}
interface GoodsManageProps{
    
}
class GoodsManage extends React.Component<GoodsManageProps,GoodsManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    constructor(props: GoodsManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : [],
          isEditData: {} as GoodsDto,
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
        title: 'Gid',
        dataIndex: 'gid',
      },
      {
           title: 'Count',
           dataIndex: 'count',
      },
      {
        title: 'Introduction',
        dataIndex: 'introduction',
      },
      {
          title: 'Name',
          dataIndex: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title: 'Action',
        key: 'action',
        width: '300px',
        render: (line: GoodsDto) => {
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
      const res = await GetGoodsList(1,8);
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
      const res = await GetGoodsList(1,8);
      this.setState({
        formData: res.data
      })
    }
    showDeleteConfirm = (line: GoodsDto) => {
      const that = this;
      this.setState({isEditData:line});
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await that.setState({isLoading: true});
          const res = await DeleteGoods(line.bid);
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
      const res = await UpdateGoods(data);
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
      const res = await AddGoods(data);
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
              label="Count"
              name="count"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Introduction"
              name="introduction"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Prince"
              name="price"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Type"
              name="type"
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
        labelCol={{ span: 5 }}
        initialValues={{}}
        autoComplete="off"
        ref={this.AddformRef}
      >
        <Form.Item
            label="Bid"
            name="bid"
          >
            <Input width="30px"/>
          </Form.Item>
        <Form.Item
            label="Name"
            name="name"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Count"
              name="count"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Introduction"
              name="introduction"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Prince"
              name="price"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Type"
              name="type"
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
      const res = await GetGoodsList(page,pageSize);
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
            label="Gid"
            name="gid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Type"
              name="type"
          >
            <Input width="30px"/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                Search
              </Button>
            </Form.Item>
        </Form>
            <Button style={{float:'right'}} onClick={this.onClickAddUser}><UserAddOutlined />add product</Button>
          </div>
            <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
            <Modal title="Edit" visible={isshowEditModel} onOk={this.onConfirmEditModel} onCancel={this.onCancelEditModel} width="500px">
              {this.onRenderEditForm()}
            </Modal>
            <Modal title="Add Product" visible={isshowAddModel} onOk={this.onConfirmAddModel} onCancel={this.onCancelAddModel} width="500px">
              {this.onRenderAddForm()}
            </Modal>
            <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
        </div>
      )
    }
}
export default GoodsManage;