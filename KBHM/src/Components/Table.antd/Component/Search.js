import React, { useState } from "react";
import { Button, message, Popconfirm, Input } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const App = ({ onConfirm }) => {
  const [Value, SetValue] = useState();
  const confirm = () => {
    if (onConfirm !== undefined) {
      onConfirm(Value);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };
  return (
    <Popconfirm
      icon={<QuestionCircleOutlined style={{ color: "blue" }} />}
      title={"Filter"}
      description={
        <Input
          size="small"
          placeholder={"InputKey"}
          onChange={(e) => SetValue(e.target.value)}></Input>
      }
      onConfirm={confirm}
      onCancel={cancel}
      okText={"Confirm"}
      cancelText={"Cancel"}>
      <Button
        type="text"
        icon={<SearchOutlined style={{ color: "blue" }} />}></Button>
    </Popconfirm>
  );
};

export default App;
