import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { userRegister } from "../../api/AuthRequest";

const OtpFormm = ({
  userDetails,
  otp,
  setPageType,
  setOtpField,
  setRegButton,
}) => {
  const [errorAlert,setErrorAlert] = useState(false)
  const onFinish = async (value) => {
    try {
      if (otp === value.otp) {
        const response = await userRegister(userDetails);
        if (response.data) {
          setOtpField(false);
          setRegButton(true);
          setPageType("login");
         
        }
      } else {
        setErrorAlert(true)
       
      }
    } catch (error) {
      setErrorAlert(true)
      console.log(error);
    }
  };
  return (
    <div>
      {errorAlert?  <Alert message="Incorrect OTP" type="error" showIcon closable /> :""}       
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<label style={{ color: "white" }}>ENTER YOUR OTP</label>}
          name="otp"
        >
          <Input placeholder="Enter OTP " />
        </Form.Item>

        <div className="d-flex flex-column">
          <Button className="primary-button my-2" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OtpFormm;
