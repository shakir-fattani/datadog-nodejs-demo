const singleCall = require('./utils/single-call');

const loadTesting = async (countOf, workerCount) => {
    const request = Array(countOf).fill(0).map((r, i) => i);

    const worker = async () => {
        let valu = request.shift();
        while (valu !== undefined) {
            // eslint-disable-next-line no-await-in-loop
            await singleCall(valu);
            valu = request.shift();
        }
    };
    const response = [];
    let i;
    for (i = 0; i < workerCount; i += 1) response.push(worker());
    await Promise.all(response);

    console.log('Async with limited workers ProcessCompleted');
};

module.exports = loadTesting;
