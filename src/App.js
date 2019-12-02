import React from "react";
import { Layout, Menu, Icon, Dropdown, Avatar } from "antd";
import Danhsach from "./component/admin/table";
import AddProduct from "./component/admin/creatproduct";
import Edit from "./component/admin/editproducts";
import Home from "./component/admin/home";
import Login from "./component/admin/login";
import app from "firebase/app";
import storage from "./component/admin/firebase";
import db from "./component/admin/firebase";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
const { Header, Footer, Sider } = Layout;
export default class Mainboard extends React.Component {
  constructor(props) {
    super(props);
    this.auth = app.auth();
    this.state = {
      user: null,
      redirect: false
    };
  }
  componentWillMount() {
    this.auth.onAuthStateChanged(demo => {
      if (demo) {
        // User is signed in.
        this.setState({ 
          redirect: true,
          user:demo.email
         });
        // localStorage.setItem("user", user.uid)
        console.log(demo);
      } else {
        this.setState({ redirect: false });
      }
    });
  }
  logout = () => {
    this.auth.signOut().then(() =>
      this.setState({
        redirect: false
      })
    );
  };
  render() {
    const { user, redirect } = this.state;
    if (redirect == false) {
      return (
        <Router>
          <Route path="/" component={Login} />
        </Router>
      );
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Sider breakpoint="md" collapsedWidth="0">
            <div className="logo">Admin</div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="8">
                <Link to="/" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  <Icon type="home" theme="filled" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="9">
                <span>
                  <Link
                    to="products"
                    style={{ color: "rgba(255, 255, 255, 0.65)" }}
                  >
                    <Icon type="area-chart" />
                    Products
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="7">
                <Icon type="idcard" theme="filled" />
                <span>Users</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item key="0" onClick={this.logout}>
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
                  {/* <Icon type="user" style={{ fontSize: "24px", margin: "5px" }} /> */}
                  <Avatar style={{ backgroundColor: "#87d068",margin:'0 5px' }} icon="user" />
                  <span>{user}</span>

                  <Icon type="down" style={{ padding: "0 2px" }} />
                </a>
              </Dropdown>
            </Header>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Danhsach} />
            <Route exact path="/create-products" component={AddProduct} />
            <Route path="/products/:id" component={Edit} />
            <Footer style={{ textAlign: "center" }}>
              Tamdaoweb-Admin ©2019 Created by Me
            </Footer>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
