/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const singleCall = require('./utils/single-call');

const loadTesting = async (countOf) => {
    const request = Array(countOf).fill(0);
    for (const index in request) await singleCall(index % 10);

    console.log('sync ProcessCompleted');
};

module.exports = loadTesting;
