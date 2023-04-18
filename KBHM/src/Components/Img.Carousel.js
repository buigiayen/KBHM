import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Image } from 'antd'

const App = () => {
    return (
        <Carousel autoplay>
            <div>
                <Image
                    src={'https://hienmau.bvdktinhthanhhoa.com.vn:9874/gw/s3/banner/banner.png'}
                    preview={false}
                    alt="1887-768" />
            </div>
        </Carousel>
    );
};
export default App;