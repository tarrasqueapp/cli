import { Command } from '@commander-js/extra-typings';
import { spawn } from 'child_process';

import { spinner } from './spinner';

export const selfUpdate = new Command('self-update')
  .description('Update Tarrasque CLI to the latest version')
  .action(async () => {
    // Start spinner
    spinner.updateText('Updating Tarrasque CLI');

    // Install Tarrasque CLI
    const command = spawn('npm', ['install', '-g', '@tarrasque/cli']);

    // Set spinner status to success when process exits successfully
    command.stdout.on('data', () => {
      spinner.success('Tarrasque CLI updated successfully.');
    });

    // Set spinner status to error when process exits with error
    command.stderr.on('data', (data) => {
      spinner.error('Failed to update Tarrasque CLI.');
      console.log('');
      process.stderr.write(data.toString());
    });
  });
