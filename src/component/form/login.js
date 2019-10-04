import { Form, Input, Tooltip, Icon, Button } from 'antd';
import React from 'react';
import { OmitProps } from 'antd/lib/transfer/renderListBody';


export default function LoginForm(props) {

    return (
        <div>
            <Form>
                <Input
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                    onChange={props.getUsername}
                    required
                />
                <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    onChange={props.getPassword}
                    required
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={props.submit}
                >
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </Form>
        </div>
    )
}