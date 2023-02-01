#!/usr/bin/env node
import { Command } from '@commander-js/extra-typings';

import { version } from '../package.json';
import { app } from './app';
import { selfUpdate } from './self-update';
import { spinner } from './spinner';

const program = new Command();
program.description('Tarrasque CLI');
program.version(version, '-v, --version', 'Output the current version');
program.addCommand(app);
program.addCommand(selfUpdate);

async function main() {
  await program.parseAsync();
}
main();

process.on('unhandledRejection', function (err: Error) {
  spinner.updateText(err.message);
  spinner.error();
  spinner.stop();
  process.exit(1);
});
