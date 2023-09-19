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

        case 'cat':
            if (args.length === 0) {
                console.log('Usage: cat <file>');
            } else {
                const catChild = spawn('cat', args, { stdio: 'inherit' });
                catChild.on('close', () => rl.prompt())
                catChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'mkdir':
            if (args.length === 0) {
                console.log('Usage: mkdir <directory>');
            } else {
                const mkdirChild = spawn('mkdir', args, { stdio: 'inherit' });
                mkdirChild.on('close', () => rl.prompt());
                mkdirChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'rmdir':
            if (args.length === 0) {
                console.log('Usage: rmdir <directory>')
            } else {
                const rmdirChild = spawn('rmdir', args, { stdio: 'inherit' });
                rmdirChild.on('close', () => rl.prompt())
                rmdirChild.on('error', (error: Error) => {
                    console.log(`Errro: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'touch':
            if (args.length === 0) {
                console.log('Usage: touch <file>')
            } else {
                const touchChild = spawn('touch', args, { stdio: 'inherit' });
                touchChild.on('close', () => rl.prompt())
                touchChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'mv':
            if (args.length !== 2) {
                console.log('Usage: mv <source> <destination>');
            } else {
                const mvChild = spawn('mv', args, { stdio: 'inherit' });
                mvChild.on('close', () => rl.prompt());
                mvChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'cp':
            if (args.length !== 2) {
                console.log('Usage: cp <source> <destination>')
            } else {
                const cpChild = spawn('cp', args, { stdio: 'inherit' });
                cpChild.on('close', () => rl.prompt())
                cpChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }
            break;

        case 'rm':
            if (args.length === 0) {
                console.log('Usage: rm <file/direcotry>');
            } else {
                const rmChild = spawn('rm', args, { stdio: 'inherit' });
                rmChild.on('close', () => rl.prompt())
                rmChild.on('error', (error: Error) => {
                    console.log(`Error: ${error.message}`)
                    rl.prompt();
                })
            }

        case 'date':
            const dateChild = spawn('date', args, { stdio: 'inherit' });
            dateChild.on('close', () => rl.prompt());
            break;

        case 'clear':
            const clearChild = spawn('clear', args, { stdio: 'inherit' });
            clearChild.on('close', () => rl.prompt());
            break;

        default:
            console.log(`Command not found: ${cmd}`);
            rl.prompt()
            break;
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
    console.log('  cat <file>            - Display the content of a file');
    console.log('  mkdir <directory>     - Create a new directory');
    console.log('  rmdir <directory>     - remove an empty directory');
    console.log('  touch <file>          - Create an empty file');
    console.log('  date                  - Display the current date and time');
    console.log('  mv <src> <dest>       - move or rename file or direcotry');
    console.log('  cp <src> <dest>       - Copy file or directory');
    console.log('  rm <file/direcotry>   - Remove file or directory')
}