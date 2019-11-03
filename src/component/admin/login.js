import React from 'react';
import app from 'firebase/app';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams, Redirect
} from "react-router-dom";
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.auth = app.auth();
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    login(e) {
        e.preventDefault();
        this.auth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
                this.setState({
                    redirect: true
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Form>
                    <Input
                        placeholder="Enter your email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                            <Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        name='email'
                        onChange={this.handleChange}
                        required
                    />
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        name='password'
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={this.login}
                    >
                        Log in
                </Button>
                    Or <a href='/'>register now!</a>
                </Form>
            </div>
        )
    }

}