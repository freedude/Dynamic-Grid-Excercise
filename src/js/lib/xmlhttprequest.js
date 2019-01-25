// XMLHttpRequest Plugin
// Could also use Axios or Fetch API

const defaults = {
    url: "http://api.icndb.com/jokes/random?exclude=[explicit]",
    method: "GET"
};

const extend = (obj, src) => {
    for (let key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
};


export default class {
    constructor(options) {
        this.s = extend(defaults, options);
        this.xhr = new XMLHttpRequest();
        this.xhr.open(this.s.method, this.s.url, true);
        this.xhr.onload = () => this.onLoad();
        this.xhr.onprogress = value => this.onProgress(value);
        this.xhr.send();
        this.queue = {
            progress: [],
            success: [],
            error: []
        };
    }
   
    onLoad() {
        const isOk = this.xhr.status >= 200 && this.xhr.status < 300;
        const queue = isOk ? this.queue.success : this.queue.error;
        queue.forEach(cb => cb(this.xhr));
    }
    onProgress(value) {
        this.queue.progress.forEach(cb => cb(value));
    }

    onEvent(event, callback) {
        this.queue[event].push(callback);
    }
}