const app = require('./app');
const mysql = require('./database/mysql');

let server;

async function main() {
    await mysql.testConnection();
    server = app.listen(process.env.PORT, () => console.info(`Listening to port ${process.env.PORT}`));
}

main();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});