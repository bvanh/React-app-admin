import { Table, Divider, Popconfirm } from 'antd';
import React from 'react'
import axios from 'axios';
import db from './firebase'
export default class Danhsach extends React.Component {
    constructor(props) {
        super(props);
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
                            <a href='/'>Edit </a>
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
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
    handleDelete = id => {
        axios.delete(`https://data-demo-react-app.herokuapp.com/datahotel/` + id)
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.id !== id) });

    };
    componentWillMount() {
        // get the whole collection
        db
            .collection('documents')
            .doc('hotels')
            .get()
            .then(doc => {
                const demo = doc.data();
                console.log(demo);
                this.setState({
                    data: demo.data
                })
            });
    }
    render() {
        const columns = this.columns.map(col => {
            return col;
        });
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}
