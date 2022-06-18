/* eslint-disable no-await-in-loop */
const SyncCalls = require('./sync-calls');
const AsyncCalls = require('./async-calls');
const AsyncCallsWithLimitedWorker = require('./async-calls-with-limited-workers');

const sleep = require('../utils/sleep');

const countOf = parseInt(process.env.REQUEST_LOAD, 10) || 1000;
const workerCount = parseInt(process.env.WORKER_COUNT, 10) || 5;
const startingSleep = parseInt(process.env.STARTING_SLEEP, 10) || 100;

const start = async () => {
    console.log({
        countOf, workerCount, startingSleep, baseurl: process.env.BASE_URL,
    });
    console.log('sleeping...........');
    await sleep(startingSleep);
    console.log('starting load');

    console.time('sync-calls-to-api');
    await SyncCalls(countOf / 10);
    console.timeEnd('sync-calls-to-api');

    let i;
    for (i = 0; i < 100; i += 1) {
        console.time('async-calls-to-api');
        await AsyncCalls(countOf);
        console.timeEnd('async-calls-to-api');

        console.time('async-calls-to-api-with-limited-workers-thread');
        await AsyncCallsWithLimitedWorker(countOf, workerCount);
        console.timeEnd('async-calls-to-api-with-limited-workers-thread');
    }
};

start().catch(console.error);
