import React from 'react';
import LoginForm from './component/form/login'
import Mainboard from './component/admin/mainboard';
import data from './component/data-user'
export default class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      user: data.user,
      islogin: true,
      isuser: '',
      ispassword: '',
      currentuser: 'admin',
      newproducts: false
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  getUsername(e) {
    const name = e.target.value.split(' ').join('');
    this.setState({
      isuser: name
    })
  }
  getPassword(e) {
    const password = e.target.value.split(' ').join('');
    this.setState({
      ispassword: password
    })
  }
  submit() {
    const { isuser, ispassword, user } = this.state
    user.map((item) => {
      if (item.username === isuser && item.password === ispassword) {
        this.setState({
          islogin: true,
          currentuser: isuser,
        });
      }
    });
  }
  themmoi(){
    this.setState({
      newproducts: true 
    })
    console.log(this.state.newproducts)
  }
  render() {
    const { islogin, currentuser,newproducts } = this.state
    return (
      <div>
        {islogin === false &&
          <LoginForm
            getUsername={this.getUsername.bind(this)}
            getPassword={this.getPassword.bind(this)}
            submit={this.submit.bind(this)}
          />
        }
        {islogin &&
          <Mainboard
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse.bind(this)}
            currentuser={currentuser}
            newproducts={newproducts}
            themmoi={this.themmoi.bind(this)}
          />
        }
      </div>
    );
  }
}
