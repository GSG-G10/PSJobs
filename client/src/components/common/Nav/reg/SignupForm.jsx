import {
  Button, Image, Typography, message,
  Form, Input,
} from 'antd';
import '../style.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Logo } from '../../../../assets';

const { Title } = Typography;

function TypeAccount({ typeUser }) {
  const onFinishFailed = () => {
    message.warning('This is a warning');
  };

  const checkLogin = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', { value: values, typeUser });
      message.success(response.data);
    } catch (error) {
      message.warning(error.message);
    }
  };

  const lineNameInputs = (label, name1, name2, place1, place2) => (
    <Form.Item label={label}>
      <Form.Item
        name={name1}
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <Input placeholder={place1} />
      </Form.Item>
      <Form.Item
        name={name2}
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
      >
        <Input placeholder={place2} />
      </Form.Item>
    </Form.Item>
  );

  return (
    <div>
      <div className="icon_jsjobs">
        <Image
          preview={false}
          width={60}
          src={Logo}
        />
        <Title level={4}>Sign up</Title>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={checkLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form_to_login"
      >
        {
        typeUser === 'company'
          ? lineNameInputs('Company Name', 'name', 'location', 'Name', 'Location')
          : lineNameInputs('Full name', 'first_name', 'last_name', 'First name', 'Last name')

        }
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your username!' },
            { type: 'email' },
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
        <Form.Item
          label="Confirm Password"
          name="cpassword"
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
}

TypeAccount.propTypes = {
  typeUser: PropTypes.string.isRequired,
};

export default TypeAccount;
