import { Input, Row, Col, Button } from "antd";
import React from "react";
import { useState } from "react";
import { labo } from "../../../../Data/UnitData/data";
import List from "../../../List";
import IconCombine from "../../../Icon";
const XnTruocHien = () => {
  const [stateXNTruocHien, SetStateXNTruocHien] = useState(...labo);
  const PushState = (value) => {
  };
  const columns = [
    {
      title: "Chỉ số xét nghiệm",
      dataIndex: "Name",
      key: "name",
      width: 120,
      filterSearch: true,
    },
    {
      title: "Kết quả",
      dataIndex: "Result",
      key: "age",
      width: 120,
      render: (_, value) => {
        return (
          <Input
            onChange={(e) => {
              {

                SetStateXNTruocHien({
                  ...stateXNTruocHien,
                  Result: e.target.value,
                });
              }
            }}
          />
        );
      },
    },
    {
      title: "Người valid",
      dataIndex: "UserValid",
      key: "address",
      width: 120,
      render: (_, value) => {
        return (
          <Button
            icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}
            onClick={() => PushState(value)}
          >
            Valid
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <List  data={labo} columns={columns} />
      <br></br>
    </>
  );
};
export default XnTruocHien;
