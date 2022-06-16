// eslint-disable-next-line no-promise-executor-return
const sleep = (sleepTime) => new Promise((res) => setTimeout(res, sleepTime * 100));

module.exports = sleep;
