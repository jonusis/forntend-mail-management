import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination, TimePicker } from 'antd';
import {GetOrderList, DeleteOrder, UpdateOrder, AddOrder,SearchOrderList} from '../../../static/request/order';
import {OrderDto} from '../../../static/resType/order';
import './index.css';
import { CaretRightOutlined, DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
const { confirm } = Modal;
interface OrderManageState{
  formData: OrderDto[]
  isEditData: OrderDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  isToDetail: boolean
  currentPage: number
  totalPage: number
  pageSize: number
}
interface OrderManageProps{
    
}
const { Option } = Select;

class OrderManage extends React.Component<OrderManageProps,OrderManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    SearchformRef = React.createRef<FormInstance>();
    constructor(props: OrderManageProps){
        super(props);
        this.state = {
          formData : [],
          isEditData: {} as OrderDto,
          isLoading: false,
          isshowEditModel: false,
          isshowAddModel: false,
          isToDetail: false,
          currentPage: 0,
          totalPage: 50,
          pageSize: 6
        };
    }
    columns = [
      {
          title: 'oid',
          dataIndex: 'oid',
      },
      {
          title: 'start_time',
          dataIndex: 'start_time',
  
      },
      {
        title: 'end_time',
        dataIndex: 'end_time',
      },
      {
        title: 'state',
        dataIndex: 'state',
      },
      {
        title: 'total_price',
        dataIndex: 'total_price',
      },
      {
        title: 'introduction',
        dataIndex: 'introduction',
        width: '300px'
      },
      {
        title: 'Action',
        key: 'action',
        width: '300px',
        render: (line: OrderDto) => {
              return(
              <Space size="middle">
                <Button onClick={async () => {await this.setState({isEditData:line}); this.linkToDetail();}}>Detail<CaretRightOutlined /></Button>
              </Space>
            )
          },
      },
    ];
    async componentDidMount(){
      const res = await GetOrderList(1,8);
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
    linkToDetail = () => {
      this.setState({isToDetail: true});
    }
    async updateFormList(){
      const res = await GetOrderList(1,8);
      this.setState({
        formData: res.data,
        currentPage: 1
      })
    }
    showEditConfirm() {
      this.setState({isshowEditModel: true});
    }
    onConfirmAddModel = async () => {
      const data = this.AddformRef.current?.getFieldsValue(true);
      this.setState({isshowAddModel: false,isLoading: true});
      const res = await AddOrder(data);
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
    onConfirmSearch = async () => {
      const value = this.SearchformRef.current?.getFieldsValue(true);
      const param = {state:value.state,total_price:value.total_price};
      const res = await SearchOrderList(param);
      this.setState({
          formData: res.data,
          currentPage: res.currentpage,
          totalPage: res.maxPageSize*8,
          pageSize: 8,
      })
    }
    onClickAddOrder = () => {
      this.setState({isshowAddModel: true})
    }
    onChangePageSize = async (page: number, pageSize: number) => {
      this.setState({isLoading:true});
      const res = await GetOrderList(page,pageSize);
      this.setState({
        formData: res.data,
        currentPage: res.currentpage,
        isLoading: false,
      })
    }
    render(){
      const {formData, isLoading,isshowAddModel,totalPage,currentPage,pageSize,isToDetail,isEditData} = this.state;
        return(
        <div style={{background:'white',padding:'10px 30px'}}>
          <div className="searchForm">
          <Form
            name="basic"
            layout="inline"
            autoComplete="off"
            ref={this.SearchformRef}
          >
          <Form.Item
            label="state"
            name="state"
          >
            <Input width="30px" allowClear/>
          </Form.Item>
          <Form.Item
              label="total_price"
              name="total_price"
          >
            <Input width="30px" allowClear/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                Search
              </Button>
            </Form.Item>
      </Form>
        </div>
          <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
          <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
          { isToDetail && (
            <Navigate to={`/order/detail?oid=${isEditData.oid}`} replace={true} />
          )}
      </div>
      )
    }
}
export default OrderManage;