import React from 'react';
import LoginForm from './component/form/login'
import Mainboard from './component/admin/mainboard';
import data from './component/data-user'
import app from 'firebase/app';
import storage from '../src/component/admin/firebase'
import db from '../src/component/admin/firebase'
import { Modal } from 'antd'
export default class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.storage = app.storage();
    this.db = app.firestore();
    this.backTolist = this.backTolist.bind(this)
    this.state = {
      collapsed: false,
      user: data.user,
      islogin: true,
      isuser: '',
      ispassword: '',
      currentuser: 'admin',
      newproducts: true,
      ten: '',
      gia: 0,
      danhgia: 0,
      vitri: '',
      img: null,
      showbtn: true
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
  themmoi() {
    this.setState({
      newproducts: true
    })
  }
  backTolist=()=> {
    this.setState({
      newproducts: false
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.gia)
  }
  addimg(e) {
    const { ten, gia, danhgia, vitri } = this.state
    if (e.target.files[0] && gia, danhgia !== 0 && ten, vitri !== '') {
      const image = e.target.files[0];
      this.setState({
        img: image,
        showbtn: false
      })
    }
  }
  submit2() {
    const { ten, vitri, gia, danhgia, img, newproducts } = this.state
    const uploadTask = storage.ref(`images/${img.name}`).put(img)

    uploadTask.on('state_changed',
      () => {
        storage.ref('images').child(img.name).getDownloadURL().then(url => {
          this.db
            .collection("documents")
            .doc(ten)
            .set({
              ten: ten,
              vitri: vitri,
              gia: Number(gia),
              danhgia: Number(danhgia),
              src: url
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        })
      });
    Modal.confirm({
      title: 'Chúc mừng',
      content: 'Bạn đã tạo 1 sản phẩm thành công...',
      okText: "Xem danh sách",
      cancelText: "Tiếp tục",
      onOk=()=>{
        this.setState({
          newproducts:false
        })
      },
      onCancel() {
      },
    });
  }
  render() {
    const { islogin, currentuser, newproducts, showbtn } = this.state
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
            handleChange={this.handleChange.bind(this)}
            addimg={this.addimg.bind(this)}
            // submit={this.submit.bind(this)}
            submit2={this.submit2.bind(this)}
            showbtn={showbtn}
            backTolist={this.backTolist.bind(this)}
          />
        }
      </div>
    );
  }
}
