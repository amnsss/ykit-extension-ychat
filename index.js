var fs = require('fs');
var path = require('path');
var ychat = require('./ychat');

exports.usage = 'Ychat 小程序项目构建工具';

exports.set_options = function(optimist){
    var cmd = optimist.argv._[1];
    if (cmd && fs.existsSync(path.join(__dirname, 'commands', cmd + '.js'))) {
        var command = require(path.join(__dirname, 'commands', cmd + '.js')),
            cmdOptions = command.options || {};

        for (var key in cmdOptions) {
            var kv = key.split(':'),
                long = kv[0],
                short = kv[1];
            if (short) {
                optimist.alias(short, long);
            }
            optimist.describe(short || long, cmdOptions[key]);
        }
    }
    return optimist;
};

exports.run = function(options){
    var cmd = options._[1];
    cmd ? ychat.run(cmd) : ychat.help();
};
