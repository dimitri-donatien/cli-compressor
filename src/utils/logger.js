import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const logFilePath = path.join(process.cwd(), 'compressor.log');

const logToFile = (message) => {
    fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
};

export const logError = (message, error) => {
    const errorMessage = error ? `${message} ${error}` : message;
    console.error(chalk.red(errorMessage));
    logToFile(`ERROR: ${errorMessage}`);
};

export const logSuccess = (message) => {
    console.log(chalk.green(message));
    logToFile(`SUCCESS: ${message}`);
};

export const logInfo = (message) => {
    console.log(chalk.blue(message));
    logToFile(`INFO: ${message}`);
};
