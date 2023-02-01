/**
 * Check the current working directory is Tarrasque App.
 */
export function checkTarrasqueApp() {
  const cwd = process.cwd();
  const packageJson = require(`${cwd}/package.json`);
  if (packageJson?.name !== 'tarrasqueapp') {
    throw new Error('This command must be run at the root of Tarrasque App.');
  }
}

// Storage provider enum for the dev command
export enum StorageProvider {
  Local = 'local',
  S3 = 's3',
}
