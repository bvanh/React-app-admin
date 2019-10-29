import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Upload, Input, Form, message, Modal } from 'antd';
import Danhsach from '../admin/table';
import AddProduct from './creatproduct';
import Edit from './editproducts';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function Mainboard(props) {
    const { currentuser, newproducts, showbtn } = props
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
                <Router>
                    <div>
                        <Route exact path="/" component={Danhsach} />
                        <Route path="/add" component={AddProduct} />
                        <Route path="/edit/:id" component={Edit}/>
                    </div>
                </Router>
                <Footer style={{ textAlign: 'center' }}>this is Futter</Footer>
            </Layout>
        </Layout>
    )
}