const parseCookies = (cookies) => {
  return cookies.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[decodeURIComponent(key.trim())] = decodeURIComponent(value.trim());
    return acc;
  }, {});
};

module.exports = {
  parseCookies,
};
