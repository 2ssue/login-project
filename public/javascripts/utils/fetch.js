function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.status === 200) {
        res.text().then((res) => {
          resolve(res);
        });
      } else reject(res.statusText);
    });
  });
}

function post(url, postData) {
  return new Promise((resolve, reject) => {
    fetch(url, postData).then((res) => {
      if (res.status === 200) {
        res.text().then((res) => {
          resolve(res);
        });
      } else reject(res.statusText);
    });
  });
}

export { get, post };
