import {
  Button, Image, Typography, Form, Input, message,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Logo } from '../../../../assets';

import '../style.css';

const { Title } = Typography;

const typeAccount = ({ typeUser }) => {
  const openMessage = (text) => {
    message.loading('Loading...');
    setTimeout(() => {
      message.success(text);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };
  const checkLogin = async (values) => {
    try {
      const responseLogin = await axios.post(
        `/api/v1/auth/${typeUser}`,
        values,
      );
      const authenticationMessage = await responseLogin.data.Authentication;
      openMessage(authenticationMessage);
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div>
      <div className="icon_jsjobs">
        <Image preview={false} width={60} src={Logo} />
        <Title level={4}>Log in</Title>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={checkLogin}
        autoComplete="off"
        className="form_to_login"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input placeholder="mail@email.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item className="bowl_btn_submit">
          <Button type="primary" className="ant-btn-submit" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

typeAccount.propTypes = {
  typeUser: PropTypes.string.isRequired,
};

export default typeAccount;
