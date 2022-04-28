class SocketClass {

    constructor() {
        this.params = {}
    }

    setApiKey(key, value) {
        if (!!key && !!value) {
           this.addParam(key, value)
        }
    }

    addParam(field, value) {
        this.params[field] = value
    }

    getParams() {
        return this.params
    }
}

export default SocketClass;