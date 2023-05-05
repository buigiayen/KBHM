import axios from 'axios'
import { message } from 'antd';
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
    var data = [];
    if (messageShow) {
        const hide = message.loading('Loading data ...', 0);
        setTimeout(hide, 3000);
    };
    try {
        data = await Connection(URI, method, body, params, Type);
        return ExposeData(data, messageShow);
    }
    catch (e) {
        const data = { status: e.response.status, data: null };
        MessErr(data)
    }
    return data;
}

const ExposeData = (datas, ShowToast = true) => {
    if (ShowToast) {
        switch (datas.status) {
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

    return datas.data.data ?? [];
}
const MessErr = (datas) => {

    switch (datas.status) {
        case 400:
            ShowMessenger("error", 'Bad request!');
            break;
        case 401:
            ShowMessenger("error", 'Unauthorized!');
            break;
        case 405:
            ShowMessenger("error", 'Method Not Allowed!');
            break;
        case 408:
            ShowMessenger("error", 'Request Timeout!');
            break;
        case 409:
            ShowMessenger("error", 'Conflict!');
            break;
        case 500:
            ShowMessenger("error", 'Internal Server Error!');
            break;
        default:
            ShowMessenger("error", 'Error backend!');
            break;
    }


    return [];
}
