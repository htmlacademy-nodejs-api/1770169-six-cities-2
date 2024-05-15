#!/usr/bin/env node

import {readdirSync} from 'node:fs';

import chalk from 'chalk';

import {CLIApplication} from './cli/cli-application.js';
import {Command} from './cli/commands/command.interface.js';
import {FILE_END_SUFFIXES, MODULES_PATH} from './shared/constants/index.js';
import {getErrorMessage} from './shared/helpers/index.js';

async function importModules(directory: string) {
  const files = readdirSync(new URL(directory, import.meta.url))
    .filter((file) => file.endsWith(FILE_END_SUFFIXES));

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  return Promise.all(files.map((file) => import(`${directory}/${file}`)));
}

function bootstrap(importedModules: Command[]): void {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands(importedModules);
  cliApplication.processCommand(process.argv);
}

try {
  const importedModules: Command[] = [];
  const modules = await importModules(MODULES_PATH);
  modules.forEach((module) => importedModules.push(new module.default()));
  bootstrap(importedModules);
} catch (error) {
  console.error(chalk.red(getErrorMessage(error)));
}
