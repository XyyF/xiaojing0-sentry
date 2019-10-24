chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    // 获取sentry上的issues (跨域请求)
    if (request.type === EVENT_TYPE.FETCH_ISSUES) {
        _get(request.path, request.opts).then(data => {
            sendResponse(data);
        })
    }
    return true
});

function _get(path = '', opts = {}) {
    const url = `https://sentry.io/api/0/${path}`;

    const cfg = {url, method: 'GET', cache: false};

    if (opts.token) {
        cfg.headers = {Authorization: 'Bearer ' + opts.token};
    }

    return axios(cfg).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    });
}