import { spawn } from 'child_process';

/**
 * Run a command and return a promise that resolves when the command exits
 * @param command - The command to run
 */
export function $(command: TemplateStringsArray) {
  // Transform the command into an array
  const string = command.join(' ');
  const array = string.split(' ');

  // Spawn the command
  const process = spawn(array[0], array.slice(1));

  // Return a promise that resolves when the command exits
  return new Promise((resolve) => {
    process.on('exit', (code) => {
      resolve(code);
    });
  });
}
