#!/usr/bin/env node
import { generateGraphQLModule } from './generateModule';
import { migrateModule, setupPrisma } from './setupPrisma';
import yargs from 'yargs';

const argv:any = yargs
  .command('generate <module>', 'Generate a GraphQL module', (yargs) => {
    yargs.positional('module', {
      describe: 'The name of the module to generate',
      type: 'string'
    });
  })
  .option('dir', {
    alias: 'd',
    type: 'string',
    description: 'The directory to generate the modules in',
    default: 'src'
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'The directory name for the modules in',
    default: 'modules'
  })
  .argv;

if (argv._[0] === 'generate' && typeof argv.module === 'string') {

    const url=argv.dir+"/"+argv.name;
    setupPrisma(argv.dir); // Step to setup Prisma before generating modules
    generateGraphQLModule(argv.module, url);
    migrateModule(argv.module)
}
