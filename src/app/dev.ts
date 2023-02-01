import { Command } from '@commander-js/extra-typings';
import { spawn } from 'child_process';
import { readFile } from 'fs-extra';
import * as YAML from 'yaml';

import { StorageProvider, checkTarrasqueApp } from './common';

export const dev = new Command('dev')
  .description('Run Tarrasque App in development mode')
  .option('--db', 'Run the database service', true)
  .option('--storage-provider <storageProvider>', 'Set the storage provider to use', StorageProvider.Local)
  .action(async (options) => {
    // Check the current working directory is the root of Tarrasque App
    checkTarrasqueApp();

    // Database can only be true or false
    if (typeof options.db !== 'boolean') {
      throw new Error('Database service option can only be "true" or "false"');
    }

    // Storage provider can only be local or s3
    if (options.storageProvider !== StorageProvider.Local && options.storageProvider !== StorageProvider.S3) {
      throw new Error(`Storage provider can only be "${StorageProvider.Local}" or "${StorageProvider.S3}"`);
    }

    // Get all services from the docker-compose.yaml file
    const dockerComposeYaml = await readFile('./docker-compose.yaml');
    const composeJson = YAML.parse(dockerComposeYaml.toString());
    const services = Object.keys(composeJson.services);

    // Remove database if not needed
    if (!options.db) {
      services.splice(services.indexOf('postgres'), 1);
    }

    // Remove the storage provider that is not being used
    if (options.storageProvider === StorageProvider.Local) {
      services.splice(services.indexOf(`tusd-${StorageProvider.S3}`), 1);
    } else {
      services.splice(services.indexOf(`tusd-${StorageProvider.Local}`), 1);
    }

    // Build the command to run
    const command = `--env-file ./.env up --build --remove-orphans ${services.join(' ')}`;

    // Run the command
    spawn('docker-compose', command.split(' '), { cwd: process.cwd(), stdio: [0, 1, 2] });
  });
