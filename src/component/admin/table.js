import { Table, Divider, Popconfirm } from 'antd';
import React from 'react'
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
                render: (text, record) => (
                    <span>
                        <a href='/'>Edit </a>
                        <Divider type="vertical" />
                        <a href='/'>Delete</a>
                    </span>
                ),
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            data: [],
            demo: []
        }
    }
    handleDelete = id => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE'
        })
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        try {
            let response = await fetch('https://raw.githubusercontent.com/bvanh/data-demo-react-app/master/data.json');
            let responseJson = await response.json();
            this.setState({
                data: responseJson.datahotel
            })
            console.log(responseJson)
        } catch (error) {
            console.error(error);
        }
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
