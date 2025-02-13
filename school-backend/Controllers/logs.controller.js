const Response = require('../Helpers/response.helper');
const Logger = require('../Helpers/logger');
const fs = require('fs'); // Use normal fs for sync functions
const fsp = require('fs').promises; // Use fs.promises for async operations
const path = require('path');

const controllerName = 'logs.controller.js';

const getLatestLogFile = async () => {
    const logsDir = path.join(__dirname, '../logs');

    if (!fs.existsSync(logsDir)) return null;

    try {
        const files = await fsp.readdir(logsDir);
        const logFiles = files
            .filter((file) => file.startsWith('common.log'))
            .map((file) => ({
                filePath: path.join(logsDir, file),
                mtime: fs.statSync(path.join(logsDir, file)).mtime // Sync is okay here
            }))
            .sort((a, b) => b.mtime - a.mtime) // Sort by modified time (latest first)
            .map((file) => file.filePath);

        return logFiles;
    } catch (error) {
        Logger.error(`Error reading log directory: ${error.message}`);
        return null;
    }
};

const getLogFileDetail = async (req, res) => {
    try {
        try {
            const data = await fsp.readFile(req.query.path, 'utf8');
            const logs = data
                .split('},\n')
                .map((log) => {
                    try {
                        return JSON.parse(log.trim() + '}');
                    } catch (error) {
                        return null;
                    }
                })
                .filter(Boolean);
            return Response.success(res, {
                data: { date: path.basename(req.query.path), logs: logs.reverse() },
                message: 'Logs fetched successfully.'
            });
        } catch (error) {
            Logger.error(`Error reading log file: ${error.message} at getLogFileDetail function ${controllerName}`);
            return { [path.basename(logFile)]: `Error reading log file: ${error.message}` };
        }
    } catch (error) {
        Logger.error(`${error.message} at getLogFileDetail function ${controllerName}`);
        return Response.error(res, { message: error.message });
    }
};

const getAllLogsFileNames = async (req, res) => {
    try {
        const logFiles = await getLatestLogFile();

        const response = [];

        for (const logFileName of logFiles) {
            response.push({ path: logFileName, file_name: path.basename(logFileName) });
        }
        return Response.success(res, {
            data: response,
            message: 'Logs files found'
        });
    } catch (error) {
        Logger.error(`${error.message} at getAllLogsFileNames function ${controllerName}`);
        return Response.error(res, {
            data: {},
            message: 'Error occured'
        });
    }
};

module.exports = { getLogFileDetail, getAllLogsFileNames };
