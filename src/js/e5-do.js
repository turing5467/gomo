/*1.1.4*/
/* 
 * 去除空格 trim
 * 改变大小写 changeCase
 * 字符串循环复制 repeatStr
 * 
 * 数组元素交换 swap
 * 数组去重 removeRepeatArray
 * 数组顺序打乱 upsetArr
 * 数组最大值/最小值 maxArr/minArr
 * 数组求和/平均值 sumArr covArr
 * 随机获取数组中元素 randomOne
 * 数组扁平化 steamroller
 * 到某一个时间的倒计时 getEndTime
 * randomColor
 * getRandom
 * setUrlPrmt
 * getUrlPrmt
 * 现金额大写转换函数  upDigit
 * 清除对象中值为空的属性 filterParams
 * 设置cookie  setCookie
 * 获取cookie   getCookie
 * 删除cookie  removeCookie
 * 检测对象是否有哪个类名   hasClass
 * 添加类名  addClass
 * 删除类名 removeClass
 * 替换类名("被替换的类名","替换的类名") replaceClass
 * toggleClass
 * 获取兄弟节点  siblings
 * 显示隐藏  show/hide
 * 数据类型判断 isType
 * 判断是否为类数组 isArrayLike
 * 函数节流 delayFn
 */
var e5 = {
    // 寄生式继承
    inheritPrototype: function(Child, Parent) {
        var temp = Object.create(Parent.prototype);
        temp.constructor = Child;
        Child.prototype = temp;
    },

    /**
     * @desc 函数防抖
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param immediate true 表立即执行，false 表非立即执行
     */
    debounce: function(fn, delay) {
        let timeout = null;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn.call(this, arguments);
            }, delay);
        };
    },
    //节流函数
    throttle: function(fn, delay = 500) {
        let canRun = true;
        return function() {
            if (!canRun) {
                return;
            }
            canRun = false;
            setTimeout(() => {
                fn.call(this, arguments);
                canRun = true;
            }, delay);
        };
    },
    //深克隆
    deepClone: function(val, wm = new WeakMap) {
        if (val == null) return val; //null
        if (typeof val !== "object") return val; //基本数据类型
        if (val instanceof Date) return new Date(val); //Date类型
        if (val instanceof RegExp) return new RegExp(val); //正则
        if (wm.has(val)) return wm.get(val); //wm中存在引用,则直接返回引用
        let _instance = new val.constructor;
        wm.set(val, _instance); //保存引用类型至weakMap

        for (let key in val) {
            if (val.hasOwnProperty(key)) _instance[key] = deepClone(val[key], wm);
        }
        return _instance;
    },
    //扁平化
    flatten: function(arr) {
        return [].concat(...arr.map(
            x => Array.isArray(x) ? flatten(x) : x));
    },
    //currying
    currying: function(fn, length) {
        length = length || fn.length;
        return function(...args) {
            return args.length >= length ?
                fn.apply(this, args) :
                currying(fn.bind(this, ...args), length - args.length)
        }
    },


    //****************************字符串****************************/
    //去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    trim: function(str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /*type
     1: 首字母大写
     2：首字母小写
     3：大小写转换
     4：全部大写
     5：全部小写
     * */
    //changeCase('asdasd',1)
    //result：Asdasd
    changeCase: function(str, type) {
        function ToggleCase(str) {
            var itemText = ""
            str.split("").forEach(
                function(item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function(word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                });
            case 2:
                return str.replace(/\b\w+\b/g, function(word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
    //字符串循环复制
    //repeatStr(str->字符串, count->次数)
    //repeatStr('123',3)
    //"result：123123123"
    repeatStr: function(str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },

    //****************************数组*****************************/

    //数组交换元素
    swap: function(arr, a, b) {
        arr[a] = arr.splice(b, 1, arr[a])[0];
        return arr;
        //es6: [arr[a],arr[b]] = [arr[b],arr[a]]
    },
    //数组去重
    removeRepeatArray: function(arr) {
        return arr.filter(function(item, index, self) {
            return self.indexOf(item) === index;
        });
        //es6
        //return Array.from(new Set(arr))
        //return [...new Set(arr)];
    },
    //数组顺序打乱
    upsetArr: function(arr) {
        return arr.sort(function() {
            return Math.random() - 0.5
        });
    },

    //数组最大值
    //这一块的封装，主要是针对数字类型的数组
    maxArr: function(arr) {
        return Math.max.apply(null, arr);
    },
    //数组最小值
    minArr: function(arr) {
        return Math.min.apply(null, arr);
    },

    //这一块的封装，主要是针对数字类型的数组
    //数组求和
    sumArr: function(arr) {
        return arr.reduce(function(pre, cur) {
            return pre + cur;
        })
    },

    //数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    covArr: function(arr) {
        return this.sumArr(arr) / arr.length;
    },

    //从数组中随机获取元素
    randomOne: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //数组扁平化
    steamroller: function(arr) {
        var newArr = [],
            _this = this;
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr.push.apply(newArr, _this.steamroller(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    //另一种写法
    //steamroller([1,2,[4,5,[1,23]]])
    //[1, 2, 4, 5, 1, 23]
    /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
    //  steamroller: function (arr) {
    //      var newArr = [];
    //      for (var i = 0; i < arr.length; i++) {
    //          if (Array.isArray(arr[i])) {
    //              // 如果是数组，调用(递归)steamroller 将其扁平化
    //              // 然后再 push 到 newArr 中
    //              newArr = newArr.concat(steamroller(arr[i]));
    //          } else {
    //              // 不是数组直接 push 到 newArr 中
    //              newArr.push(arr[i]);
    //          }
    //      }
    //      return newArr;
    //  },

    //****************************对象及其他*****************************/

    //适配rem
    getFontSize: function(_client) {
        var doc = document,
            win = window;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                if (clientWidth > _client) {
                    clientWidth = _client
                }
                //设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
            };
        //屏幕大小改变，或者横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime: function(start, end) {
        var startDate = new Date(start); //开始时间，当前时间
        var endDate = new Date(end); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return { d: d, h: h, m: m, s: s };
    },
    //随进产生颜色
    randomColor: function() {
        //randomNumber是下面定义的函数
        //写法1
        //return 'rgb(' + this.getRandom(255) + ',' + this.getRandom(255) + ',' + this.getRandom(255) + ')';

        //写法2
        //return '#' + Math.random().toString(16).substring(2).substr(0, 6);

        //写法3
        var color = '#',
            _index = this.getRandom(0, 15);
        for (var i = 0; i < 6; i++) {
            color += '0123456789abcdef' [_index];
            _index = this.getRandom(0, 15)
        }
        return color;
    },
    //随机返回一个范围的数字
    getRandom: function(n1, n2) {
        //getRandom(5,10)
        //返回5-10的随机整数，包括5，10
        return Math.floor(Math.random() * (n2 - n1 + 1) + n1);
    },
    //设置url参数
    //setUrlPrmt({'a':1,'b':2})
    //result：a=1&b=2
    setUrlPrmt: function(obj) {
        var _rs = [];
        for (var p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&');
    },
    //获取url参数
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938')
    //result：Object{draftId: "122000011938"}
    getUrlPrmt: function(url) {
        url = url ? url : window.location.href;
        var urlInfo = url.split("?")[1].split("&"),
            obj = {},
            item;
        for (var i = 0; i < urlInfo.length; i++) {
            item = urlInfo[i].split("=");
            if (item[0].length) {
                let key = decodeURIComponent(item[0]);
                let value = decodeURIComponent(item[1]);
                obj[key] = value;
            }
        }
        return obj;
    },

    //现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function(n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            //s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams: function(obj) {
        var _newPar = {};
        for (var key in obj) {
            if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    //****************************cookie****************************/
    //设置cookie
    setCookie: function(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie: function(name) {
        var arr = document.cookie.split('; '),
            arr2;
        for (var i = 0; i < arr.length; i++) {
            arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    removeCookie: function(name) {
        this.setCookie(name, 1, -1);
    },

    /*DOM*/

    //检测对象是否有哪个类名
    hasClass: function(obj, classStr) {
        if (obj.className && this.trim(obj.className, 1) !== "") {
            var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) == -1) ? false : true;
        } else {
            return false;
        }

    },
    //添加类名
    addClass: function(obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'htmlcollection')) && obj.length >= 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (!this.hasClass(obj[i], classStr)) {
                    obj[i].className += " " + classStr;
                }
            }
        } else {
            if (!this.hasClass(obj, classStr)) {
                obj.className += " " + classStr;
            }
        }
    },
    //删除类名
    removeClass: function(obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'htmlcollection')) && obj.length > 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (this.hasClass(obj[i], classStr)) {
                    var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                    obj[i].className = obj[i].className.replace(reg, '');
                }
            }
        } else {
            if (this.hasClass(obj, classStr)) {
                var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj.className = obj.className.replace(reg, '');
            }
        }
    },
    //
    toggleClass: function(obj, str) {
        this.hasClass(obj, str) ? this.removeClass(obj, str) : this.addClass(obj, str);
    },
    //替换类名("被替换的类名","替换的类名")
    replaceClass: function(obj, newName, oldName) {
        this.removeClass(obj, oldName);
        this.addClass(obj, newName);
    },
    //获取兄弟节点
    //ecDo.siblings(obj,'#id')
    siblings: function(obj, opt) {
        var a = []; //定义一个数组，用来存o的兄弟元素
        var p = obj.previousSibling;
        while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling //最后把上一个节点赋给p
        }
        a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
        var n = obj.nextSibling; //再取o的弟弟
        while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        if (opt) {
            var _opt = opt.substr(1);
            var b = []; //定义一个数组，用于储存过滤a的数组
            if (opt[0] === '.') {
                b = a.filter(function(item) {
                    return item.className === _opt
                });
            } else if (opt[0] === '#') {
                b = a.filter(function(item) {
                    return item.id === _opt
                });
            } else {
                b = a.filter(function(item) {
                    return item.tagName.toLowerCase() === opt
                });
            }
            return b;
        }
        return a;
    },
    //显示隐藏
    show: function(obj) {
        var blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        } else {
            obj.style.display = 'block';
        }
    },
    hide: function(obj) {
        obj.style.display = "none";
    },
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax: function(obj) {
        obj = obj || {};
        obj.type = obj.type.toUpperCase() || 'POST';
        obj.url = obj.url || '';
        obj.async = obj.async || true;
        obj.data = obj.data || null;
        obj.success = obj.success || function() {};
        obj.error = obj.error || function() {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in obj.data) {
            params.push(key + '=' + obj.data[key]);
        }
        var postData = params.join('&');
        if (obj.type.toUpperCase() === 'POST') {
            xmlHttp.open(obj.type, obj.url, obj.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (obj.type.toUpperCase() === 'GET') {
            xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                obj.success(xmlHttp.responseText);
            } else {
                obj.error(xmlHttp.responseText);
            }
        };
    },
    //图片没加载出来时用一张图片代替
    aftLoadImg: function(obj, url, errorUrl, cb) {
        var oImg = new Image(),
            _this = this;
        oImg.src = url;
        oImg.onload = function() {
            obj.src = oImg.src;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
        oImg.onerror = function() {
            obj.src = errorUrl;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
    },
    //图片滚动懒加载
    //@className {string} 要遍历图片的类名
    //@num {number} 距离多少的时候开始加载 默认 0
    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html

    //window.onload = function() {
    //	loadImg('load-img',100);
    //	window.onscroll = function() {
    //		loadImg('load-img',100);
    //		}
    //}
    loadImg: function(className, num, errorUrl) {
        var _className = className || 'ec-load-img',
            _num = num || 0,
            _this = this,
            _errorUrl = errorUrl || null;
        var oImgLoad = document.getElementsByClassName(_className);
        for (var i = 0, len = oImgLoad.length; i < len; i++) {
            //如果图片已经滚动到指定的高度
            if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
                //记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                //设置过渡，当图片下来的时候有一个图片透明度变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
                if (oImgLoad[i].dataset) {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function(o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        settimer(function() {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                } else {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function(o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        settimer(function() {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                }
                (function(i) {
                    settimer(function() {
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 16)
                })(i);
            }
        }
    },

    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    istype: function(obj, type) {
        return Object.prototype.toString.call(obj).toLowerCase() === '[object ' + type.toLowerCase() + ']';
    },
    isArrayLike: function(arraylike) {
        if (o && // o不是null、undefined等
            typeof o === 'object' && // o是对象
            isFinite(o.length) && // o.length是有限数值
            o.length >= 0 && // o.length为非负值
            o.length === Math.floor(o.length) && // o.length是整数
            o.length < 4294967296) // o.length < 2^32
            return true;
        else
            return false;
    },

    //手机类型判断
    browserInfo: function(type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },
    //函数节流
    // var count=0;
    // function fn1(){
    //     count++;
    //     console.log(count)
    // }
    // //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
    // document.onmousemove=delayFn(fn1,100,200)
    delayFn: function(fn, delay, mustDelay) {
        var timer = null;
        var t_start;
        return function() {
            var context = this,
                args = arguments,
                t_cur = +new Date();
            //先清理上一次的调用触发（上一次调用触发事件不执行）
            cleartimer(timer);
            //如果不存触发时间，那么当前的时间就是触发时间
            if (!t_start) {
                t_start = t_cur;
            }
            //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
            if (t_cur - t_start >= mustDelay) {
                fn.apply(context, args);
                t_start = t_cur;
            }
            //否则延迟执行
            else {
                timer = settimer(function() {
                    fn.apply(context, args);
                }, delay);
            }
        };
    }
}