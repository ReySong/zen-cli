const inquirer = require("inquirer");
const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");
const validateProjectName = require("validate-npm-package-name");

async function create(projectName, options) {
    const cwd = options.cwd || process.cwd();
    const name = projectName === "." ? path.relative("../", cwd) : projectName; //  若 app-name 为 "." ，则解析成当前目录
    const appDir = path.resolve(cwd, projectName); //  新建项目的绝对路径
    const result = validateProjectName(name);
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`));
        result.errors &&
            result.errors.forEach(err => {
                console.error(chalk.red.dim("Error: " + err));
            });
        result.warnings &&
            result.warnings.forEach(warn => {
                console.error(chalk.red.dim("Warning: " + warn));
            });
        process.exit(1);
    }

    if (fs.existsSync(appDir)) {
        //  app 路径上已经存在文件
        if (options.force) {
            await fs.remove(appDir);
        } else {
            console.clear();
            if (projectName === ".") {
                const { ok } = await inquirer.prompt([{
                    name: "ok",
                    type: "confirm",
                    message: "Generate a project in current directory?"
                }]);
                if (!ok) {
                    return;
                }
            } else {

            }
        }
    }
}

module.exports = (...args) => {
    return create(...args).catch(err => {
        console.error(chalk.red(err));
        process.exit(1);
    });
};