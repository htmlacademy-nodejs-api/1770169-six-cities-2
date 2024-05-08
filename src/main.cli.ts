#!/usr/bin/env node

import {readdirSync} from 'node:fs';

import chalk from 'chalk';

import CLIApplication from './cli/cli-application.js';
import {Command} from './cli/commands/command.interface.js';

async function importModules(directory: string) {
  const files = readdirSync(new URL(directory, import.meta.url))
    .filter((file) => file.endsWith('command.js'));

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  return Promise.all(files.map((file) => import(`${directory}/${file}`)));
}

function bootstrap(importedModules: Command[]): void {
  const cliAplication = new CLIApplication();
  cliAplication.registerCommands(importedModules);
  cliAplication.processComand(process.argv);
}

try {
  const importedModules: Command[] = [];
  const modules = await importModules('./cli/commands');
  modules.forEach((module) => importedModules.push(new module.default()));
  bootstrap(importedModules);
} catch (error) {
  if (!(error instanceof Error)) {
    throw error;
  }

  console.error(chalk.red(error.message));
}
