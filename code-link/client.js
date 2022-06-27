
export default class codeLink {
    constructor(options = {}){
        if (process.env.NODE_ENV === 'development') {
            require('./client.css')
            this.url = options.url || 'http://127.0.0.1:1234'
            this.type = options.type || 'vsCode'
            const _this = this;
            document.oncontextmenu = function() {
                return false;
            }
            document.onmousedown = function(e) {
                if (e.shiftKey && e.button === 0) {
                    const element = document.createElement('div');
                    const elementId = "clickBall" + _this.uuid(8, 16);
                    element.id = elementId;
                    element.style.left = (e.clientX - 20) + "px";
                    element.style.top = (e.clientY - 20) + "px";
                    element.setAttribute("class", "clickBall hidSlow");

                    document.body.appendChild(element);
                    setTimeout(() => {
                        document.getElementById(elementId).remove();
                    }, 1000)

                    e.preventDefault();
                    const filePath = _this.getFilePath(e.target);
                    if(filePath){
                      _this.request(filePath)
                    }
                }
            }
        }
    }
    getFilePath(element) {
        if (!element || !element.getAttribute) return null
        if (element.getAttribute('code-location')) {
            return element.getAttribute('code-location')
        }
        return this.getFilePath(element.parentNode)
    }
    uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
    request(filePath){
        let xhr = new XMLHttpRequest;
        xhr.open("POST", this.url + '/code-link', true);
        xhr.send('filePath=' + filePath + '&type=' + this.type);
    }
}
