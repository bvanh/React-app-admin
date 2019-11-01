import React from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import Danhsach from "../admin/table";
import AddProduct from "./creatproduct";
import Edit from "./editproducts";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function Mainboard(props) {
  const { currentuser} = props;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
      >
        <div className="logo">Admin</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="8">
            <Icon type="home"theme='filled' />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="9">
            <Icon type="area-chart" />
            <span>Products</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="idcard"theme='filled' />
            <span>Users</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item key="0" onClick={props.logout}>
                  <Link to="/">Log out</Link>
                </Menu.Item>
              </Menu>
            )}
            trigger={["click"]}
          >
            <a
              className="ant-dropdown-link"
              href="#"
              style={{ float: "right", margin: "0 2rem" }}
            >
              <Icon type="user" style={{ fontSize: "24px", margin: "5px" }} />
              <span>{currentuser}</span>

              <Icon type="down" />
            </a>
          </Dropdown>
        </Header>
        <Router>
          <Route path="/home" component={Danhsach} />
          <Route path="/add" component={AddProduct} />
          <Route path="/edit/:id" component={Edit} />
        </Router>
        <Footer style={{ textAlign: "center" }}>
          React-app-admin ©2019 Created by Me
        </Footer>
      </Layout>
    </Layout>
  );
}
