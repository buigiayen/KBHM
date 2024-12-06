import axios, { AxiosStatic } from "axios";
import { message, notification } from "antd";
import { Warning, Error } from "../../Components/notification";

const Connection = async (URI, method = "GET", body, params = null, Type = "application/json") => {
  var UrlBase;
  if (process.env.NODE_ENV === "development") {
    UrlBase = process.env.REACT_APP_PUBLIC_URL_DEV + URI;
  }
  if (process.env.NODE_ENV === "production") {
    UrlBase = "api-gw" + URI;
  }
  if (process.env.NODE_ENV === "test") {
    UrlBase = process.env.REACT_APP_PUBLIC_URL_TEST + URI;
  }
  return await axios(UrlBase, {
    method: method,
    headers: {
      "Content-Type": Type,
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    params: {
      ...params,
    },
    data: body,
  }).catch((rs) => {
    MessengerError({ ObjectTrycatch: rs });
  });
};
export const connectionApiThirdParty = async ({ URL, method = "GET", body, params = null, Type = "application/json", headers, responseType }) => {
  return await axios(URL, {
    method: method,
    headers: headers,
    params: params,
    data: body,
    responseType: responseType,
  }).catch((rs) => {
    MessengerError({ ObjectTrycatch: rs });
  });
};

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
};

export const HttpRequest = async (method = "GET", URI, body, messageShow = false, params, Type) => {
  let data = [];
  if (messageShow) {
    const hide = message.loading("Đang tải dữ liệu", 0);
    setTimeout(hide, process.env.REACT_APP_TIMEOUT);
  }
  try {
    data = await Connection(URI, method, body, params, Type);
    return ExposeData({ ObjectData: data, ShowToast: messageShow });
  } catch (e) {
    MessengerError({ ObjectTrycatch: e });
  }
  return data;
};
export const HttpRequestFile = async (method = "GET", URI, body, messageShow = false, params, Type) => {
  let data = [];
  if (messageShow) {
    const hide = message.loading("Đang tải dữ liệu", 0);
    setTimeout(hide, process.env.REACT_APP_TIMEOUT);
  }
  try {
    return await Connection(URI, method, body, params, Type);
  } catch (e) {
    MessengerError({ ObjectTrycatch: e });
  }
  return data;
};

const ExposeData = ({ ObjectData, ShowToast }) => {
  const { status, data } = ObjectData;
  if (ShowToast) {
    switch (status) {
      case 200:
        ShowMessenger("Info", "Success!");
        break;
      case 201:
        ShowMessenger("Info", "Create new success!");
        break;
      case 204:
        console.log("No content");
        break;
      default:
        ShowMessenger("error", "Error backend!");
        break;
    }
  }

  return data.data ?? [];
};
const MessengerError = ({ ObjectTrycatch }) => {
  const { code, message, request } = ObjectTrycatch;
  if (code === "ERR_BAD_REQUEST") {
    const {
      response: { data: messenger },
    } = ObjectTrycatch;
    if (request.status === 401) {
      window.location.href = "/login";
    }
    Warning({ description: messenger.messenger, message: "Thông báo" });
  }
  if (code === "ERR_NETWORK") {
    Error({ description: message, message: "Thông báo" });
  }
  if (code === "ERR_BAD_RESPONSE") {
    Error({ description: message, message: "Thông báo" });
  }
  ShowMessenger("error", "Error backend!");
  return [];
};
