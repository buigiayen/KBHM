import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Image } from 'antd'

const App = () => {
    return (
        <Carousel autoplay>
            <div>
                <Image
                    src={'http://hienmau.bvdktinhthanhhoa.com.vn:9000/banner/Fresh idea.png'}
                    preview={false}
                    alt="1887-768" />
            </div>
        </Carousel>
    );
};
export default App;