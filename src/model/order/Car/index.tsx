import React from 'react';
import { Table, Form, Input, Button, Checkbox, Divider, FormInstance, Select, Space, Modal, message, Pagination ,Image, Avatar, Upload} from 'antd';
import {GetCarList, DeleteCar, UpdateCar, AddCar, SearchCarList} from '../../../static/request/car';
import {CarDto} from '../../../static/resType/car';
import './index.css';
import { DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
const { confirm } = Modal;
interface CarManageState{
  formData: CarDto[]
  selectedRowKeys:any[]
  isEditData: CarDto
  isLoading: boolean
  isshowEditModel: boolean
  isshowAddModel: boolean
  currentPage: number
  totalPage: number
  pageSize: number
  updateUrl: string
}
interface CarManageProps{
    
}

class CarManage extends React.Component<CarManageProps,CarManageState>{
    EditformRef = React.createRef<FormInstance>();
    AddformRef = React.createRef<FormInstance>();
    SearchformRef = React.createRef<FormInstance>();
    constructor(props: CarManageProps){
        super(props);
        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          formData : [],
          isEditData: {} as CarDto,
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
          title: 'id',
          dataIndex: 'id',
      },
      {
        title: 'PostID',
        dataIndex: 'postID',
      },
      {
          title: 'Content',
          dataIndex: 'content',
          width: '300px'
  
      },
      {
        title: 'Heading',
        dataIndex: 'heading',
        width: '300px'
      },
      {
        title: 'Full',
        dataIndex: 'full',
      },
      {
        title: 'PlaceA',
        dataIndex: 'placeA',
      },
      {
        title: 'PlaceB',
        dataIndex: 'placeB',
      },
      {
        title: 'NumExist',
        dataIndex: 'numExist',
      },
      {
        title: 'NumNeed',
        dataIndex: 'numNeed',
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
        title: 'Action',
        key: 'action',
        width: '300px',
        render: (line: CarDto) => {
              return(
              <Space size="middle">
                <Button onClick={() => this.showDeleteConfirm(line)}><DeleteOutlined />Delete</Button>
              </Space>
            )
          },
      },
    ];
    async componentDidMount(){
      const res = await GetCarList(1,8);
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
      const res = await GetCarList(1,8);
      this.setState({
        formData: res.data,
        currentPage: 1
      })
    }
    showDeleteConfirm = (line: CarDto) => {
      const that = this;
      this.setState({isEditData:line});
      confirm({
        title: '确认要删除这条数据?',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await that.setState({isLoading: true});
          const res = await DeleteCar(line.id);
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
      data.sex = data.sex === '女' ? '0' : '1';
      data.headPicture = data.headPicture.file.response.data;
      this.setState({isshowEditModel: false,isLoading: true});
      const res = await UpdateCar(data);
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
      data.sex = data.sex === '女' ? '0' : '1';
      this.setState({isshowAddModel: false,isLoading: true});
      const res = await AddCar(data);
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
            label="Content"
            name="content"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Full"
              name="full"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Heading"
              name="heading"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="NumExist"
              name="numExist"
          ><Input width="30px"/>
          </Form.Item>
           <Form.Item
              label="NumNeed"
              name="numNeed"
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
              label="Full"
              name="full"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="Heading"
              name="heading"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="NumExist"
              name="numExist"
          ><Input width="30px"/>
          </Form.Item>
           <Form.Item
              label="NumNeed"
              name="numNeed"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="PlaceA"
              name="placeA"
          >
            <Input width="30px"/>
          </Form.Item>
          <Form.Item
              label="PlaceB"
              name="placeB"
          >
            <Input width="30px"/>
          </Form.Item>
      </Form>
      )
    }
    onConfirmSearch = async () => {
      const value = this.SearchformRef.current?.getFieldsValue(true);
      const param = {userID:value.postID};
      const res = await SearchCarList(param);
      this.setState({
          formData: res.data,
          currentPage: res.currentpage,
          totalPage: res.maxPageSize*8,
          pageSize: 8,
      })
    }
    onClickAddCar = () => {
      this.setState({isshowAddModel: true})
    }
    onChangePageSize = async (page: number, pageSize: number) => {
      this.setState({isLoading:true});
      const res = await GetCarList(page,pageSize);
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
            label="PostID"
            name="postID"
          >
            <Input allowClear width="30px"/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={this.onConfirmSearch}>
                Search
              </Button>
            </Form.Item>
      </Form>
        </div>
          <Table columns={this.columns} loading={isLoading} dataSource={formData } pagination={false}/>
          <Modal title="Edit" visible={isshowEditModel} onOk={this.onConfirmEditModel} onCancel={this.onCancelEditModel} width="500px">
            {this.onRenderEditForm()}
          </Modal>
          <Modal title="Add Car" visible={isshowAddModel} onOk={this.onConfirmAddModel} onCancel={this.onCancelAddModel} width="500px">
            {this.onRenderAddForm()}
          </Modal>
          <Pagination defaultCurrent={1} current={currentPage} total={totalPage} pageSize={pageSize} onChange={this.onChangePageSize} style={{margin:'20px auto'}}/>
      </div>
      )
    }
}
export default CarManage;