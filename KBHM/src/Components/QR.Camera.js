import React, { Component, useEffect, useState } from 'react'
import { Select } from 'antd';
import QrReader from 'react-qr-reader'
import PropTypes from 'prop-types';
const QRCaM = ({
  Value,

}) => {
  const [Result, SetResult] = useState()
  const [Drivers, SetDrivers] = useState([])
  const [chooseDriver, SetChooseDriver] = useState()
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(rs => {
      console.log(rs)
      let Drivers = [];
      rs.map(rs => {
        if (rs.deviceId) {
          Drivers.push({ label: rs.label, value: rs.deviceId })
        }

      })
      SetDrivers(Drivers)
    })
  }, [])


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
      facingMode={'environment'}
     
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