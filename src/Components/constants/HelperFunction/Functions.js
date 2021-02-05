import { notification } from 'antd';

export const popUpNotification = (type,message, description) => {
    notification[type]({
      message,
      description
    });
};

export const sanitize = (string) => {
  const map = {
      '<': '(',
      '>': ')',
      "/": " (slash)",
      "\\": ''
  };
  const reg = /[<>/\\]/ig;
  return string.replace(reg, (match)=>(map[match]));
};