import React from 'react';
import { Button, Result } from 'antd';

const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi chúng tôi không tìm thấy địa chỉ!"
    extra={<Button type="primary" onClick={() => {window.location.href = '/'}}>Trang chủ</Button>}
  />
);

export default App;