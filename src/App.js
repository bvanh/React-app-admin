import React from 'react';
import Login from './component/admin/login'
import Mainboard from './component/admin/mainboard';
import app from 'firebase/app';
import { Modal } from 'antd'
export default class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.auth = app.auth();
    this.state = {
      collapsed: false,
      user: false,
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidMount() {
    this.authListener();
  }
  authListener() {
   let demo= this.auth.currentUser
   console.log(demo)
    // .onAuthStateChanged(user=> {
    //   if (user) {
    //     // User is signed in.
    //     // this.setState({ user });
    //     // localStorage.setItem("user", user.uid)
    //     console.log(user)
    //   } else {
    //     // No user is signed in.
    // //   }
    // });
  }
  render() {
    const {user, newproducts } = this.state
    return (
      <div>
        {user ?
          <Mainboard
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse.bind(this)}
            currentuser={user}
            newproducts={newproducts}
          />
          :
          <Login />
        }
      </div>
    );
  }
}
