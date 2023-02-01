import { Command } from '@commander-js/extra-typings';

import { $ } from '../helpers';
import { spinner } from '../spinner';

export const prune = new Command('prune')
  .description('Prune docker containers, networks and volumes')
  .option('-a, --all', 'Remove volumes')
  .action(async (options) => {
    // Prune docker containers
    spinner.updateText('Pruning docker containers');
    await $`docker container prune -f`;
    spinner.success();

    // Prune docker networks
    spinner.updateText('Pruning docker networks');
    await $`docker network prune -f`;
    spinner.success();

    if (options.all) {
      // Prune docker volumes
      spinner.updateText('Pruning docker volumes');
      await $`docker volume prune -f`;
      spinner.success();
    }
  });
