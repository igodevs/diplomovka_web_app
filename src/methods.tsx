export const saveAuthTokenInSession = (token: string) => {
  window.sessionStorage.setItem('token', token);
};

export const getAuthTokenFromSession = (): string | null => {
  return window.sessionStorage.getItem('token');
};

export const getDateFromDBTimestamp = (timestamp: string): Date => {
  console.log('date', timestamp, new Date(timestamp.replace(' ', 'T') + 'Z'));
  return new Date(timestamp.replace(' ', 'T') + 'Z');
};

export const getCurrentDateWithFormatForDB = (date: Date): string => {
  var stringDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  var stringTime =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return stringDate + ' ' + stringTime;
};

export const getStringDate = (date: Date): string => {
  var stringDate =
    date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  var stringTime =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return stringDate + ' ' + stringTime;
};
