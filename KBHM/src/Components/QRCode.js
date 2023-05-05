import { Button, QRCode ,Segmented } from 'antd';
import IconCombine from '../Components/Icon'
const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
const App = (prop) => (
  <div id="myqrcode">
    <QRCode
      value={prop.value}
      style={{
        marginBottom: 16,
        colorWhite:false
      }}
      size={340}
      color='green'
      errorLevel={'H'}
    />
   
    <Button type="primary" onClick={downloadQRCode} size='large' style={{marginLeft:20, backgroundColor:'green'}}  icon={<IconCombine.DownloadOutlined></IconCombine.DownloadOutlined>}>
      Download
    </Button>
  </div>
);
export default App;