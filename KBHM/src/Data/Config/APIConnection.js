import axios from 'axios'
import { message, notification } from 'antd';
import { Warning , Error } from '../../Components/notification'
const Connection = async (URI, method = 'GET', body, params = null, Type = 'application/json') => {
    var UrlBase;
    if (process.env.NODE_ENV === "development") { UrlBase = process.env.REACT_APP_PUBLIC_URL_DEV + URI };
    if (process.env.NODE_ENV === 'production') { UrlBase = process.env.REACT_APP_PUBLIC_URL_PRODUCT + URI };
    if (process.env.NODE_ENV === 'test') { UrlBase = process.env.REACT_APP_PUBLIC_URL_TEST + URI };
    return await axios(UrlBase, {
        method: method,
        headers: {
            'Content-Type': Type,
            'Authorization': 'Bearer '
                + localStorage.getItem("Token"),

        },
        params: {
            ...params,
        },
        data: body,
    });
}


const ShowMessenger = (typeMessenger, Title) => {
    message.destroy();
    switch (typeMessenger) {
        case "Info":
            message.info(Title);
            break;
        case "warning":
            message.warning(Title);
            break;
        case "error":
            message.error(Title);
            break;
        default:
            break;

    }
}

export const HttpRequest = async (method = 'GET', URI, body, messageShow = false, params, Type) => {
    let data = [];
    if (messageShow) {
        const hide = message.loading('Loading data ...', 0);
        setTimeout(hide, 3000);
    };
    try {
        data = await Connection(URI, method, body, params, Type);
        console.log(data)
        return ExposeData({ ObjectData: data, ShowToast: messageShow });
    }
    catch (e) {
        MessengerError({ ObjectTrycatch: e })
    }
    return data;
}

const ExposeData = ({ ObjectData, ShowToast }) => {
    const {status, data } = ObjectData;
    if (ShowToast) {
        switch (status) {
            case 200:
                ShowMessenger("Info", 'Success!');
                break;
            case 201:
                ShowMessenger("Info", 'Create new success!');
                break;
            case 204:
                console.log('No content')
                break;
            default:
                ShowMessenger("error", 'Error backend!');
                break;
        }
    }

    return data.data ?? [];
}
const MessengerError = ({ ObjectTrycatch }) => {

    const { code, message } = ObjectTrycatch;
    if (code === "ERR_BAD_REQUEST") {
        const { response: { data: messenger } } = ObjectTrycatch
        Warning({ description: messenger.messenger, message: "Thông báo" })
    }
    if (code === "ERR_NETWORK") { 
        Error({ description: message, message: "Thông báo" })
    }
    return [];
}
