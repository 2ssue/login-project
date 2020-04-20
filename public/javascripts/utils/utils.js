const parseCookies = (cookies) => {
  return cookies.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      acc[decodeURIComponent(key.trim())] = decodeURIComponent(value.trim());
    }
    return acc;
  }, {});
};

export { parseCookies };
