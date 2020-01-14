import { notification } from 'antd';

export const popUpNotification = (type,message, description) => {
    notification[type]({
      message,
      description
    });
};