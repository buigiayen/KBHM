import React, { Component, useEffect, useState } from "react";
import { Select, Space } from "antd";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";
import { Form } from "antd";
const QRCaM = ({ Value }) => {
  const [Result, SetResult] = useState();
  const [Drivers] = useState([
    {
      label: "Cam sau",
      value: "user",
    },
    {
      label: "Cam trước",
      value: "environment",
    },
  ]);
  const [chooseDriver, SetChooseDriver] = useState("user");

  const handleScan = (data) => {
    SetResult(data);
    Value(data);
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Form>
        <Form.Item>
          <QrReader delay={300} style={{ height: 246 + "px" }} onError={handleError} onScan={handleScan} facingMode={chooseDriver} />
        </Form.Item>
      </Form>

      <>
        <Select
          style={{ width: 256 }}
          defaultValue={chooseDriver}
          onChange={(value) => {
            SetChooseDriver(value);
          }}
          options={Drivers}
        />
      </>
      <p>Kết quả QR:{Result}</p>
    </div>
  );
};

QRCaM.prototype = {
  Value: PropTypes.func,
  ListDrive: PropTypes.array,
};

export default QRCaM;
