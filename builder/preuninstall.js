var path = require("path");
var fs = require("fs");

var YKIT_EXTENSION_NAME = 'ychat';

var get_user_home = function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};
var dirpath = path.join(get_user_home(), '.ykitrc');

try {
    if (fs.existsSync(dirpath, { flag: 'r' })) {
        var ykitConfig = JSON.parse(fs.readFileSync(dirpath));

        if (ykitConfig && ykitConfig.commands && ykitConfig.commands.length) {
            var isExist = false;
            for (var i = 0, len = ykitConfig.commands.length; i < len; i++) {
                if (ykitConfig.commands[i].name === YKIT_EXTENSION_NAME) {
                    isExist = true;
                    ykitConfig.commands.splice(i, 1);
                }
            }

            if (isExist) {
                fs.writeFileSync(dirpath, JSON.stringify(ykitConfig, null, 4), {
                    flag: 'w'
                });
            }
        }
    }
} catch (e) {
    console.error('Reset .ykitrc failed: ', e);
    console.error('Please try again with: --unsafe-perm');
}
