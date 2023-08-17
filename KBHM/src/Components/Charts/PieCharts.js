import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { Alert } from "antd";

const PieChart = ({ title, dataSource, color }) => {
  const [data, SetData] = useState([]);
  useEffect(() => {
    SetData(dataSource);
  }, [dataSource]);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "label",
    color: ({ label }) => color(label),
    radius: 0.9,
    label: {
      type: "inner",
      labelHeight: 12,
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Pie style={{ width: 100 + "%" }} {...config} />
    </>
  );
};
export default PieChart;
