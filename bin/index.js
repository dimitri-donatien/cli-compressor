#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import { compressCommand } from '../src/commands/compress.js';

const program = new Command();

console.log(chalk.green(figlet.textSync('CLI Compressor')));

program
    .version('1.0.0')
    .description('CLI pour compresser les images');

program
    .command('compress')
    .description('Compresser les images')
    .option('-i, --input <input>', 'Dossier source des images')
    .option('-o, --output <output>', 'Dossier de destination des images compressées')
    .option('-q, --quality <quality>', 'Qualité de l\'image compressée (1-100)', (val) => parseInt(val, 10))
    .option('-r, --resolution <resolution>', 'Résolution de sortie pour les images (ex: 800x600)')
    .option('-s, --size <size>', 'Taille maximale des fichiers de sortie en Ko (ex: 500)', (val) => parseInt(val, 10))
    .action(compressCommand);

program.parse(process.argv);