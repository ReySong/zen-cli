#!/usr/bin/env node

const chalk = require("chalk");
const semver = require("semver");
const { Command } = require("commander");
const program = new Command();

const packageJson = require("./package.json");

console.log();
console.log(chalk.yellow("===== Z E N - C L I ====="));
console.log();

//  node版本强制退出
function checkNodeVersion(wantedVersion, id) {
    if (!semver.satisfies(process.version, wantedVersion)) {
        console.log(
            chalk.red(
                `You are using Node ${process.version}, but this version of ${id} requires Node ${wantedVersion}.\nPlease upgrade your Node version.\n`
            )
        );
        process.exit(1);
    } else {
        console.log(chalk.yellow(`You are using Node ${process.version}.\n`));
    }
}

checkNodeVersion(packageJson.engines.node, "zen-cli");

program
    .version(
        `${packageJson.version}\n`,
        "-v, --version",
        "output the current version"
    )
    .usage("<command> [options]");

program.on("command:*", function() {
    console.error(
        chalk.red(
            `Invalid command: ${program.args.join(" ")}\n` +
            `See zen ${program.args.join(" ")} ` +
            "--help for a list of available commands."
        )
    );
    process.exit(1);
});

program.on("--help", () => {
    console.log();
    console.log(
        `Run ${chalk.cyan(
			"zen <command> --help"
		)} for detailed usage of given command`
    );
    console.log();
});

// program.commands.forEach(c => c.on("--help", () => console.log()));
program.parse(process.argv); // 解析参数
if (!program.args.length) program.outputHelp();