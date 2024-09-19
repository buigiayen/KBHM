import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";

const BarPlots = ({ dataSource, color }) => {
  const [data, SetData] = useState([]);
  useEffect(() => {
    SetData(dataSource);
  }, [dataSource]);

  const config = {
    data,
    xField: "value",
    yField: "label",
    seriesField: "label",
    style: {
      height: 200,
    },
    color: ({ label }) => color(label),
    meta: {
      value: {
        alias: "Tổng số",
      },
    },
    legend: {
      position: "top-left",
    },
    label: {
      position: "middle",
    },
  };
  return <Bar style={{ width: "100%" }} {...config} />;
};
export default BarPlots;
