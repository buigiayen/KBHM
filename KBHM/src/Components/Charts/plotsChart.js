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
    minBarWidth: 20,
    maxBarWidth: 20,
    seriesField: "label",
    color: ({label}) => color(label),
    meta: {
      value: {
        alias: "Tổng số",
      },
    },
    legend: {
      position: "top-left",
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'left', 'middle', 'right'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return <Bar style={{ width: 100 + "%" }} {...config} />;
};
export default BarPlots;
