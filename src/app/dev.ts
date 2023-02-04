import { Command } from '@commander-js/extra-typings';
import { spawn } from 'child_process';
import { readFile } from 'fs-extra';
import * as YAML from 'yaml';

import { StorageProvider, checkTarrasqueApp } from './common';

/**
 * Parse a boolean value from a string
 * @param value - The value to parse
 * @returns The parsed value
 */
function parseBoolean(value: string) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    throw new Error('Database service option can only be "true" or "false"');
  }
}

/**
 * Parse a storage provider value from a string
 * @param value - The value to parse
 * @returns The parsed value
 */
function parseStorageProvider(value: string) {
  if (value === StorageProvider.Local) {
    return StorageProvider.Local;
  } else if (value === StorageProvider.S3) {
    return StorageProvider.S3;
  } else {
    throw new Error(`Storage provider can only be "${StorageProvider.Local}" or "${StorageProvider.S3}"`);
  }
}

export const dev = new Command('dev')
  .description('Run Tarrasque App in development mode')
  .option('--db [value]', 'Run the database service', parseBoolean, true)
  .option(
    '--storage-provider <storageProvider>',
    'Set the storage provider to use',
    parseStorageProvider,
    StorageProvider.Local,
  )
  .action(async (options) => {
    // Check the current working directory is the root of Tarrasque App
    checkTarrasqueApp();

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
