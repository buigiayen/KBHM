import axios from 'axios'
import { message } from 'antd';
import { Config } from './config.system';
const Connection = (URI, method = 'GET', body, params = null, Type = 'application/json') => {

    const UrlBase = URI;
    return axios(Config.URL_BACKEND + UrlBase, {
        method: method,
        headers: {
            'Content-Type': Type,
            'Authorization': 'Bearer '
                + localStorage.getItem("Token"),
            'Accept': 'application/json'
        },
        params: {
            ...params,
        },
        data: body,
    }).catch();
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
        return ExposeData(data);
    }
    catch {
        ShowMessenger("error", 'server is not running!');
    }
    return data;
}

const ExposeData = (datas) => {

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
    return datas.data.data ?? [];
}