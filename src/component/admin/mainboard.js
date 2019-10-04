import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Table from 'table';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default function Mainboard(props) {
    const { currentuser } = props
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
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Table />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>this is futter</Footer>
            </Layout>
        </Layout>
    )
}