"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var child_process_1 = require("child_process");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MyShell> ',
});
rl.setPrompt('\x1b[33mMyShell> \x1b[0m');
rl.prompt();
rl.on('line', function (input) {
    var command = input.trim();
    var _a = command.split(' '), cmd = _a[0], args = _a.slice(1);
    switch (cmd) {
        case 'exit':
            rl.close();
            break;
        case 'help':
            printHelp();
            rl.prompt();
            break;
        case 'ls':
            var lsChild = (0, child_process_1.spawn)('ls', args, { stdio: 'inherit' });
            lsChild.on('close', function () { return rl.prompt(); });
            break;
        case 'echo':
            var echoText = args.join(' ');
            console.log(echoText);
            rl.prompt();
            break;
        default:
            console.log("Command not found: ".concat(cmd));
            rl.prompt();
            break;
    }
}).on('close', function () {
    console.log('Bye ✌️');
    process.exit(0);
});
function printHelp() {
    console.log('Available commands:');
    console.log('  exit                 - Exit the shell');
    console.log('  help                 - Display this help message');
    console.log('  ls [options] [path]  - List files and directories');
    console.log('  echo [text]          - Print text to the console');
}
