import { Command } from '@commander-js/extra-typings';

import { $ } from '../helpers';
import { spinner } from '../spinner';
import { checkTarrasqueApp } from './common';

export const clean = new Command('clean')
  .description('Delete installed dependencies and build files')
  .option('-a, --all', 'Remove database and storage provider data')
  .action(async (options) => {
    // Check the current working directory is the root of Tarrasque App
    checkTarrasqueApp();

    // Remove dependencies
    spinner.updateText('Removing dependencies');
    await $`rm -rf node_modules`;
    spinner.success();

    // Remove build files from apps/ui
    spinner.updateText('Removing build files from apps/ui');
    await $`rm -rf apps/ui/.next`;
    spinner.success();

    // Remove build files from apps/api
    spinner.updateText('Removing build files from apps/api');
    await $`rm -rf apps/api/dist`;
    spinner.success();

    if (options.all) {
      // Remove database data
      spinner.updateText('Removing database files');
      await $`rm -rf data/postgres`;
      spinner.success();

      // Remove temporary files
      spinner.updateText('Removing temporary files');
      await $`rm -rf data/tmp`;
      spinner.success();

      // Remove uploaded files
      spinner.updateText('Removing uploaded files');
      await $`rm -rf data/uploads`;
      spinner.success();
    }
  });
