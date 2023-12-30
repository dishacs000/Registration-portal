class Response {
    constructor(status, data, failed) {
        this.status = status;
        this.data = data;
        this.failed = failed
    }
}
module.exports=Response