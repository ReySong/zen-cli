#!/usr/bin/env node

const chalk = require("chalk");
const semver = require("semver");
const { Command } = require("commander");
const program = new Command();

const packageJson = require("./package.json");
const minimist = require("minimist");

//  node版本强制退出
function checkNodeVersion(wantedVersion, id) {
    if (!semver.satisfies(process.version, wantedVersion)) {
        console.log(
            chalk.red(
                `You are using Node ${process.version}, but this version of ${id} requires Node ${wantedVersion}.\nPlease upgrade your Node version.\n`
            )
        );
        process.exit(1);
    }
}

checkNodeVersion(packageJson.engines.node, "zen-cli");

program
    .command("create <app-name>")
    .description("create a new project powered by zen-cli")
    .option("-f, --force", "Overwrite target directory if it exists")
    .action((name, options) => {
        if (minimist(process.argv.slice(3))._.length > 1) {
            console.log(
                chalk.yellow(
                    "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored."
                )
            );
        }
        require("./script/create")(name, options);
    });

program.addHelpText(
    "before",
    `\n${chalk.yellow("===== Z E N - C L I =====")}\n\n${chalk.yellow(
		"You are using Node " + process.version + ".\n"
	)}`
);

program
    .version(
        `v${packageJson.version}\n`,
        "-v, --version",
        "output the current version"
    )
    .usage("<command> [options]");

program.on("command:*", function() {
    program.outputHelp();
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
		)} for detailed usage of given command.`
    );
    console.log();
});
program.commands.forEach(c => c.on("--help", () => console.log())); //  换行

program.parse(process.argv); // 解析参数