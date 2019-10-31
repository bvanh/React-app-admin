import React from "react";
import { Layout, Menu, Icon } from "antd";
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
        collapsible
        collapsed={props.collapsed}
        onCollapse={props.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
                <span>{currentuser}</span>
              </span>
            }
          >
            <Menu.Item key="6" onClick={props.logout}>
              <Link to="/">Log out</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Router>
          <Route path="/home" component={Danhsach} />
          <Route path="/add" component={AddProduct} />
          <Route path="/edit/:id" component={Edit} />
        </Router>
        <Footer style={{ textAlign: "center" }}>React-app-admin-made-by-Me</Footer>
      </Layout>
    </Layout>
  );
}
