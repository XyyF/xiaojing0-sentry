class Drawer {
    constructor() {}

    init() {
        console.log(123, 'rengar')
        window.abc = 1231
        console.log(123, 'rengar', window.abc)
    }
}

window.drawer = new Drawer()