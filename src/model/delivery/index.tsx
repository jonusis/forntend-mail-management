import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination } from 'antd';
import { DeliveryDto } from '../../static/resType/delivery';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {GetDeliveryList, DeleteDelivery, UpdateDelivery, AddDelivery} from '../../static/request/delivery';
import './index.css'
const { confirm } = Modal;

interface DeliveryManageState{
  formData: DeliveryDto[]
  selectedRowKeys:any[]
  isEditData: DeliveryDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  currentPage: number
  totalPage: number
  pageSize: number
}
interface DeliveryManageProps{
    
}
class DeliveryManage extends React.Component<DeliveryManageProps,DeliveryManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    constructor(props: DeliveryManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : [],
          isEditData: {} as DeliveryDto,
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
          title: 'Did',
          dataIndex: 'did',
      },
      {
          title: 'Oid',
          dataIndex: 'oid',
      },
      {
        title: 'Uid',
        dataIndex: 'uid',
      },
      {
        title: 'State',
        dataIndex: 'state',
      },
      {
        title: 'Action',
        key: 'action',
        width: '300px',
        render: (line: DeliveryDto) => {
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
      const res = await GetDeliveryList(1,8);
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
      const res = await GetDeliveryList(1,8);
      this.setState({
        formData: res.data
      })
    }
    showDeleteConfirm = (line: DeliveryDto) => {
      const that = this;
      this.setState({isEditData:line});
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await that.setState({isLoading: true});
          const res = await DeleteDelivery(line.did);
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
      const res = await UpdateDelivery(data);
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
      const res = await AddDelivery(data);
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
            label="Did"
            name="did"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Oid"
              name="oid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Uid"
              name="uid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="State"
              name="state"
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
            label="Did"
            name="did"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Oid"
              name="oid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Uid"
              name="uid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="State"
              name="state"
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
      const res = await GetDeliveryList(page,pageSize);
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
            label="Did"
            name="did"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Oid"
              name="oid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Uid"
              name="uid"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="State"
              name="state"
          >
            <Input width="30px"/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                Search
              </Button>
            </Form.Item>
        </Form>
            <Button style={{float:'right'}} onClick={this.onClickAddUser}><UserAddOutlined />add Delivery</Button>
          </div>
            <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
            <Modal title="Edit" visible={isshowEditModel} onOk={this.onConfirmEditModel} onCancel={this.onCancelEditModel} width="500px">
              {this.onRenderEditForm()}
            </Modal>
            <Modal title="Add Delivery" visible={isshowAddModel} onOk={this.onConfirmAddModel} onCancel={this.onCancelAddModel} width="500px">
              {this.onRenderAddForm()}
            </Modal>
            <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
        </div>
      )
    }
}
export default DeliveryManage;