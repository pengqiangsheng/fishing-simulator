const request = ({
  url,
  method = "post",
  data,
  timeout = 10 * 1000,
  headers = {}
}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.timeout = timeout;
    xhr.onload = e => {
      resolve({
        data: e.target.response
      });
    };
    xhr.onerror = () => {
      reject("网络错误！");
    };
    xhr.ontimeout = () => {
      reject("请求超时！");
    };
    xhr.send(data);
  });
}

module.exports = request