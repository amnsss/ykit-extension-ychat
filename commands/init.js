var execSync = require('child_process').execSync;
var replaceStream = require('replacestream');
var inquirer = require('inquirer');
var copydir = require('copy-dir');
const download = require('@qnpm/download-gitlab-repo');

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

module.exports = {
    usage: '构建 Yo 项目',
    options: {
        'hy2:hy2': '构建基于 Hy2.0 的项目'
    },
    process: function (options, callback) {
      console.log('下载ychat...'.green);
      download('mfe/ychat', options.cwd+'/ychat', () => {
          console.log('下载完毕'.green);

          // let pkgFile = path.join(rootDir, 'package.json');
          // let pkg = utils.readJSON(pkgFile);
          // pkg.name = name;
          // utils.writeJson(pkgFile, pkg);

          // console.log('安装npm依赖'.green);
          // exec((which('yarn') ? 'yarn install' : 'npm install --registry=http://registry.npm.corp.qunar.com/'), {
          // cwd: rootDir
          // }, () => {
          // console.log('构建项目...'.green);
          // exec('labrador build', {
          //     cwd: rootDir
          // });
          // });
      });
        // var cwd = options.cwd;
        // var projectName = options._[1];
        // var defaultName = '';
        // var packageJsonPath = sysPath.join(cwd, './package.json');
        // var templatePath = options.hy2 ? sysPath.resolve(__dirname, '../template/hy') : sysPath.resolve(__dirname, '../template/default');
        //
        // if (fileExists(packageJsonPath)) {
        //     defaultName = JSON.parse(fs.readFileSync(packageJsonPath)).name;
        // } else {
        //     defaultName = sysPath.basename(cwd);
        // }
        //
        // var questions = [{
        //     type: 'input',
        //     name: 'name',
        //     message: 'project name(' + defaultName + '):'
        // }];
        //
        // inquirer.prompt(questions).then(function (answers) {
        //     answers.name = answers.name || defaultName;
        //
        //     createPackageJson().then(function () {
        //         createConfigFile().then(function () {
        //             copyTemplate();
        //             installDependencies();
        //             buildLib();
        //         });
        //     });
        //
        //     function createPackageJson() {
        //         return new Promise(function (resolve, reject) {
        //
        //             if (!fileExists(packageJsonPath)) {
        //                 try {
        //                     var stream;
        //                     stream = fs.createReadStream(sysPath.resolve(templatePath, 'package.json'))
        //                         .pipe(replaceStream('#_name', answers.name))
        //                         .pipe(fs.createWriteStream(sysPath.resolve(cwd, 'package.json')));
        //
        //                     stream.on('finish', function () {
        //                         log('Successfully created ' + 'package.json' + ' file in ' + cwd);
        //                         resolve();
        //                     });
        //                 } catch (e) {
        //                     log('Something wrong when created package.json: ' + e);
        //                     reject();
        //                 }
        //             } else {
        //                 resolve();
        //             }
        //         });
        //     }
        //
        //     function createConfigFile() {
        //         return new Promise(function (resolve, reject) {
        //             var configFileName = 'ykit.yo.js';
        //             var stream;
        //
        //             try {
        //                 if (!fileExists('./' + configFileName)) {
        //                     stream = fs.createReadStream(sysPath.resolve(templatePath, configFileName))
        //                         .pipe(replaceStream('#_name', answers.name))
        //                         .pipe(fs.createWriteStream(sysPath.resolve(cwd, configFileName)));
        //
        //                     stream.on('finish', function () {
        //                         log('Successfully created ' + configFileName + ' file in ' + cwd);
        //                         resolve();
        //                     });
        //                 }
        //             } catch (e) {
        //                 log('Something wrong when created ' + configFileName + ': ' + e);
        //                 reject();
        //             }
        //         });
        //     }
        //
        //     function copyTemplate() {
        //         try {
        //             copydir.sync(sysPath.resolve(templatePath, 'src'), sysPath.resolve(cwd, 'src'));
        //
        //             var _html = fs.readFileSync(sysPath.resolve(cwd, 'src/html/index.html'), 'utf-8').replace(/#_name/g, answers.name);
        //             fs.writeFileSync(sysPath.resolve(cwd, 'src/html/index.html'), _html, 'utf-8');
        //
        //             log('Successfully created src in ' + cwd);
        //         } catch (e) {
        //             log('Something wrong when created src: ' + e);
        //         }
        //     }
        //
        //     function installDependencies() {
        //         var dependencies;
        //         var _cmd = options.hy2 ? 'npm i --save --registry http://registry.npm.corp.qunar.com/ ' : 'npm i --save --registry=https://registry.npm.taobao.org ';
        //
        //         if (options.hy2) {
        //             dependencies = ['react', 'react-dom', 'babel-polyfill', 'yo3', 'yo-router', 'ykit-config-yo', '@qnpm/hysdk'];
        //         } else {
        //             dependencies = ['react', 'react-dom', 'babel-polyfill', 'yo3', 'yo-router', 'ykit-config-yo'];
        //         }
        //
        //         for (var i = 0, len = dependencies.length; i < len; i++) {
        //             log('Installing ' + dependencies[i] + '...');
        //             execSync(_cmd + dependencies[i]);
        //         }
        //
        //         log('Successfully install dependencies.');
        //     }
        //
        //     function buildLib() {
        //         execSync('ykit dll');
        //         log('Successfully build lib.js.');
        //     }
        // });
    }
};
