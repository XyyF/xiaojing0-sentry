class Drawer {
    constructor() {
    }

    init() {
        // 需要发送请求的地方
        chrome.runtime.sendMessage({
            // 里面的值应该可以自定义，用于判断哪个请求之类的
            type: EVENT_TYPE.FETCH_ISSUES,
            path: '', // 需要请求的url
        }, (response) => {
            console.log(312, response)
        });
    }
}

window.drawer = new Drawer()