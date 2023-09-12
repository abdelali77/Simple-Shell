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

    if (command === 'exit') {
        rl.close();
    } else {
        const [cmd, ...args] = command.split(' ')
        const child = spawn(cmd, args, { stdio: 'inherit' })

        child.on('error', (err) => {
            console.error(err.message)
        })

        child.on('close', (code) => {
            rl.prompt();
        })
    }
}).on('close', () => {
    console.log('Bye ✌️')
    process.exit(0);
})