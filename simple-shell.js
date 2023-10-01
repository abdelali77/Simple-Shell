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
        case 'pwd':
            var pwdChild = (0, child_process_1.spawn)('pwd', args, { stdio: 'inherit' });
            pwdChild.on('close', function () { return rl.prompt(); });
            break;
        case 'cd':
            if (args.length === 0) {
                console.log('Usage: cd <directory>');
            }
            else {
                try {
                    process.chdir(args[0]);
                    console.log("Current directory: ".concat(process.cwd()));
                }
                catch (err) {
                    console.log("Error: ".concat(err.message));
                }
            }
            rl.prompt();
            break;
        case 'cat':
            if (args.length === 0) {
                console.log('Usage: cat <file>');
            }
            else {
                var catChild = (0, child_process_1.spawn)('cat', args, { stdio: 'inherit' });
                catChild.on('close', function () { return rl.prompt(); });
                catChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'mkdir':
            if (args.length === 0) {
                console.log('Usage: mkdir <directory>');
            }
            else {
                var mkdirChild = (0, child_process_1.spawn)('mkdir', args, { stdio: 'inherit' });
                mkdirChild.on('close', function () { return rl.prompt(); });
                mkdirChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'rmdir':
            if (args.length === 0) {
                console.log('Usage: rmdir <directory>');
            }
            else {
                var rmdirChild = (0, child_process_1.spawn)('rmdir', args, { stdio: 'inherit' });
                rmdirChild.on('close', function () { return rl.prompt(); });
                rmdirChild.on('error', function (error) {
                    console.log("Errro: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'touch':
            if (args.length === 0) {
                console.log('Usage: touch <file>');
            }
            else {
                var touchChild = (0, child_process_1.spawn)('touch', args, { stdio: 'inherit' });
                touchChild.on('close', function () { return rl.prompt(); });
                touchChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'mv':
            if (args.length !== 2) {
                console.log('Usage: mv <source> <destination>');
            }
            else {
                var mvChild = (0, child_process_1.spawn)('mv', args, { stdio: 'inherit' });
                mvChild.on('close', function () { return rl.prompt(); });
                mvChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'cp':
            if (args.length !== 2) {
                console.log('Usage: cp <source> <destination>');
            }
            else {
                var cpChild = (0, child_process_1.spawn)('cp', args, { stdio: 'inherit' });
                cpChild.on('close', function () { return rl.prompt(); });
                cpChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'rm':
            if (args.length === 0) {
                console.log('Usage: rm <file/direcotry>');
            }
            else {
                var rmChild = (0, child_process_1.spawn)('rm', args, { stdio: 'inherit' });
                rmChild.on('close', function () { return rl.prompt(); });
                rmChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
        case 'find':
            if (args.length !== 1) {
                console.log('Usage: find <directory>');
            }
            else {
                var findChild = (0, child_process_1.spawn)('find', args, { stdio: 'inherit' });
                findChild.on('close', function () { return rl.prompt(); });
                findChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'grep':
            if (args.length < 2) {
                console.log('Usage: grep <pattern> <file>');
            }
            else {
                var grepChild = (0, child_process_1.spawn)('grep', args, { stdio: 'inherit' });
                grepChild.on('close', function () { return rl.prompt(); });
                grepChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'wc':
            if (args.length !== 1) {
                console.log('Usage: wc <file>');
            }
            else {
                var wcChild = (0, child_process_1.spawn)('wc', args, { stdio: 'inherit' });
                wcChild.on('close', function () { return rl.prompt(); });
                wcChild.on('error', function (error) {
                    console.log("Error: ".concat(error.message));
                    rl.prompt();
                });
            }
            break;
        case 'date':
            var dateChild = (0, child_process_1.spawn)('date', args, { stdio: 'inherit' });
            dateChild.on('close', function () { return rl.prompt(); });
            break;
        case 'clear':
            var clearChild = (0, child_process_1.spawn)('clear', args, { stdio: 'inherit' });
            clearChild.on('close', function () { return rl.prompt(); });
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
    console.log('  exit                  - Exit the shell');
    console.log('  help                  - Display this help message');
    console.log('  ls [options] [path]   - List files and directories');
    console.log('  echo [text]           - Print text to the console');
    console.log('  pwd                   - Print current directory');
    console.log('  cd <directory>        - Change the current workig directory');
    console.log('  cat <file>            - Display the content of a file');
    console.log('  mkdir <directory>     - Create a new directory');
    console.log('  rmdir <directory>     - remove an empty directory');
    console.log('  touch <file>          - Create an empty file');
    console.log('  date                  - Display the current date and time');
    console.log('  mv <src> <dest>       - move or rename file or direcotry');
    console.log('  cp <src> <dest>       - Copy file or directory');
    console.log('  rm <file/direcotry>   - Remove file or directory');
    console.log('  find <direcotry>      - Search for files and directories');
    console.log('  grep <pattern> <file> - Search for text patterns in files');
    console.log('  wc <file>             - Count lines, words, and characters in a file');
    console.log('  clear or <CTRL + L>   - Clear the terminal');
}
