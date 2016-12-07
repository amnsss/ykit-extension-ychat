var path = require("path");
var fs = require("fs");

var YKIT_EXTENSION_NAME = 'ychat';
var YKIT_EXTENSION_PATH = path.resolve(__dirname, '../', 'index.js');

var get_user_home = function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};
var dirpath = path.join(get_user_home(), '.ykitrc');

try {
    if (fs.existsSync(dirpath, { flag: 'r' })) {
        var ykitConfig = JSON.parse(fs.readFileSync(dirpath));

        if (!ykitConfig) {
            ykitConfig = {};
        }

        if (!ykitConfig.commands) {
            ykitConfig.commands = [];
        }

        if (!ykitConfig.length) {
            ykitConfig.commands = [{
                'name': YKIT_EXTENSION_NAME,
                'path': YKIT_EXTENSION_PATH
            }];
        } else {
            var isExist = false;
            for (var i = 0, len = ykitConfig.commands.length; i < len; i++) {
                if (ykitConfig.commands[i].name === YKIT_EXTENSION_NAME) {
                    isExist = true;
                    ykitConfig.commands[i].path = YKIT_EXTENSION_PATH;
                }
            }

            if (!isExist) {
                ykitConfig.commands.push({
                    'name': YKIT_EXTENSION_NAME,
                    'path': YKIT_EXTENSION_PATH
                });
            }
        }

        fs.writeFileSync(dirpath, JSON.stringify(ykitConfig, null, 4), {
            flag: 'w'
        });
    } else {
        fs.writeFileSync(dirpath, JSON.stringify({
            // "registry": "l-registry.fe.dev.cn6.qunar.com:3300",
            "commands": [{
                'name': YKIT_EXTENSION_NAME,
                'path': YKIT_EXTENSION_PATH
            }],
            "configs": []
        }, null, 4), 'UTF-8');
    }

} catch (e) {
    console.error('Reset .ykitrc failed: ', e);
    console.error('Please try again with: --unsafe-perm');
}
