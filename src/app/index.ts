import { Command } from '@commander-js/extra-typings';

import { clean } from './clean';
import { dev } from './dev';
import { prune } from './prune';

export const app = new Command('app')
  .description('Manage your Tarrasque App instance')
  .addCommand(clean)
  .addCommand(dev)
  .addCommand(prune);
