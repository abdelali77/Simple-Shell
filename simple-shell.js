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
    if (command === 'exit') {
        rl.close();
    }
    else {
        var _a = command.split(' '), cmd = _a[0], args = _a.slice(1);
        var child = (0, child_process_1.spawn)(cmd, args, { stdio: 'inherit' });
        child.on('error', function (err) {
            console.error(err.message);
        });
        child.on('close', function (code) {
            rl.prompt();
        });
    }
}).on('close', function () {
    console.log('Bye ✌️');
    process.exit(0);
});
