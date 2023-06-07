import { Collapse, Space } from 'antd';
import './css/GroupComponents.css'
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const App = ({ direction, collapsible, header, Component }) => (
  <Space direction={direction}>
    <Collapse collapsible={collapsible}>
      <Panel header={header}>
        {Component ?? []}
      </Panel>
    </Collapse>
  </Space>
);
export default App;