import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
// import { message } from "flwww";
import * as actionCreators from "../../Store/action/index";
import "./register.css";

const { Text } = Typography;
const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
      } else {
        // console.log(err);
      }
    });
    this.props.authInit();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.props.signIn({ email: values.email, password: values.password });
      } else {
        // console.log(err);
      }
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/blogs");
    }
    const {
      form: {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched
      },
      loginError,
      loginLoading
    } = this.props;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          validateStatus={usernameError ? "error" : ""}
          help={usernameError || ""}
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              { required: true, message: "Please input your email!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        {loginError ? (
          <div>
            <Text type="danger">{loginError}</Text>
          </div>
        ) : null}
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/forgot-password">
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={hasErrors(getFieldsError())}
            loading={loginLoading}
          >
            {loginLoading ? "" : "Log in"}
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({
  name: "normal_login"
})(Login);

const mapStateToProps = ({ firebaseReducer, authReducer }) => {
  return {
    loginError: authReducer.authError,
    loginLoading: authReducer.authLoading,
    isAuthenticated: !firebaseReducer.auth.isEmpty
  };
};
const mapDisptchToProps = disptch => {
  return {
    signIn: cred => disptch(actionCreators.login(cred)),
    authInit: () => disptch(actionCreators.authInit())
  };
};
export default connect(
  mapStateToProps,
  mapDisptchToProps
)(WrappedNormalLoginForm);
