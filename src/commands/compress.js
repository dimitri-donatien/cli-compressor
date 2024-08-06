import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { logError, logSuccess, logInfo } from '../utils/logger.js';

const compressImage = async (inputPath, outputPath, quality, resolution, maxSize) => {
    try {
        let image = sharp(inputPath);

        if (resolution) {
            const [width, height] = resolution.split('x').map(Number);
            image = image.resize(width, height);
        }

        let { format } = await image.metadata();
        let outputBuffer;
        let currentQuality = parseInt(quality, 10); // Convertir la qualité en entier

        const compressWithQuality = async (quality) => {
            if (format === 'jpeg' || format === 'jpg') {
                outputBuffer = await image.jpeg({ quality }).toBuffer();
            } else if (format === 'png') {
                outputBuffer = await image.png({ quality }).toBuffer();
            } else if (format === 'gif') {
                outputBuffer = await image.gif().toBuffer();
            } else {
                throw new Error(`Format de fichier non supporté: ${format}`);
            }
            return outputBuffer;
        };

        // Initial compression with the provided quality
        outputBuffer = await compressWithQuality(currentQuality);

        // Adjust quality dynamically if maxSize is specified
        if (maxSize && outputBuffer.length / 1024 > maxSize) {
            while (outputBuffer.length / 1024 > maxSize && currentQuality > 10) {
                currentQuality -= 10;
                outputBuffer = await compressWithQuality(currentQuality);
            }
        }

        await sharp(outputBuffer).toFile(outputPath);
        logSuccess(`Image compressée: ${outputPath} à la qualité ${currentQuality}`);
    } catch (error) {
        logError(`Erreur lors de la compression de l'image ${inputPath}:`, error);
    }
};

const processDirectory = async (inputDir, outputDir, quality, resolution, maxSize) => {
    const spinner = ora('Compression des images...').start();

    try {
        const files = fs.readdirSync(inputDir);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        for (const file of files) {
            const inputFilePath = path.join(inputDir, file);
            const outputFilePath = path.join(outputDir, file);

            if (fs.lstatSync(inputFilePath).isFile() && /\.(jpe?g|png|gif)$/i.test(file)) {
                await compressImage(inputFilePath, outputFilePath, quality, resolution, maxSize);
            }
        }

        spinner.succeed('Compression terminée avec succès.');
        logInfo('Compression terminée avec succès.');
    } catch (error) {
        spinner.fail('Erreur lors de la compression des images.');
        logError('Erreur lors de la compression des images.', error);
    }
};

export async function compressCommand(cmdObj) {
    const { input, output, quality, resolution, size } = cmdObj;

    if (!input) {
        logError('L\'option --input est requise');
        process.exit(1);
    }

    let actualOutput = output;

    if (fs.lstatSync(input).isDirectory()) {
        actualOutput = path.join(input, 'compressed-images');
    } else if (!output) {
        logError('L\'option --output est requise pour les fichiers individuels');
        process.exit(1);
    }

    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Vous allez compresser les images du dossier ${chalk.yellow(input)} et les sauvegarder dans ${chalk.yellow(actualOutput)}. Continuer?`,
            default: true
        }
    ]);

    if (answers.confirm) {
        await processDirectory(input, actualOutput, quality, resolution, size);
    } else {
        logInfo('Opération annulée.');
    }
};
