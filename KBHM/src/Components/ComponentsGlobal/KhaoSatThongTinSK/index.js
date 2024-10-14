import React from "react";
import { Divider, Row, Col, Radio, Input } from "antd";
import { useEffect, useState } from "react";
import { formType, Question } from "../../../Data/UnitData/data";

const Index = ({ Value, Persons }) => {
  const [Properties, SetProperties] = useState({ data: [{ key: null, label: null, value: null }] });

  const SetQuestion = (e, value) => {
    const { data } = Properties;
    if (data.filter((p) => p.key === value.Key).length === 0) {
      if (value.type === formType.checkbox) {
        data.push({ key: value.Key, label: value.value, value: e.target.value === 1 ? "true" : "false" });
      } else if (value.type === formType.text) {
        data.push({ key: value.Key, label: value.value, value: e.target.value });
      }
    } else {
      data.forEach((rs, index) => {
        if (value.type === formType.checkbox) {
          if (rs.key === value.Key) {
            data[index].value = e.target.value === 1 ? "true" : "false";
          }
        } else if (value.type === formType.text) {
          if (rs.key === value.Key) {
            data[index].value = e.target.value;
          }
        }
      });
    }
    console.log(data);
    SetProperties({ data });
  };
  useEffect(() => {
    if (Value !== undefined) {
      const valueRef = Properties.data.filter((p) => p.key !== null);
      Value(valueRef);
    }
  }, [Properties]);

  useEffect(() => {
    let newProperties = Properties;
    newProperties.data.push({
      key: "7.1",
      label: Question.find((x) => x.Key == 7).data.find((x) => x.Key == "7.1").value,
      value: "false",
    });
    SetProperties({ ...newProperties });
  }, []);

  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "italic" }}>
          Khảo sát thông tin sức khỏe trước hiến máu <span style={{ color: "red", fontStyle: "italic" }}>*</span>
        </span>
      </Divider>
      <>
        {Question.map((Group, indexGroup) => {
          return (
            <>
              <p key={indexGroup} style={{ color: "red", fontWeight: "bold" }}>
                {Group.value}
              </p>
              {Group.data.map((Value, IndexValue) => {
                return (
                  <Row>
                    <Col span={1}></Col>
                    <Col key={IndexValue} span={10} xl={Value.type === formType.text ? 2 : 17}>
                      {Value.ShowText ? <small>- {Value.value}</small> : ""}
                    </Col>
                    {Value.type === formType.text ? (
                      <Col span={10} xl={18}>
                        <Input onChange={(e) => SetQuestion(e, Value)} size="small" placeholder="Bệnh khác..." style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }} />
                      </Col>
                    ) : (
                      <Col span={10} xl={6}>
                        {console.log(Properties.data.find((x) => x.key == Value.Key))}
                        <Radio.Group
                          onChange={(e) => SetQuestion(e, Value)}
                          value={Properties.data.find((x) => x.key == Value.Key)?.value == "true" ? 1 : Properties.data.find((x) => x.key == Value.Key)?.value == "false" ? 2 : null}
                        >
                          <Radio value={1} size="small">
                            Có
                          </Radio>
                          <Radio value={2} size="small">
                            Không
                          </Radio>
                        </Radio.Group>
                      </Col>
                    )}
                  </Row>
                );
              })}
              <br></br>
            </>
          );
        })}
      </>
    </>
  );
};
export default Index;
