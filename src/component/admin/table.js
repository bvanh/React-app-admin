import { Layout, Table, Divider, Popconfirm, Breadcrumb, Button } from 'antd';
import React from 'react'
import app from 'firebase/app';
import db from './firebase';
import { Link, useRouteMatch } from 'react-router-dom'
const { Content } = Layout;
export default class Danhsach extends React.Component {
    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.columns = [
            {
                title: 'Avatar',
                dataIndex: 'src',
                key: 'avatar',
                render: text => <img className='avatar' src={text} alt='anh demo' />,
            },
            {
                title: 'Name',
                dataIndex: 'ten',
                key: 'name',
            },
            {
                title: 'Location',
                dataIndex: 'vitri',
                key: 'localtion',
            },
            {
                title: 'Price',
                dataIndex: 'gia',
                key: 'price',
                render: price => <span>{price.toLocaleString()} vnđ</span>
            },
            {
                title: 'Rate',
                dataIndex: 'danhgia',
                key: 'rating',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <span>
                            <Link to={`edit/${record.ten}`}>Edit</Link>
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.ten)}>
                                <a>Delete</a>
                            </Popconfirm>
                        </span>
                    ) : null,
            },
        ];
        this.state = {
            data: [],
        }
    }
    handleDelete = ten => {
        this.db
            .collection("documents")
            .doc(ten)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.ten !== ten) });

    };
    componentDidMount() {
        // get the whole collection
        this.db
            .collection('documents')
            .get()
            .then((querySnapshot) => {
                const demo = querySnapshot.docs.map(doc => doc.data())
                this.setState({
                    data: demo
                })
                console.log(demo)

            })
    }
    render() {
        const columns = this.columns.map(col => {
            return col;
        });
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Danh sách hotel</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Link to='/add'>
                        <Button
                            style={{ margin: '8px 0' }}
                            type="primary"
                        >Thêm mới</Button>
                    </Link>
                    <Table
                        rowKey={record => record.uid}
                        columns={columns}
                        dataSource={this.state.data}
                    />
                </div>
            </Content>
        )
    }
}
