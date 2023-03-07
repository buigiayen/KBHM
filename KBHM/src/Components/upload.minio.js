import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Post_Minio } from '../Data/Api/Minio'


const App = ({ UrlImage, value }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must smaller than 10MB!');
        }
        return isJpgOrPng && isLt10M;
    };
    useMemo(() => {

        const picture = {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: value ?? "",
        }
        fileList.push(picture)
        setFileList(fileList);
    }, [value])
    const handleCancel = () => setPreviewOpen(false);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleOK = async (info) => {
        var body = { formFile: info.file, size: 1021, bucket: 'avatar' }
        await Post_Minio(body).then(
            (rs) => {
                setPreviewImage(rs.filePath);
                setPreviewImage("image.png");
                const picture = {
                    uid: '1',
                    name: 'image.png',
                    status: 'done',
                    url: rs.filePath,
                }
                fileList.push(picture)
                setFileList(fileList);
                if (UrlImage !== undefined) {
                    UrlImage(rs.filePath)
                }
            }
        );
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload

                listType="picture-card"
                fileList={fileList}

                onChange={handleChange}
                beforeUpload={beforeUpload}
                customRequest={handleOK}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default App;