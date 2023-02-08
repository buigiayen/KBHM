import { Collapse, Space } from 'antd';
import './css/GroupComponents.css'
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const App = (props) => (
  <Space direction={props.direction}>
    <Collapse collapsible={props.collapsible}>
      <Panel header={props.header}>
        {props.Component ?? []}
      </Panel>
    </Collapse>
  </Space>
);
export default App;