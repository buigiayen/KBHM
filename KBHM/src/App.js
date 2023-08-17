import "./App.css";
import RouterIndex from "./Router/index";
import { Row, Col } from "antd";
import FloatButton from "./Components/Float.Button";
import Banner from "./Components/Img.Carousel";

function App() {
  return (
    <div className="App">
      <Banner></Banner>
      <RouterIndex></RouterIndex>
      <br />
      <br />
    </div>
  );
}

export default App;
