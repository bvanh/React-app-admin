import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button, Upload, Input, Form, message, Modal } from 'antd';
import app from 'firebase/app';
import storage from './firebase'
import db from './firebase';
import { Link, useRouteMatch } from 'react-router-dom'
const { Content } = Layout;
export default function Edit(props){       
        // db = app.firestore();
        const demo=props.match.params.id
        return(
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Form className='addproduct'>
                    Tên{demo}
                <Input
                        placeholder="Nhập tên hotel"
                        name='ten'
                        required />
                    <br />
                    Vị trí
                <Input
                        placeholder="Nhập vị trí hotel"
                        name='vitri'
                        // onChange={this.handleChange}
                        required />
                    <br />
                    Đánh giá
                <Input
                        placeholder="Nhập đánh giá hotel"
                        name='danhgia'
                        // onChange={this.handleChange}
                        required />
                    <br />
                    Giá
                <Input
                        placeholder="Nhập giá hotel"
                        name='gia'
                        // onChange={this.handleChange}
                        required /><br />
                    <div>
                        Thêm ảnh<br />
                        <input
                            type='file'
                            // onChange={this.addImg}

                        >
                        </input>

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
