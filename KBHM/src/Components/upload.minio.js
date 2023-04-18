import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Post_Minio } from '../Data/Api/Minio'


const App = ({ UrlImage, value }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [imageUrl, setimageUrl] = useState();
    useEffect(() => {
        setimageUrl(UrlImage)
    },[UrlImage])
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

    const handleCancel = () => setPreviewOpen(false);
    const handleOK = async (info) => {
        var body = { formFile: info.file, size: 1021, bucket: 'avatar' }
        await Post_Minio(body).then(
            (rs) => {

                setPreviewImage("image.png");
                setimageUrl(rs.filePath);

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
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={handleOK}
            >
                {(imageUrl) ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
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