import { notification } from "antd";



export const Success = (config) => {
    notification.success(config)
}
export const Error = (config) => {
    notification.error(config)
}

export const Warning = (config) => {
    notification.warning(config)
}
export const Info = (config) => {
    notification.info(config)
}


