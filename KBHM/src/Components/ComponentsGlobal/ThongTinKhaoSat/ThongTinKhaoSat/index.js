import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import List from "../../../List";
import { GET_PropertiesPerson } from "../../../../Data/Api/DangKyKham";

const Index = ({ ID }) => {
  const [PropertiesPerson, SetPropertiesPerson] = useState();
  useEffect(() => {
    if (ID !== undefined) {
      GET_PropertiesPerson(ID).then((rs) => {
        const data = rs.map((r) => {
          return { label: r.Label, value: r.value == "true" ? true : r.value == "false" ? false : r.value, key: r.Key };
        });
        SetPropertiesPerson(data);
      });
    }
  }, [ID]);

  const columns = [
    {
      title: "Thông tin câu hỏi?",
      dataIndex: "label",
      key: "label",
      render: (_, { value, key }) => (
        <>
          {value ? (
            <Alert message={`${_}: ${value == true ? "Có" : value == false ? "Không" : value}`} type={"error"} />
          ) : (
            <Alert message={`${_}: ${value == true ? "Có" : value == false ? "Không" : value}`} type="success" />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <List data={PropertiesPerson} columns={columns} />
    </>
  );
};
export default Index;
