import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination } from 'antd';
import { GoodsDto } from '../../static/resType/product';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {GetGoodsTypeList} from '../../static/request/product';
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
class GoodsManageType extends React.Component<GoodsManageProps,GoodsManageState>{
    EditformRef = React.createRef<FormInstance>();
    SearchformRef = React.createRef<FormInstance>();
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
        title: 'Cid',
        dataIndex: 'cid',
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
    ];
    async componentDidMount(){
      const res = await GetGoodsTypeList({pageNum:1,pageSize:8});
      this.setState({
        formData: res.data,
        currentPage: res.currentpage,
        totalPage: res.maxPageSize*8,
        pageSize: 8,
      })
    }
    async componentDidUpdate(){
      await this.SearchformRef.current?.resetFields();
    }
    async updateFormList(){
      const res = await GetGoodsTypeList({pageNum:1,pageSize:8});
      this.setState({
        formData: res.data
      })
    }
    onConfirmSearch = async () => {
        const value = this.SearchformRef.current?.getFieldsValue(true);
        const param = {pageNum: 1,pageSize: 8,category:value.category,type:value.type};
        const res = await GetGoodsTypeList(param);
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
      const res = await GetGoodsTypeList({pageNum : page,pageSize: pageSize});
      this.setState({
        formData: res.data,
        currentPage: res.currentpage,
        isLoading: false,
      })
    }   
    render(){
      const {formData, isLoading,totalPage,currentPage,pageSize} = this.state;
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
            label="Category"
            name="category"
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
        </div>
            <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
            <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
        </div>
      )
    }
}
export default GoodsManageType;