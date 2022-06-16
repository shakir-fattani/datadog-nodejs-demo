const RESTApi = require('faster-api-deploy');
const sleep = require('./utils/sleep');

const app = new RESTApi('/', {
    isSupportJSON: true,
});

app.get('/health', () => ({ isHealth: 200 }));

app.get('/throwError', async (req) => {
    const { timeout = -1 } = req.query;

    try {
        const testing = parseInt(timeout, 10);
        if (testing < 1) return { message: 'success' };
    } catch (e) {
        console.log(e);
        return { message: 'success, but not integer' };
    }
    await sleep(timeout);
    throw new RESTApi.ERRORS.AppError('told to throw error', 400, 'testing demo');
});

app.get('/waitRequest', async (req) => {
    let { timeout = -1 } = req.query;
    timeout = parseInt(timeout, 10);
    if (timeout > 0) await sleep(timeout);

    return { message: 'success' };
});

module.exports = app;
