import * as readline from 'readline';
import { spawn } from 'child_process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MyShell> ',
})

rl.setPrompt('\x1b[33mMyShell> \x1b[0m');
rl.prompt();

rl.on('line', (input) => {
    const command = input.trim();
    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
        case 'exit':
            rl.close();
            break
        case 'help':
            printHelp();
            rl.prompt();
            break
        case 'ls':
            const lsChild = spawn('ls', args, { stdio: 'inherit' });
            lsChild.on('close', () => rl.prompt())
            break
        case 'echo':
            const echoText = args.join(' ')
            console.log(echoText)
            rl.prompt()
            break
        case 'pwd':
            const pwdChild = spawn('pwd', args, { stdio: 'inherit' });
            pwdChild.on('close', () => rl.prompt())
            break;
        case 'cd':
            if (args.length === 0) {
                console.log('Usage: cd <directory>')
            } else {
                try {
                    process.chdir(args[0])
                    console.log(`Current directory: ${process.cwd()}`)
                } catch (err:any) {
                    console.log(`Error: ${err.message}`)
                }
            }
            rl.prompt()
            break;
        default:
            console.log(`Command not found: ${cmd}`);
            rl.prompt()
            break
    }
}).on('close', () => {
    console.log('Bye ✌️')
    process.exit(0)
})

function printHelp() {
    console.log('Available commands:')
    console.log('  exit                  - Exit the shell');
    console.log('  help                  - Display this help message');
    console.log('  ls [options] [path]   - List files and directories');
    console.log('  echo [text]           - Print text to the console');
    console.log('  pwd                   - Print current directory');
    console.log('  cd <directory>        - Change the current workig directory');
}