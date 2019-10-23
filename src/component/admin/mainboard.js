import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Upload, Input, Form, message } from 'antd';
import Danhsach from '../admin/table';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function Mainboard(props) {
    const { currentuser, newproducts } = props
    const demo = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible
                collapsed={props.collapsed}
                onCollapse={props.onCollapse}>
                <div className="logo"
                />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item>
                        <Icon type="user" />
                        <span>{currentuser}</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Team</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                {newproducts ?
                    (
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
                                        onChange={props.handleChange}
                                        required />
                                    <br />
                                    Vị trí
                                    <Input
                                        placeholder="Nhập vị trí hotel"
                                        name='vitri'
                                        required />
                                    <br />
                                    Đánh giá
                                    <Input
                                        placeholder="Nhập đánh giá hotel"
                                        name='danhgia'
                                        required />
                                    <br />
                                    Giá
                                    <Input
                                        placeholder="Nhập giá hotel"
                                        name='gia'
                                        required /><br />
                                    <div>
                                        Thêm ảnh<br />
                                        <Upload {...demo}>
                                            <Button>
                                                <Icon type="upload" /> Upload
                                        </Button>
                                        </Upload>
                                        <br />
                                    </div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >Submit</Button>
                                </Form>
                            </div>
                        </Content>
                    )
                    :
                    (
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Danh sách hotel</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Button type="primary" onClick={props.themmoi}>Thêm mới</Button>
                                <Danhsach />
                            </div>
                        </Content>
                    )
                }
                <Footer style={{ textAlign: 'center' }}>this is Futter</Footer>
            </Layout>
        </Layout>
    )
}