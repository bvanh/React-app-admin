import React, { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button, Upload, Input, Form, message, Modal } from 'antd';
import app from 'firebase/app';
// import storage from './firebase'
// import db from './firebase'
import { Link, useRouteMatch } from 'react-router-dom'
const { Content } = Layout;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.state = {
            url: this.props.match.params.id,
            datadetail: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                  uid: '1',
                  name: '',
                  status: 'done',
                  url: '',
                },
            ],
            ten: '',
            gia: 0,
            danhgia: 0,
            vitri: '',
            img: null,
        }
        
    }
    handleCancel = () => this.setState({ previewVisible: false });
    componentDidMount() {
        this.db
            .collection('documents')
            .doc(this.state.url)
            .get()
            .then((doc) => {
                const demo = doc.data()
                this.setState({
                    img:null,
                    datadetail: demo,
                    previewImage: demo.src,
                    fileList:[
                        {
                            uid: '1',
                            name: demo.ten,
                            status: 'done',
                            url: demo.src,
                          }, 
                    ]
                })

            })

    }
    handleChange = ({ fileList },e) =>
     this.setState({ fileList,
        img:e.target.value
     });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
        console.log(file.preview)
      };
      editData(e){
        this.setState({
            [e.target.name]: e.target.value
        })
      }
    render() {
        const { datadetail, previewVisible, previewImage,fileList } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Form className='addproduct'>
                        Tên
                        <Input
                            placeholder="Nhập tên hotel"
                            name='ten'
                            value={datadetail.ten}
                            onChange={this.editData}
                            required />
                        <br />
                        Vị trí
                <Input
                            placeholder="Nhập vị trí hotel"
                            name='vitri'
                            value={datadetail.vitri}
                            onChange={this.editData}
                            required />
                        <br />
                        Đánh giá
                <Input
                            placeholder="Nhập đánh giá hotel"
                            name='danhgia'
                            value={datadetail.danhgia}
                            onChange={this.editData}
                            required />
                        <br />
                        Giá
                <Input
                            placeholder="Nhập giá hotel"
                            name='gia'
                            value={datadetail.gia}
                            onChange={this.editData}
                            required /><br />
                        <div>
                            Thêm ảnh<br />
                            <div className="clearfix">
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                            <br />
                        </div>
                        <Link to='/'>
                            <Button
                                type="danger"
                                style={{ margin: '0 8px' }}
                            >Back
                        </Button>
                        </Link>
                        <Button
                            type="primary"
                            htmlType="submit"
                        // onClick={this.creatProducts}
                        >Update</Button>
                    </Form>
                </div>
            </Content>
        )
    }
}