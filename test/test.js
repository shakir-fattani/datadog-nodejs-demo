const SyncCalls = require('./sync-calls');
const AsyncCalls = require('./async-calls');
const AsyncCallsWithLimitedWorker = require('./async-calls-with-limited-workers');

const countOf = process.env.REQUEST_LOAD || 10;
const workerCount = process.env.WORKER_COUNT || 5;

const start = async () => {
    console.time('sync-calls-to-api');
    await SyncCalls(countOf);
    console.timeEnd('sync-calls-to-api');

    console.time('async-calls-to-api');
    await AsyncCalls(countOf);
    console.timeEnd('async-calls-to-api');

    console.time('async-calls-to-api-with-limited-workers-thread');
    await AsyncCallsWithLimitedWorker(countOf, workerCount);
    console.timeEnd('async-calls-to-api-with-limited-workers-thread');
};

start().catch(console.error);
