import React, { Component, useEffect, useState } from 'react'
import { Select } from 'antd';
import QrReader from 'react-qr-reader'
import PropTypes from 'prop-types';
const QRCaM = ({
  Value,

}) => {
  const [Result, SetResult] = useState()
  const [Drivers] = useState([
    {
      label: "Cam sau",
      value : "environment"
    },
    {
      label: "Cam trước",
      value : "user"
    }
  ])
  const [chooseDriver, SetChooseDriver] = useState("environment")


  const handleScan = (data) => {
    SetResult(data);
    Value(data);
  }
  const handleError = (err) => {
    console.error(err)
  }
  const previewStyle = {
    height: 260,
  }
  return <div>
    <QrReader
      delay={100}
      style={previewStyle}
      onError={handleError}
      onScan={handleScan}
      facingMode={chooseDriver} 
      constraints={{
        facingMode: 'user',
        deviceId: chooseDriver
      }}
    />
    <><Select
      onChange={value => { SetChooseDriver(value) }}
      options={Drivers}
    /></>
    <p>Kết quả QR:{Result}</p>
  </div>
}

QRCaM.prototype = {
  Value: PropTypes.func,
  ListDrive: PropTypes.array
}

export default QRCaM;