const RESTApi = require('faster-api-deploy');
const connectDataDog = require('connect-datadog');
const sleep = require('./utils/sleep');

let randomErrorThrower = 1;

const app = new RESTApi('/', {
    isSupportJSON: true,
});

app.expressUseSingleParam(connectDataDog({
    response_code: true,
    tags: ['app:my_app'],
}));

app.get('/health', () => ({ isHealth: 200 }));

app.get('/throwError', async (req) => {
    const { timeout = -1 } = req.query;
    console.log(`url: '/throwError', query: ${JSON.stringify(req.query)}`);

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
    if (randomErrorThrower++ % 100 === 0) throw new RESTApi.ERRORS.AppError('random error', 500, 'testing');

    let { timeout = -1 } = req.query;
    console.log(JSON.stringify({
        message: 'api request is called', url: '/waitRequest', body: req.body, query: req.query,
    }));

    timeout = parseInt(timeout, 10);
    if (timeout > 0) await sleep(timeout);

    return { message: 'success' };
});

module.exports = app;
