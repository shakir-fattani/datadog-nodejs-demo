require('./utils/datadog');

const app = require('./app');

const start = async () => {
    app.setListeningIP('0.0.0.0');
    await app.startListening(8080, 'DataDog Demo Application', 'production');
};

start().then(() => {
    console.log('Application is started. and Bootstrap process completed');
});
