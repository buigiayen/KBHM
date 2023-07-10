
import { Avatar, Card, Skeleton, Switch } from "antd";
const { Meta } = Card;
const App = ({ avatar, Title, description, ActionArray }) => {
  return (
    <>
      <br></br>
      <Card actions={ActionArray}>
        <Skeleton avatar loading={false}>
          <Meta
            avatar={<Avatar src={avatar} />}
            title={Title}
            description={description}
          />
        </Skeleton>
      </Card>
    </>
  );
};
export default App;
