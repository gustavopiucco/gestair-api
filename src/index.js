const path = require('path');
const app = require('./app');

let server;

(async () => {
    try {
        server = app.listen(process.env.PORT, () => console.info(`Listening to port ${process.env.PORT}`));
    }
    catch (error) {
        console.error(error);
    }
})();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});