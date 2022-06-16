const singleCall = require('./utils/single-call');

const loadTesting = async (countOf) => {
    const request = Array(countOf).fill(0);

    const response = request.map((value, index) => singleCall(index % 10));
    await Promise.all(response);

    console.log('Async ProcessCompleted');
};

module.exports = loadTesting;
