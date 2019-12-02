import React from "react";
import { Layout, Breadcrumb, Button, Upload, Input, Form, Modal } from "antd";
import Back from "./backbtn";
import app from "firebase/app";
import storage from "./firebase";
import db from "./firebase";
import { withRouter } from "react-router-dom";
const { Content } = Layout;
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.storage = app.storage();
    this.db = app.firestore();
    this.handleChange = this.handleChange.bind(this);
    this.addImg = this.addImg.bind(this);
    // this.creatProducts = this.creatProducts.bind(this);
    this.state = {
      ten: "",
      gia: 0,
      danhgia: 0,
      vitri: "",
      img: null,
      showbtn: true
    };
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addImg(e) {
    const { ten, gia, danhgia, vitri } = this.state;
    if ((e.target.files[0] && gia, danhgia !== 0 && ten, vitri !== "")) {
      const image = e.target.files[0];
      this.setState({
        img: image,
        showbtn: false
      });
      console.log(image);
    }
  }
  creatProducts = () => {
    const { ten, vitri, gia, danhgia, img } = this.state;
    const uploadTask = this.storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      snapshot => {
        ////demo
      },
      error => {
        console.log(error);
      },
      () => {
        this.storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then(url => {
            this.db
              .collection("documents")
              .add({
                ten: ten,
                vitri: vitri,
                gia: Number(gia),
                danhgia: Number(danhgia),
                src: url
              })

              .then(docRef => {
                this.db
                  .collection("documents")
                  .doc(docRef.id)
                  .set({
                    ten: ten,
                    vitri: vitri,
                    gia: Number(gia),
                    danhgia: Number(danhgia),
                    src: url,
                    id: docRef.id
                  });
                this.setState({
                  ten: "",
                  gia: 0,
                  danhgia: 0,
                  vitri: "",
                  img: null
                });
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(error => {
                console.error("Error writing document: ", error);
                // });
              });
          });

        Modal.success({
          content: "Tạo sản phẩm thành công !",
          onOk() {}
        });
      }
    );
  };
  render() {
    const { showbtn, ten, gia, danhgia, vitri, img } = this.state;
    return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Form className="addproduct">
            Tên
            <Input
              placeholder="Nhập tên hotel"
              name="ten"
              value={ten}
              onChange={this.handleChange}
              required
            />
            <br />
            Vị trí
            <Input
              placeholder="Nhập vị trí hotel"
              name="vitri"
              value={vitri}
              onChange={this.handleChange}
              required
            />
            <br />
            Đánh giá
            <Input
              placeholder="Nhập đánh giá hotel"
              name="danhgia"
              value={danhgia}
              onChange={this.handleChange}
              required
            />
            <br />
            Giá
            <Input
              placeholder="Nhập giá hotel"
              name="gia"
              value={gia}
              onChange={this.handleChange}
              required
            />
            <br />
            <div>
              Thêm ảnh
              <br />
              <input type="file" onChange={this.addImg}></input>
              <br />
            </div>
            <Back />
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.creatProducts}
              disabled={showbtn}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Content>
    );
  }
}
export default withRouter(AddProduct);
