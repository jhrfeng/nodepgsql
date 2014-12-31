var fs = require('fs');
var http = require('http');
var filePath = 'D:\\WORK_new\\';
var logPath = 'D:\\chinese.log';

var map = {};
var num = 0;

var dictionary = (function () {
    var map = {};
    return {
        logPath: 'D:\\chinese.log',
        set: function (key, val) {
            map[key] = val || '';
        },
        get: function (key) {
            return map[key]||'';
        },
        save2File: function () {
            fs.writeFile(this.logPath, JSON.stringify(map). (/","/g,'",\r\n"'),{encoding:'utf8',flag:'w'}, function (err) {
                if (err) throw err;
            }); 
        },
        loadFile: function (callback) {
            fs.readFile(this.logPath, {encoding:'utf8'},function (err, data) {
                map = JSON.parse(data);
                callback();
            })
        },
        translateByGoogle: function (callback) {
            var index = 0;
            for (var key in map) {
                if (map[key] == '') {
                    index++;
                    (function (key) {
                        http.get("http://translate.google.cn/translate_a/t?client=t&hl=zh-CN&sl=zh-CN&tl=en&ie=UTF-8&oe=UTF-8&oc=2&otf=1&ssel=3&tsel=6&sc=2&q="+key, function(res) {
                            res.setEncoding('utf8');
                            var body = "";
                            res.on('data', function (chunk) {
                                body+=chunk;    
                            }).on('end', function (){ 
                                var obj = eval('('+body+')');
                                map[key] = obj[0][0][0];
                                index--;
                                if (index == 0) {
                                    callback();
                                }
                            });
                        }).on('error', function(e) {
                            console.log('http error');
                            index--;
                            if (index == 0) {
                                callback();
                            }
                            console.log("Got error: " + e.message);
                        });
                    })(key);
                }
            }
        }
    }
})();