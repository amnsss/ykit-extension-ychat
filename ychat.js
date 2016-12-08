var fs = require('fs');
var path = require('path');

function fixEmpty(str, limit) {
    var i, n = limit - str.length;
    for (i = 0; i < n; i++) {
        str += ' ';
    }
    return str;
}

module.exports = {
    name: 'Ychat Builder',
    version: '',
    loadConfig: function () {
        var config = {};
        try {
            config = JSON.parse(fs.readFileSync(utils.path.join(__dirname, 'package.json'), 'UTF-8'));
        } catch (e) { }

        if (config && config.version) {
            this.version = config.version;
        }
        this.loadConfig = function () { };
    },
    title: function () {
        this.loadConfig();
        console.log();
        console.log('==================== ' + this.name + ' ' + this.version + ' ====================');
        console.log();
    },
    help: function () {
        var commandBasePath = path.join(__dirname, 'commands'),
            cmd;

        this.title();
        (fs.readdirSync(commandBasePath) || []).forEach(function (name) {
            cmd = require(path.join(commandBasePath, name));
            if (cmd) {
                console.log(' ', fixEmpty(name.split('.')[0], 15), '#', cmd.usage || '');
            }
        });

        console.log();
        console.log(' 如果需要帮助, 请使用 ykit ychat {命令名} --help ');
        console.log();
    },
    run: function (cmd) {
        var _commandPath = path.join(__dirname, 'commands', cmd + '.js');
        if (fs.existsSync(_commandPath)) {
            var command = require(_commandPath),
                cmdOptions = command.options || {},
                argv = optimist.argv,
                options = {};

            if (command) {
                if (argv.help || argv.h) {
                    this.title();
                    console.log(' 命令:', cmd);
                    console.log(' 功能:', command.usage || '');
                    console.log(' 选项:');
                    for (var key in cmdOptions) {
                        var kv = key.split(':'),
                            param = '--' + kv[0],
                            short = kv[1];
                        if (short) {
                            param += ', -' + short;
                        }
                        console.log('    ', fixEmpty(param, 15), '#', cmdOptions[key] || '');
                    }
                    console.log('    ', fixEmpty('--help, -h', 15), '#', '查看帮助');
                } else {
                    for (var key in cmdOptions) {
                        var kv = key.split(':'),
                            param = kv[0],
                            short = kv[1];

                        if (argv[param]) {
                            options[param] = argv[param];
                        } else if (short && argv[short]) {
                            options[param] = argv[short];
                        }
                    }
                    options.cwd = process.cwd();
                    options._ = argv._;

                    command.process(options);
                }
            }
        } else {
            console.error('没有找到 ' + cmd + ' 命令.');
        }
    }
};
